import {Platform} from 'react-native';
import {decode} from 'base64-arraybuffer';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  uploadFileToS3,
  uploadPdfFileToS3,
  uploadVideoToS3,
} from '../services/s3';
import ImageCropPicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import fs from 'react-native-fs';

const uploadImage = () => {
  let options: any = {
    mediaType: 'photo',
    quality: 1,
    includeBase64: true,
  };
  launchImageLibrary(options, async (response: any) => {
    if (response.didCancel) {
      return false;
    } else {
      try {
        var base64data = decode(response.assets[0].base64);
        const url = await uploadFileToS3(
          base64data,
          `${response.assets[0].fileName}`,
          'image/jpeg',
        );
        return url.Location;
      } catch (_error: any) {
        return '';
      }
    }
  });
};

const uploadMedia = async ({type}: {type: string}) => {
  try {
    const response = await ImageCropPicker.openPicker({
      mediaType: 'any',
      includeBase64: true,
      cropping: type == 'image',
    });

    if (Platform.OS == 'android' && type == 'video') {
      const base64 = await fs.readFile(response.path, 'base64');
      var base64data = decode(base64);
      const url = await uploadFileToS3(
        base64data,
        `${new Date().getTime()}`,
        'video/mp4',
      );
      return url.Location;
    }

    if (response.data) {
      var base64data = decode(response.data);
      const url = await uploadFileToS3(
        base64data,
        `${response.filename}`,
        'image/jpeg',
      );
      return url.Location;
    } else {
      const url = await uploadVideoToS3(
        response.sourceURL as string,
        response.filename as string,
      );
      return url.body.postResponse.location;
    }
  } catch (error) {
    return '';
  }
};

const uploadDocument = async () => {
  try {
    const response = await DocumentPicker.pick({
      presentationStyle: 'fullScreen',
      type: DocumentPicker.types.pdf,
    });
    const base64 = await fs.readFile(response[0].uri, 'base64');
    var base64data = decode(base64);
    const url = await uploadPdfFileToS3(
      base64data,
      response[0].name as string,
      response[0].type as string,
    );
    return url.Location;
  } catch (error) {
    return '';
  }
};

export {uploadImage, uploadMedia, uploadDocument};
