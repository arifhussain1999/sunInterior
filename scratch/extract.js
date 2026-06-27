const { pdf } = require("pdf-to-img");
const fs = require("fs");
const path = require("path");

async function main() {
  const pdfPath = "C:/Users/lenovo/Downloads/DOC-20260615-WA0005.pdf";
  const outputDir = "C:/Users/lenovo/Downloads/extracted_pages";

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`Loading PDF from: ${pdfPath}`);
  try {
    const document = await pdf(pdfPath, { scale: 2 });
    let counter = 1;
    for await (const image of document) {
      const outputPath = path.join(outputDir, `page_${counter}.png`);
      await fs.promises.writeFile(outputPath, image);
      console.log(`Saved: ${outputPath}`);
      counter++;
    }
    console.log("Extraction completed successfully!");
  } catch (error) {
    console.error("Error during extraction:", error);
  }
}

main();
