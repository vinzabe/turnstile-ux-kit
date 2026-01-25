const puppeteer = require('puppeteer');

async function takeScreenshots() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set viewport size
  await page.setViewport({ width: 1280, height: 720 });
  
  // Take screenshot of inline template
  await page.goto('file://' + __dirname + '/dist/templates/turnstile-inline.html');
  await page.screenshot({ 
    path: 'screenshots/turnstile-inline-light.png',
    fullPage: true 
  });
  
  // Dark theme
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  });
  await page.screenshot({ 
    path: 'screenshots/turnstile-inline-dark.png',
    fullPage: true 
  });
  
  await browser.close();
  console.log('Screenshots taken successfully!');
}

takeScreenshots().catch(console.error);
