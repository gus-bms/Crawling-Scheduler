const express = require("express");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const app = express();
const port = 4111;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});

//
const crawler = async (crawl_object) => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      timeout: 100000,
    });
    const page = await browser.newPage();
    await page.goto(crawl_object.url);

    const bodyHandle = await page.$("body");
    const { height } = await bodyHandle.boundingBox();
    await bodyHandle.dispose();

    const viewportHeight = page.viewport().height;

    let scrolled = 0;
    while (scrolled < height * 10) {
      await page.evaluate((scrollDistance) => {
        window.scrollBy(0, scrollDistance);
      }, viewportHeight);
      await new Promise((page) => setTimeout(page, 10));
      scrolled += viewportHeight;
    }

    const content = await page.content();
    const $ = cheerio.load(content);

    const result = [];

    $(crawl_object.select_path).each(function (idx, element) {
      const $data = $(element).text();
      const return_data = {};

      console.log($data);
    });

    await page.close();
    await browser.close();

    console.log(result);
    return Promise.resolve(result);
  } catch (err) {
    console.error("", err);
    return Promise.reject([]);
  }
};

app.get("/search", (req, res) => {
  const post_list_object = {
    url: `https://search.shopping.naver.com/search/all?query=%EB%8B%A5%ED%84%B0%EC%A7%80+%EB%A0%88%EB%93%9C+%EB%B8%94%EB%A0%88%EB%AF%B8%EC%89%AC+%ED%81%B4%EB%A6%AC%EC%96%B4+%EC%8A%A4%ED%8C%9F%EB%B0%A4&bt=-1&frm=NVSCPRO`,
    select_path: ".price > span > em",
    type: "post",
  };
  crawler(post_list_object);
});
