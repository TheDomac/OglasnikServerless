const axios = require("axios");
const cheerio = require("cheerio");

async function getListOfAdsFromNjuskalo(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const listOfAds = $(".results .OglasiRezHolder a")
      .get()
      .map(el => ({
        title: $(".title", el)
          .text()
          .replace(/\n/g, ""),
        price: $(".price", el)
          .text()
          .replace(/  +/g, " ")
          .replace(/\n/g, ""),
        info: $(".lead", el)
          .text()
          .replace(/  +/g, " ")
          .replace(/\n/g, " "),
        link: $(el).attr("href"),
        image: $(".result_photo img", el).attr("src"),
        createdDate: $(".foot .info .icon-time", el).text()
      }));

    return listOfAds;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = getListOfAdsFromNjuskalo;
