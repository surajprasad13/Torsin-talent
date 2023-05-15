import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

import {S3Client} from '@aws-sdk/client-s3';
import {fromCognitoIdentityPool} from '@aws-sdk/credential-providers';

const client = new S3Client({
  // The AWS Region where the Amazon Simple Storage Service (Amazon S3) bucket will be created. Replace this with your Region.
  region: 'ap-south-1',
  credentials: fromCognitoIdentityPool({
    // Replace the value of 'identityPoolId' with the ID of an Amazon Cognito identity pool in your Amazon Cognito Region.
    identityPoolId: 'ap-south-1:43edf383-1a21-4970-a46a-029234d616f6',
    // Replace the value of 'region' with your Amazon Cognito Region.
    clientConfig: {region: 'ap-south-1'},
  }),
});

export default client;

