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

export const uploadFileToS3 = async (
  file: any,
  fileName: string,
  ContentType: string,
) => {
  const params = {
    Bucket: 'torsin-bucket',
    Key: fileName,
    Body: file,
    ContentType: ContentType,
  };

  try {
    const data = await s3.upload(params).promise();
    return data;
  } catch (error) {
    throw error;
  }
};

export const uploadVideoToS3 = async (file: any, fileName: string) => {
  const params = {
    Bucket: 'torsin-bucket',
    Key: fileName,
    Body: file,
    ContentType: 'video/mp4',
  };

  try {
    const data = await s3.upload(params).promise();
    return data;
  } catch (error) {
    throw error;
  }
};

export const videoUrl = s3.getSignedUrl('getObject', {
  Bucket: 'torsin-bucket',
  Key: 'myTestVideo.mp4',
  Expires: 3600, // Optional: Expiration time in seconds (e.g., 1 hour)
});
