const os = require('os');
const path = require('path');
const fs = require('fs');

const puppeteer = require('puppeteer');
const imageDiffr = require('image-diffr');

/*
 * @param contents: Array<{ html: string, filename: string }>,
 * @param? viewport: {
 *    width: number,
 *    height: number,
 * }
 * @returns Promise<void>
 */
async function generateImagesFromHtml(contents, viewport) {
  // Set up puppeteer launch options
  const puppeteerLaunchOptions = {
    defaultViewport: viewport
  };

  // Launch puppeteer
  const browser = await puppeteer.launch(puppeteerLaunchOptions);
  const page = await browser.newPage();

  // Get screenshots
  for (let content of contents) {
    await page.setContent(content.html);
    await page.screenshot({path: content.filename});
  }

  // Close puppeteer
  return await browser.close();
}

/*
 * @param html: string
 * @param filename: string
 * @param? viewport: {
 *    width: number,
 *    height: number,
 * }
 * @returns Promise<void>
 */
async function generateImageFromHtml(html, filename, viewport) {
  return await generateImagesFromHtml([{
    html,
    filename
  }], viewport);
}

/*
 * @param inputHtml: string
 * @param correctHtml: string
 * @param? viewport: {
 *    width: number,
 *    height: number,
 * }
 * @returns number
 */
async function diffHtml(inputHtml, correctHtml, viewport) {
  // Create temporary directory and paths
  const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'diffhtml-'));
  const f1 = path.join(tmpdir, '1.png');
  const f2 = path.join(tmpdir, '2.png');

  // Generate images
  const contents = [
    { html: inputHtml, filename: f1 },
    { html: correctHtml, filename: f2 },
  ];
  await generateImagesFromHtml(contents, viewport);

  // Diff images
  const {percent: diff} = await imageDiffr.exec(f1, f2);
  const match = 1 - diff;

  // Remove temporary directory
  fs.unlinkSync(f1);
  fs.unlinkSync(f2);
  fs.rmdirSync(tmpdir);

  // Return match
  return match;
}

module.exports = diffHtml;
