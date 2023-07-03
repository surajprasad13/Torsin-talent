import AWS from 'aws-sdk';
import {Platform} from 'react-native';
import {RNS3} from 'react-native-aws3';

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

export const uploadPdfFileToS3 = async (
  file: any,
  fileName: string,
  ContentType: string,
) => {
  let contentDeposition = 'inline;filename="' + fileName + '"';
  const params = {
    Bucket: 'torsin-bucket',
    Key: fileName,
    Body: file,
    ContentDisposition: contentDeposition,
    ContentType: ContentType,
  };

  if (Platform.OS == 'ios') {
    params.ContentEncoding = 'base64';
  }

  try {
    const data = await s3.upload(params).promise();
    return data;
  } catch (error) {
    throw error;
  }
};

export const uploadVideoToS3 = (uri: string, fileName: string) => {
  const file = {
    uri: uri,
    name: fileName, // Customize the file name here
    type: 'video/mp4', // Customize the file type here
  };

  const options = {
    keyPrefix: '',
    bucket: 'torsin-bucket',
    region: 'ap-south-1',
    accessKey: 'AKIA3HTEPTYVVR7VTC5L',
    secretKey: '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',
    successActionStatus: '201',
  };

  try {
    const data = RNS3.put(file, options);
    if (data.status !== 201) {
      return data;
    }
    return data.body;
  } catch (error) {
    console.log('Error in uploading video');
  }
};
