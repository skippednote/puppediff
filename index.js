const puppeteer = require('puppeteer');
const fs = require('fs');
const baseline = process.argv[2];
const { baseUrl, pages, breakpoints } = require('./pages.json');
const dir = './screenshots';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const screenshot = async (name, url, { width, height }) => {
  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
    slowMo: 1000,
    timeout: 0
  });
  const page = await browser.newPage();
  await page.goto(baseUrl + url);
  await page.setViewport({
    width: width,
    height: height,
    deviceScaleFactor: 1
  });
  // await page.click('.cc_btn_accept_all');

  await page.screenshot({
    path: baseline
      ? `./screenshots/${name}-${width}-baseline.png`
      : `./screenshots/${name}-${width}.png`,
    fullPage: true
  });
  await browser.close();
};

breakpoints.forEach(breakpoint => {
  pages.forEach(async ({ name, url }) => {
    await screenshot(name, url, breakpoint);
  });
});
