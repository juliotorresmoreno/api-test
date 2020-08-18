
const { S3 } = require('aws-sdk');

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_DEFAULT_REGION
} = process.env;

function createS3Client() {
  const clientS3 = new S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_DEFAULT_REGION
  });
  return clientS3;
}

module.exports.createS3Client = createS3Client;
