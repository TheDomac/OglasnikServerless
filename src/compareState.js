const _ = require("lodash");
// const config = require("../config");

function getUserWithJustNewAds(user, sameUserInOldState) {
  const oglasnikURLsWithNewAds = user.oglasnikURLs.reduce(
    (prev, oglasnikURL) => {
      const sameURLInOldState = sameUserInOldState.oglasnikURLs.find(
        oldStateURL => oldStateURL.url === oglasnikURL.url
      );

      if (!sameURLInOldState) {
        return [...prev, oglasnikURL];
      }

      const newAdsInURL = _.differenceBy(
        oglasnikURL.ads,
        sameURLInOldState.ads,
        "link"
      );

      const URLWithJustNewAds = {
        ...oglasnikURL,
        ads: newAdsInURL
      };

      return [...prev, URLWithJustNewAds];
    },
    []
  );

  return {
    ...user,
    oglasnikURLs: oglasnikURLsWithNewAds
  };
}

function compareState(oldState, newState) {
  return newState.reduce((prev, user) => {
    const sameUserInOldState = oldState.find(u => user.email === u.email);
    if (!sameUserInOldState) {
      return [...prev, user];
    }

    const userWithJustNewAds = getUserWithJustNewAds(user, sameUserInOldState);

    return [...prev, userWithJustNewAds];
  }, []);
}

module.exports = compareState;
