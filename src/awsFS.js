const AWS = require("aws-sdk");

const S3 = new AWS.S3();

function writeS3Object(bucket, key, body) {
  return S3.putObject({
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: "application/json"
  }).promise();
}

function getS3Object(bucket, key) {
  return S3.getObject({
    Bucket: bucket,
    Key: key,
    ResponseContentType: "application/json"
  })
    .promise()
    .then(file => file.Body.toString("utf-8"))
    .catch(() => writeS3Object(bucket, key, "[]"));
}

module.exports = {
  BUCKET: "node-njuskalo-oglasnik-d-serverlessdeploymentbuck-1cizab2dad5f7",
  OBJECT_KEY: "state.json",
  getS3Object,
  writeS3Object
};
