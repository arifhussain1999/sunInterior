const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function testCrop() {
  const pagePath = "C:/Users/lenovo/Downloads/extracted_catalogue_pages/page_2.png";
  const outputDir = path.join(__dirname, "test_crop");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Dune Set (Top Right)
  // X: 410, Y: 325, W: 735, H: 520
  await sharp(pagePath)
    .extract({ left: 410, top: 325, width: 735, height: 520 })
    .toFile(path.join(outputDir, "dune_test.png"));

  // Knotion Set (Bottom Left)
  // X: 45, Y: 970, W: 735, H: 520
  await sharp(pagePath)
    .extract({ left: 45, top: 970, width: 735, height: 520 })
    .toFile(path.join(outputDir, "knotion_test.png"));

  console.log("Test crop done!");
}

testCrop().catch(console.error);
