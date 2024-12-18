const fs = require("fs");
const path = require("path");

const genIndex = function (markup) {
  let html = fs.readFileSync(path.join(__dirname, "../src/template.html"), {
    encoding: "utf-8",
  });

  let readTime = "",
    readVar = "";

  if (markup.length) {
    readTime = (markup.split(" ").length / 200) * 60;
    readVar = `<style>:root{
      --readTime: ${Math.round(readTime) + 15}s;
    }</style>`;
  }

  html = html
    .replace("{{^READ_TIME}}", readVar)
    .replace("{{^SCROLL_MSG}}", markup)
    .replace(
      "{{^HBD_MSG}}",
      process.env.HBD_MSG || "Happy Birthday\nEnjoy your 3 Month XBox Game Pass:\nXXXXX-XXXXX-XXXXX-XXXXX-XXXXX"
    )
    .replace("{{^NAME}}", process.env.NAME)
    .replace("{{^NICKNAME}}", process.env.NICKNAME || process.env.NAME);

  fs.writeFileSync(path.join(__dirname, "../src/index.html"), html, {
    encoding: "utf-8",
  });
  console.log("Index Generated");
};

module.exports = genIndex;
