const axios = require("axios");
const cheerio = require("cheerio");

async function getListOfAdsFromNjuskalo(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const listOfAds = $(".EntityList-items li.EntityList-item--Regular")
      .get()
      .map(el => ({
        title: $("h3.entity-title a", el).text(),
        price: $(".entity-prices .price--eur", el)
          .text()
          .replace(/  +/g, " ")
          .replace(/\n/g, " "),
        info: $(".entity-description-main", el)
          .text()
          .replace(/  +/g, " ")
          .replace(/\n/g, " "),
        link: `https://www.njuskalo.hr${$("h3.entity-title a", el).attr(
          "href"
        )}`,
        image: $(".entity-thumbnail img", el).data("src"),
        createdDate: $(".entity-pub-date time", el).text()
      }));
    console.log("-----------------------------------------");
    console.log("-----------------------------------------");
    console.log("-----------------------------------------");
    console.log("-----------------------------------------");
    console.log(listOfAds);
    console.log("-----------------------------------------");
    console.log("-----------------------------------------");
    console.log("-----------------------------------------");
    console.log("-----------------------------------------");
    return listOfAds;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = getListOfAdsFromNjuskalo;
