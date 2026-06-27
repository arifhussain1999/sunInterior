const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const products = [
  // Page 2
  { page: 2, pos: "top", name: "Dune Set" },
  { page: 2, pos: "bottom", name: "Knotion Set" },
  // Page 3
  { page: 3, pos: "top", name: "Fern Set" },
  { page: 3, pos: "bottom", name: "Meadow Set" },
  // Page 4
  { page: 4, pos: "top", name: "Groove Set" },
  { page: 4, pos: "bottom", name: "Solace Set" },
  // Page 5
  { page: 5, pos: "top", name: "Arbor Set" },
  { page: 5, pos: "bottom", name: "Marina Set" },
  // Page 6
  { page: 6, pos: "top", name: "Ibiza Set" },
  { page: 6, pos: "bottom", name: "Capri Set" },
  // Page 7
  { page: 7, pos: "top", name: "Coast Set" },
  { page: 7, pos: "bottom", name: "Ivy Set" },
  // Page 8
  { page: 8, pos: "top", name: "Oslo Set" },
  { page: 8, pos: "bottom", name: "Oasis Set" },
  // Page 9
  { page: 9, pos: "top", name: "Sienna Set" },
  { page: 9, pos: "bottom", name: "Tide Set" },
  // Page 10
  { page: 10, pos: "top", name: "Vista Set" },
  { page: 10, pos: "bottom", name: "Breeze Set" },
  // Page 11
  { page: 11, pos: "top", name: "Drift Sofa" },
  { page: 11, pos: "bottom", name: "Mesa Sofa" },
  // Page 12
  { page: 12, pos: "top", name: "Oslo Sofa" },
  { page: 12, pos: "bottom", name: "Sierra Sofa" },
  // Page 13
  { page: 13, pos: "top", name: "Sahara Sofa" },
  { page: 13, pos: "bottom", name: "Solstice Sofa" },
  // Page 14
  { page: 14, pos: "top", name: "Azure Sofa" },
  { page: 14, pos: "bottom", name: "Vista Sofa" },
  // Page 15
  { page: 15, pos: "top", name: "Canyon Sofa" },
  { page: 15, pos: "bottom", name: "Aura Sofa" }
];

async function main() {
  const inputDir = "C:/Users/lenovo/Downloads/extracted_catalogue_pages";
  const outputDir = path.resolve(__dirname, "..", "public/assets/catalog/Rope");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Optional: clear the output directory first so old files are removed
  const existingFiles = fs.readdirSync(outputDir);
  for (const file of existingFiles) {
    fs.unlinkSync(path.join(outputDir, file));
  }
  console.log("Cleared old files in Rope directory.");

  for (const item of products) {
    const srcPath = path.join(inputDir, `page_${item.page}.png`);
    const destPath = path.join(outputDir, `${item.name}.png`);

    if (!fs.existsSync(srcPath)) {
      console.warn(`Source page not found: ${srcPath}`);
      continue;
    }

    let top, left, width = 735, height = 520;
    if (item.pos === "top") {
      left = 410;
      top = (item.page === 2 || item.page === 11) ? 325 : 220;
    } else {
      left = 45;
      top = 970;
    }

    try {
      await sharp(srcPath)
        .extract({ left, top, width, height })
        .toFile(destPath);
      console.log(`Cropped & saved: ${item.name} from page ${item.page} (${item.pos})`);
    } catch (err) {
      console.error(`Error cropping ${item.name}:`, err);
    }
  }

  console.log("All 28 rope products cropped successfully!");
}

main().catch(console.error);
