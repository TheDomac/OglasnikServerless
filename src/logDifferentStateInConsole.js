function logDifferentStateInConsole(oldState, newState, stateDifferences) {
  console.log(
    "NEW STATE AND OLD STATE NOT EQUAL, SENDING NEW EMAILS",
    "--------------------------------------------------------"
  );

  console.log(
    "OLD STATE",
    JSON.stringify(oldState, null, 2),
    "--------------------------------------------------------"
  );

  console.log(
    "NEW STATE",
    JSON.stringify(newState, null, 2),
    "--------------------------------------------------------"
  );

  console.log(
    "STATE DIFFERENCES",
    JSON.stringify(stateDifferences, null, 2),
    "--------------------------------------------------------"
  );
}

module.exports = logDifferentStateInConsole;
