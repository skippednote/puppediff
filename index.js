const puppeteer = require('puppeteer');
const fs = require('fs');
const baseline = process.argv[2];
const { baseUrl, pages } = require('./pages.json');
const dir = './screenshots';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const screenshot = async (name, url) => {
  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
    slowMo: 1000
  });
  const page = await browser.newPage();
  await page.goto(baseUrl + url);
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  // await page.click('.cc_btn_accept_all');

  await page.screenshot({
    path: baseline
      ? `./screenshots/${name}-baseline.png`
      : `./screenshots/${name}.png`,
    fullPage: true
  });
  await browser.close();
};

pages.forEach(({ name, url }) => {
  screenshot(name, url);
});
