const run = require("./app");

module.exports.hello = (event, context, callback) => {
  run();
  callback(null);
};
