const AWS = require('aws-sdk');
const axios = require('axios');

// const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
// const s3 = new S3Client({ region: 'your-region' });


AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

exports.uploadFile = (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `csv-files/${Date.now()}_${file.name}`,
    Body: file.data,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

exports.uploadFromUrl = async (url, fileName) => {
  const response = await axios.get(url, { responseType: 'stream' });

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `recordings/${fileName}`,
    Body: response.data,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
};
