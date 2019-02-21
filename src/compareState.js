const _ = require("lodash");
const config = require("../config");

function getUserWithJustNewAds(user, sameUserInOldState) {
  const userWithNoAds = {
    ...user,
    oglasnikURLs: []
  };

  return user.oglasnikURLs.reduce((prev, oglasnikURL) => {
    const sameURLInOldState = sameUserInOldState.oglasnikURLs.find(
      oldStateURL => oldStateURL.url === oglasnikURL.url
    );

    if (!sameURLInOldState) {
      return config.sendMailWithInitialContentFromNewURL
        ? {
            ...prev,
            oglasnikURLs: [...prev.oglasnikURLs, oglasnikURL]
          }
        : prev;
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

    return {
      ...prev,
      oglasnikURLs: [...prev.oglasnikURLs, URLWithJustNewAds]
    };
  }, userWithNoAds);
}

function compareState(oldState, newState) {
  return newState.reduce((prev, user) => {
    const sameUserInOldState = oldState.find(u => user.email === u.email);
    if (!sameUserInOldState) {
      return config.sendInitialMailToNewUser ? [...prev, user] : prev;
    }

    const userWithJustNewAds = getUserWithJustNewAds(user, sameUserInOldState);

    return [...prev, userWithJustNewAds];
  }, []);
}

module.exports = compareState;
