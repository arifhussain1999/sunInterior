const pdfjs = require("pdfjs-dist/legacy/build/pdf.js");
const fs = require("fs");

async function main() {
  const pdfPath = "C:/Users/lenovo/Downloads/sunseating digital catalogue (1).pdf";
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const loadingTask = pdfjs.getDocument({ data });
  const doc = await loadingTask.promise;
  console.log("Pages:", doc.numPages);
  
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const ops = await page.getOperatorList();
    console.log(`Page ${i} operators:`, ops.fnArray.length);
  }
}

main().catch(console.error);
