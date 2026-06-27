const fs = require("fs");
const path = require("path");

const mappings = [
  { src: "page_1.png", dest: "assets/images/projects/hero.png" },
  { src: "page_2.png", dest: "assets/images/projects/the-deck/1.png" },
  { src: "page_3.png", dest: "assets/images/projects/art-cafe/1.png" },
  { src: "page_4.png", dest: "assets/images/projects/balaji-jewellers/1.png" },
  { src: "page_5.png", dest: "assets/images/projects/home-cafe/1.png" },
  { src: "page_6.png", dest: "assets/images/projects/flavours-of-punjab/1.png" },
  { src: "page_7.png", dest: "assets/images/projects/shreeshyam-sweets/1.png" },
  { src: "page_8.png", dest: "assets/images/projects/kore-coffee/1.png" },
  { src: "page_9.png", dest: "assets/images/projects/ykc-farm/1.png" },
  { src: "page_10.png", dest: "assets/images/projects/tandooriwala/1.png" }
];

async function main() {
  const srcDir = "C:/Users/lenovo/Downloads/extracted_pages";
  
  for (const mapping of mappings) {
    const srcPath = path.join(srcDir, mapping.src);
    const destPath = path.resolve(__dirname, "..", mapping.dest);
    const destDir = path.dirname(destPath);

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${srcPath} -> ${destPath}`);
    } else {
      console.warn(`Source not found: ${srcPath}`);
    }
  }
  console.log("Copying completed successfully!");
}

main();
