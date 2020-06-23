const getListOfAdsFromOglasnik = require("./getAds/getListOfAdsFromOglasnik");
const getListOfAdsFromNjuskalo = require("./getAds/getListOfAdsFromNjuskalo");
const getListOfAdsFromIndex = require("./getAds/getListOfAdsFromIndex");

async function getAdsForAllUsers(users) {
  const adsForAllUsers = users.map(async user => {
    const oglasnikURLs = user.oglasnikURLs.map(async url => {
      let ads;
      if (url.includes("www.oglasnik.hr")) {
        ads = await getListOfAdsFromOglasnik(url);
      } else if (url.includes("www.njuskalo.hr")) {
        ads = await getListOfAdsFromNjuskalo(url);
      } else if (url.includes("www.index.hr")) {
        ads = await getListOfAdsFromIndex(url);
      }

      return {
        url,
        ads
      };
    });

    return {
      email: user.email,
      oglasnikURLs: await Promise.all(oglasnikURLs)
    };
  });

  return Promise.all(adsForAllUsers);
}

module.exports = getAdsForAllUsers;
