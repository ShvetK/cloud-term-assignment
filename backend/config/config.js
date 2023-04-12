const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
  sessionToken: process.env.SESSIONTOKEN,
});

const client = new AWS.SecretsManager({ region: "us-east-1" });

async function secretFun() {
  const data = await client
    .getSecretValue({ SecretId: "shvet-secret-key" })
    .promise();
  if ("SecretString" in data) {
    return JSON.parse(data.SecretString);
  } else {
    return Buffer.from(data.SecretBinary, "base64").toString("ascii");
  }
}

module.exports = secretFun;
