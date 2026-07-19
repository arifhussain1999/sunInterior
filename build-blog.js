const fs = require('fs');
const path = require('path');

// 1. Read the template file
const templatePath = path.join(__dirname, 'blog-post.html');
if (!fs.existsSync(templatePath)) {
  console.error("Error: blog-post.html template not found!");
  process.exit(1);
}
const templateHtml = fs.readFileSync(templatePath, 'utf8');

// 2. Load and evaluate assets/js/data.js to get the blog posts
const dataJsPath = path.join(__dirname, 'assets/js/data.js');
if (!fs.existsSync(dataJsPath)) {
  console.error("Error: assets/js/data.js not found!");
  process.exit(1);
}

const dataJsContent = fs.readFileSync(dataJsPath, 'utf8');

// Mock window object to capture the data defined in data.js
const windowMock = {};
try {
  // Execute the data.js code in Node using eval, passing windowMock as the context
  const runCode = new Function('window', dataJsContent);
  runCode(windowMock);
} catch (err) {
  console.error("Error evaluating data.js:", err);
  process.exit(1);
}

const data = windowMock.WW_DATA;
if (!data || !data.blogPosts || !data.blogPosts.length) {
  console.error("Error: No blog posts found in WW_DATA!");
  process.exit(1);
}

// Helper functions for formatting content
function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

function formatRichText(value) {
  return String(value == null ? "" : value)
    .split(/\n\s*\n/)
    .map(function (paragraph) {
      return paragraph.trim();
    })
    .filter(Boolean)
    .map(function (paragraph) {
      return '<p class="rich-text-paragraph">' + escapeHtml(paragraph) + "</p>";
    })
    .join("");
}

// 3. Generate a static HTML page for each blog post
data.blogPosts.forEach(post => {
  let postHtml = templateHtml;

  // Set the correct body dataset attribute
  postHtml = postHtml.replace(
    '<body data-page="blog-post">',
    `<body data-page="blog-post" data-post-slug="${post.slug}">`
  );

  // Pre-render the blog post content for SEO inside <main id="page-content">
  const renderedContent = `
  <section class="section" style="background:#fff;padding:40px 0;border-bottom:1px solid #f0f0f0;">
    <div class="container" style="max-width:800px;">
      <div style="margin-bottom:20px;display:flex;align-items:center;gap:12px;">
        <span style="color:#2874f0;font-size:12px;font-weight:700;text-transform:uppercase;">${escapeHtml(post.tags[0])}</span>
        <span style="color:#878787;font-size:12px;">•</span>
        <span style="color:#878787;font-size:12px;">${formatDate(post.publishedAt)}</span>
      </div>
      <h1 style="margin:0;font-size:36px;font-weight:700;color:#212121;line-height:1.2;">${escapeHtml(post.title)}</h1>
      <p style="margin:20px 0 0;font-size:18px;color:#878787;line-height:1.6;">${escapeHtml(post.excerpt)}</p>
    </div>
  </section>
  <section class="section" style="background:#f9f9f9;padding:40px 0;">
    <div class="container" style="max-width:800px;">
      <article style="background:#fff;border:1px solid #f0f0f0;border-radius:4px;padding:40px;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
        <div style="margin-bottom:40px;border-radius:4px;overflow:hidden;height:400px;background:#f1f3f6;">
          <img src="${post.featuredImage}" alt="${escapeHtml(post.title)}" style="width:100%;height:100%;object-fit:cover;">
        </div>
        <div class="rich-text" style="font-size:16px;line-height:1.8;color:#212121;">
          ${formatRichText(post.body)}
        </div>
        <div style="margin-top:40px;padding-top:24px;border-top:1px solid #f0f0f0;display:flex;align-items:center;gap:16px;">
          <div style="width:48px;height:48px;border-radius:50%;background:#f0f5ff;display:flex;align-items:center;justify-content:center;color:#2874f0;font-weight:700;">SS</div>
          <div>
            <p style="margin:0;font-weight:700;color:#212121;">Sun Seatings Editorial</p>
            <p style="margin:2px 0 0;font-size:13px;color:#878787;">Premium outdoor furniture experts</p>
          </div>
        </div>
        <div style="margin-top:40px;text-align:center;">
          <a class="btn btn-outline" href="blog.html">← Back to Design Journal</a>
        </div>
      </article>
    </div>
  </section>`;

  postHtml = postHtml.replace(
    '<main id="page-content"></main>',
    `<main id="page-content">${renderedContent}</main>`
  );

  // Set the SEO Page Title
  const seoTitle = post.seoTitle || `${post.title} | SUN SEATINGS`;
  postHtml = postHtml.replace(
    /<title>.*?<\/title>/,
    `<title>${escapeHtml(seoTitle)}</title>`
  );

  // Set the SEO Meta Description
  const seoDescription = post.seoDescription || post.excerpt;
  postHtml = postHtml.replace(
    /<meta name="description" content=".*?">/,
    `<meta name="description" content="${escapeHtml(seoDescription)}">`
  );

  // Insert Canonical Link right after head tag or description tag
  const canonicalLink = `\n  <link rel="canonical" href="https://www.sunseatings.com/${post.slug}.html">`;
  
  // God-level SEO tags (Open Graph & Twitter)
  const ogTags = `
  <!-- Open Graph / Social Media -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escapeHtml(seoTitle)}">
  <meta property="og:description" content="${escapeHtml(seoDescription)}">
  <meta property="og:image" content="https://www.sunseatings.com/${post.featuredImage}">
  <meta property="og:url" content="https://www.sunseatings.com/${post.slug}.html">
  <meta property="article:published_time" content="${post.publishedAt}">
  <meta property="article:author" content="Sun Seatings">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:title" content="${escapeHtml(seoTitle)}">
  <meta property="twitter:description" content="${escapeHtml(seoDescription)}">
  <meta property="twitter:image" content="https://www.sunseatings.com/${post.featuredImage}">`;

  postHtml = postHtml.replace(
    /(<meta name="description" content=".*?">)/,
    `$1${canonicalLink}${ogTags}`
  );

  // Add JSON-LD schema markup for BlogPosting just before </head>
  const schemaMarkup = `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": ${JSON.stringify(post.title)},
    "description": ${JSON.stringify(post.excerpt)},
    "image": ${JSON.stringify("https://www.sunseatings.com/" + post.featuredImage)},
    "author": {
      "@type": "Organization",
      "name": "Sun Seatings"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sun Seatings",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.sunseatings.com/assets/favicon2.png"
      }
    },
    "datePublished": ${JSON.stringify(post.publishedAt.split('T')[0])},
    "mainEntityOfPage": ${JSON.stringify("https://www.sunseatings.com/" + post.slug + ".html")},
    "keywords": ${JSON.stringify(post.tags.join(', '))}
  }
  </script>
  `;

  postHtml = postHtml.replace('</head>', schemaMarkup + '\n</head>');

  // Save the compiled page
  const fileName = `${post.slug}.html`;
  const outputPath = path.join(__dirname, fileName);
  fs.writeFileSync(outputPath, postHtml, 'utf8');
  console.log(`Generated: ${fileName}`);
});

console.log("All static blog pages generated successfully!");
