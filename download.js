const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function downloadImage(url, filepath) {
  const response = await axios({
    url,
    responseType: 'stream',
  });
  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filepath))
      .on('finish', () => resolve())
      .on('error', e => reject(e));
  });
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://itnext.io/why-is-building-pipelines-different-from-software-development-13ebd479edc4?source=friends_link&sk=204c5191e11e2ffde577399f3a9e1ca0', {
    waitUntil: 'networkidle2',
  });

  const content = await page.content();
  const $ = require('cheerio').load(content);

  // Create _media directory if it doesn't exist
  const mediaDir = path.resolve(__dirname, '_media');
  if (!fs.existsSync(mediaDir)) {
    fs.mkdirSync(mediaDir);
  }

  // Download images and update src attributes
  const imgPromises = [];
  $('img').each((i, img) => {
    const src = $(img).attr('src');
    if (src) {
      const imgName = `image${i}.jpg`;
      const imgPath = path.join(mediaDir, imgName);
      imgPromises.push(downloadImage(src, imgPath));
      $(img).attr('src', `_media/${imgName}`);
      $(img).removeAttr('class width height');
    }
  });

  await Promise.all(imgPromises);

  const updatedHtml = $.html();
  fs.writeFileSync('blog.html', updatedHtml);

  await browser.close();

  // Convert HTML to Markdown using the Lua filter
  const { exec } = require('child_process');
  exec('pandoc --from html --to gfm -o blog.md blog.html', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error converting HTML to Markdown: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`pandoc stderr: ${stderr}`);
      return;
    }
    console.log('HTML successfully converted to Markdown.');
  });
})();
