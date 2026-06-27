const sharp = require("sharp");

async function main() {
  const metadata = await sharp("C:/Users/lenovo/Downloads/extracted_catalogue_pages/page_2.png").metadata();
  console.log(metadata);
}

main().catch(console.error);
