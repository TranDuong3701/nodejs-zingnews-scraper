const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const moment = require("moment");
const database = require("./config/database")();

const Story = require("./models/storyModel");

// Helper function
const loadHtml = async (url, page) => {
  await page.goto(url);
  const html = await page.content();

  return await cheerio.load(html);
};

const getAuthor = (story, $) => {
  story.author = $("li.the-article-author > a").text();
  story.urlAuthor = $("li.the-article-author > a").attr("href");

  return story;
};

// about miliseconds => 1 req
const sleep = async (miliseconds) => {
  return new Promise((resolve, reject) => setTimeout(resolve, miliseconds));
};

const getAllStory = async (page, index) => {
  // Set up
  const urlPage = `https://zingnews.vn/sach-hay/trang${index}.html`;
  const $ = await loadHtml(urlPage, page);

  const storySelectorCss =
    "#news-latest > section > div > article.article-item";
  const results = $(storySelectorCss)
    .find("header")
    .map((index, element) => {
      const titleElement = $(element).find(".article-title");
      const title = $(titleElement).find("a").text();

      let url = $(titleElement).find("a").attr("href");
      url = `https://zingnews.vn${url}`;

      const datePostedSelectorCss =
        "p.article-meta > span > span.friendly-time";
      let datePosted = $(element).find(datePostedSelectorCss).text();
      datePosted = moment(datePosted, "HH:mm DD/MM/YYYY").toISOString();

      const summary = $(element).find(".article-summary").text();

      return { title, url, datePosted, summary };
    })
    .get();

  return results;
};

const scrapedPostedByAndSave = async (stories, page) => {
  for (let i in stories) {
    // Get html from website
    const $ = await loadHtml(stories[i].url, page);

    const story = getAuthor(stories[i], $);

    if (!Story.findOne({ title: story.title })) {
      await Story.create(story);
      sleep(2000);
    }
  }
};

// main
const importData = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  for (let i = 1; i <= 50; i++) {
    const stories = await getAllStory(page, i);
    await scrapedPostedByAndSave(stories, page);
  }
};

const deleteData = async () => {
  await Story.deleteMany();
};

if (process.argv[2] == "--import") importData();
if (process.argv[2] == "--delete") deleteData();
