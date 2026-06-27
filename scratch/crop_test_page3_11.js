const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function testCrop() {
  const outputDir = path.join(__dirname, "test_crop");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Page 3 Fern Set (Top Right, no header)
  // X: 410, Y: 220, W: 735, H: 520
  await sharp("C:/Users/lenovo/Downloads/extracted_catalogue_pages/page_3.png")
    .extract({ left: 410, top: 220, width: 735, height: 520 })
    .toFile(path.join(outputDir, "fern_test.png"));

  // Page 11 Drift Sofa (Top Right, with SOFA SETS header)
  // X: 410, Y: 325, W: 735, H: 520
  await sharp("C:/Users/lenovo/Downloads/extracted_catalogue_pages/page_11.png")
    .extract({ left: 410, top: 325, width: 735, height: 520 })
    .toFile(path.join(outputDir, "drift_test.png"));

  console.log("Page 3 and Page 11 test crop done!");
}

testCrop().catch(console.error);
