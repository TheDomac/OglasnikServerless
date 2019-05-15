const fs = require("fs-extra");
const _ = require("lodash");
const getNewAdsForAllUsers = require("./src/getAdsForAllUsers");
const compareState = require("./src/compareState");
const logDifferentStateInConsole = require("./src/logDifferentStateInConsole");

// const sendEmailsWithNewAds = require("./src/sendEmailsWithNewAds");

const users = require("./src/consts/users");

async function run() {
  try {
    const mockedOldStateFile = fs.readFileSync("./src/mocks/oldState.json");
    const oldState = JSON.parse(mockedOldStateFile);
    // const mockedNewStateFile = fs.readFileSync("./src/mocks/newState.json");
    // const newState = JSON.parse(mockedNewStateFile);
    const newState = await getNewAdsForAllUsers(users);

    if (!_.isEqual(oldState, newState)) {
      const stateDifferences = compareState(oldState, newState);
      logDifferentStateInConsole(oldState, newState, stateDifferences);
      // sendEmailsWithNewAds(stateDifferences);
      // fs.writeFileSync(
      //   "./src/mocks/oldState.json",
      //   JSON.stringify(newState, null, 2)
      // );
    } else {
      console.log("New state and old state are equal, not sending any emails.");
    }
  } catch (error) {
    console.log("ERROR", error);
  }
}

run();
