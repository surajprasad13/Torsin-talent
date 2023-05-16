import AWS from 'aws-sdk';

// Configure AWS SDK with your credentials and region
AWS.config.update({
  accessKeyId: 'AKIA3HTEPTYVVR7VTC5L',
  secretAccessKey: 'AAq6gq+lOUafJIHZFmyrdlnXV2hWC83b79pvW7EH',
  region: 'ap-south-1',
});

// Create an S3 instance
const s3 = new AWS.S3();

export default s3;

export const uploadFileToS3 = async (file, fileName) => {
  const params = {
    Bucket: 'torsin-bucket',
    Key: fileName,
    Body: file,
  };

  try {
    const data = await s3.upload(params).promise();
    // console.log('File uploaded successfully:', data.Location);
    return data.Location;
  } catch (error) {
    // console.error('Error uploading file:', error);
    throw error;
  }
};
