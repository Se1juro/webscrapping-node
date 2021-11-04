const cheerio = require("cheerio");
const request = require("request-promise");
const fs = require("fs-extra");

const file = fs.createWriteStream("languages.csv");

const init = async () => {
  const $ = await request({
    uri: "https://www.northeastern.edu/graduate/blog/most-popular-programming-languages/",
    transform: (body) => cheerio.load(body),
  });
  const webSiteTitle = $("title");
  console.log(
    "🚀 ~ file: index.js ~ line 10 ~ init ~ webSiteTitle",
    webSiteTitle.html()
  );

  file.write("Position|Language\n");
  const programmingLanguages = $("div#content")
    .find("h3")
    .find("b")
    .each((index, el) => {
      const text = $(el).text();
      file.write(`${index + 1}|${text}\n`);
      console.log("Index: ", index + 1, "- Element:", text);
    });
};

init();
