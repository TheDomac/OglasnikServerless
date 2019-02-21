const _ = require("lodash");

const getNewAdsForAllUsers = require("./src/getAdsForAllUsers");
const compareState = require("./src/compareState");
const sendEmailsWithNewAds = require("./src/sendEmailsWithNewAds");
const awsFs = require("./src/awsFS");
const logDifferentStateInConsole = require("./src/logDifferentStateInConsole");

const users = require("./src/consts/users");

async function run() {
  try {
    const { getS3Object, writeS3Object, BUCKET, OBJECT_KEY } = awsFs;

    const file = await getS3Object(BUCKET, OBJECT_KEY);
    const oldState = JSON.parse(file);
    const newState = await getNewAdsForAllUsers(users);

    if (!_.isEqual(oldState, newState)) {
      const stateDifferences = compareState(oldState, newState);
      logDifferentStateInConsole(oldState, newState, stateDifferences);
      sendEmailsWithNewAds(stateDifferences);
      writeS3Object(BUCKET, OBJECT_KEY, JSON.stringify(newState, null, 2));
    } else {
      console.log("New state and old state are equal, not sending any emails.");
    }
  } catch (error) {
    console.log("ERROR", error);
  }
}

module.exports = run;
