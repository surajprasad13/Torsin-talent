import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';

// icons
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

// components
import {CustomButton, CustomInput} from '../../components';

// helpers
import {appstyle, colors, fonts} from '../../theme';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {addService} from '../../redux/actions/userAction';
import {Button, Dialog, Portal} from 'react-native-paper';
import {updateSuccess} from '../../redux/reducers/userSlice';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadFileToS3, uploadVideoToS3, videoUrl} from '../../services/s3';
import {decode} from 'base64-arraybuffer';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';

type InputProps = {
  serviceName: string;
  chargeType: string;
  serviceCharge: string;
  serviceDescription: string;
  serviceImage: Array<string>;
  serviceVideo: string;
};

const AddService = ({}) => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const {userToken} = useAppSelector(state => state.auth);
  const {loading, success, error} = useAppSelector(state => state.user);

  const [inputs, setInputs] = useState<InputProps>({
    serviceName: '',
    chargeType: '',
    serviceCharge: '',
    serviceDescription: '',
    serviceImage: [],
    serviceVideo: '',
  });

  const [errors, setErrors] = useState<any>({});

  const [image, setImage] = useState(['', '', '', '', '']);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [videoLoading, setVideoLoading] = useState<boolean>(false);
  const [video, setVideo] = useState('');

  const data = [
    {label: 'Fixed', value: '1'},
    {label: 'Hourly', value: '2'},
  ];

  const handleOnchange = (text: string, input: any) => {
    setInputs((prevState: any) => ({...prevState, [input]: text}));
  };

  const validate = () => {
    Keyboard.dismiss();

    let isValid = true;

    if (inputs.serviceImage.length == 0) {
      handleError('Please add atleast one image', 'image');
      isValid = false;
    }

    if (isValid) {
      postService();
    }
  };

  const handleError = (_error: any, input: any) => {
    setErrors((prevState: any) => ({...prevState, [input]: _error}));
  };

  const postService = () => {
    if (inputs.serviceVideo == '') {
      delete inputs.serviceVideo;
      let value = {
        inputs,
        userToken,
      };
      dispatch(addService(value));
    }
  };

  useEffect(() => {
    const listener = navigation.addListener('beforeRemove', () => {
      dispatch(updateSuccess());
    });
    return () => listener;
  }, []);

  const uploadImage = (index: number) => {
    handleError('', 'image');
    let options: any = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        return false;
      } else {
        try {
          setImageLoading(true);
          var base64data = decode(response.assets[0].base64);
          const url = await uploadFileToS3(
            base64data,
            `${response.assets[0].fileName}`,
            'image/jpeg',
          );
          setInputs((prevState: any) => ({
            ...prevState,
            serviceImage: [...inputs.serviceImage, url.Location],
          }));
          image[index] = response.assets[0].base64;
          setImageLoading(false);
        } catch (_error: any) {
          setImageLoading(false);
          console.log('Error uploading file:', _error);
        }
      }
    });
  };

  const uploadVideo = () => {
    handleError('', 'video');
    let options: any = {
      mediaType: 'video',
      quality: 1,
      formatAsMp4: true,
    };
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        return false;
      } else {
        try {
          setVideoLoading(true);

          const url = await uploadVideoToS3(
            response.assets[0].uri,
            response.assets[0].fileName,
          );
          setInputs((prevState: any) => ({
            ...prevState,
            serviceVideo: url.Location,
          }));

          setVideo(response.assets[0].uri);
          setVideoLoading(false);
        } catch (_error: any) {
          setVideoLoading(false);
          console.log('Error uploading file:', _error);
        }
      }
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F9FBFF'}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <Portal>
          <Dialog visible={success} style={{backgroundColor: 'white'}}>
            <Dialog.Title>Service Added</Dialog.Title>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  dispatch(updateSuccess());
                  if (navigation.canGoBack()) {
                    navigation.goBack();
                  }
                }}>
                Ok
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colors.white,
            padding: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }}
            style={{padding: 10}}>
            <Feather name="arrow-left" size={20} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: fonts.medium,
              color: '#000C14',
            }}>
            Add Service
          </Text>
          <View />
        </View>

        <ScrollView>
          <View style={styles.textContainer}>
            <Text
              style={{
                fontFamily: fonts.semibold,
                color: colors.black,
                fontSize: 16,
              }}>
              Add services
            </Text>
            <Text
              style={{
                fontFamily: fonts.regular,
                color: '#1E202B',
                marginTop: 12,
              }}>
              Job Description Complete your profile. Set your profile completely
              .
            </Text>
          </View>
          {!!error && (
            <Text
              style={{
                textAlign: 'center',
                color: colors.red,
                fontFamily: fonts.medium,
              }}>
              {error}
            </Text>
          )}
          <View style={styles.inputContainer}>
            <CustomInput
              label="Service Name"
              placeholder="eg. Song Production"
              value={inputs.serviceName}
              onChangeText={text => handleOnchange(text, 'serviceName')}
              containerStyle={{}}
            />
            <View style={{marginTop: 10}}>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  color: '#4F4F4F',
                  fontSize: 16,
                }}>
                Project Type
              </Text>
              <View
                style={{
                  height: 50,
                  borderWidth: 1,
                  borderColor: '#BDBDBD',
                  marginTop: 10,
                  borderRadius: 12,
                }}>
                <Dropdown
                  style={[
                    {
                      borderColor: '#454545',
                      backgroundColor: 'white',
                      borderRadius: 12,
                      padding: 5,
                      paddingLeft: 10,
                      paddingRight: 10,
                    },
                  ]}
                  data={data}
                  search
                  labelField="label"
                  valueField="value"
                  placeholder={'Select'}
                  placeholderStyle={{}}
                  searchPlaceholder="Search..."
                  value={String(inputs.chargeType)}
                  onChange={item => {
                    setInputs((prevState: any) => ({
                      ...prevState,
                      chargeType: Number(item.value),
                    }));
                  }}
                  onChangeText={() => {
                    //console.log(text);
                  }}
                />
              </View>
            </View>

            <CustomInput
              label="Service Charge"
              placeholder="eg. $500"
              keyboardType="number-pad"
              value={String(inputs.serviceCharge)}
              onChangeText={text => handleOnchange(text, 'serviceCharge')}
              containerStyle={{marginTop: 10}}
            />

            <View style={{marginTop: 10}}>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  color: '#4F4F4F',
                  fontSize: 16,
                }}>
                Service Description
              </Text>
              <View
                style={{
                  width: '100%',
                  height: 170,
                  borderWidth: 0.5,
                  borderRadius: 8,
                  borderColor: colors.light,
                  marginTop: 10,
                  backgroundColor: colors.white,
                }}>
                <TextInput
                  placeholder="Type description here..."
                  multiline={true}
                  placeholderTextColor="#333333"
                  value={inputs.serviceDescription}
                  onChangeText={text =>
                    handleOnchange(text, 'serviceDescription')
                  }
                  blurOnSubmit={true}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  style={{padding: 15}}
                />
              </View>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text
              style={{
                fontFamily: fonts.semibold,
                color: colors.black,
                fontSize: 16,
              }}>
              Add Portfolio of your service
            </Text>
            <Text
              style={{
                fontFamily: fonts.regular,
                color: '#1E202B',
                marginTop: 12,
              }}>
              Job Description Complete your profile. Set your profile completely
              .
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text
              style={{
                fontFamily: fonts.semibold,
                color: colors.black,
                fontSize: 16,
              }}>
              Add Video
            </Text>
          </View>

          <Pressable onPress={uploadVideo} style={styles.videoInput}>
            {videoLoading && <ActivityIndicator style={{margin: 20}} />}

            {video ? (
              <Video
                source={{uri: video}}
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: 150,
                  borderWidth: 0.3,
                  borderRadius: 2,
                  backgroundColor: 'black',
                }}
              />
            ) : (
              <View
                style={{
                  backgroundColor: '#EBEFFF',
                  minHeight: 150,
                  borderRadius: 10,
                  borderColor: colors.primary,
                  borderWidth: 1,
                  borderStyle: 'dashed',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AntDesign name="cloudupload" size={40} color="#14226D" />
                <Text style={{fontFamily: fonts.regular, color: colors.black}}>
                  Click{' '}
                  <Text style={{color: colors.primary, fontFamily: fonts.bold}}>
                    here{' '}
                  </Text>
                  upload
                </Text>
              </View>
            )}

            {errors.video && (
              <Text
                style={{
                  marginTop: 5,
                  fontFamily: fonts.medium,
                  color: colors.red,
                }}>
                {errors.video}
              </Text>
            )}
          </Pressable>

          <View style={styles.textContainer}>
            <Text
              style={{
                fontFamily: fonts.semibold,
                color: colors.black,
                fontSize: 16,
              }}>
              Add Photos
            </Text>
          </View>
          <View
            style={{
              ...appstyle.shadow,
              borderRadius: 10,
              margin: 10,
              padding: 10,
            }}>
            {imageLoading && <ActivityIndicator style={{margin: 20}} />}

            <View style={styles.photoContainer}>
              {image[0].length > 0 ? (
                <Pressable
                  onPress={() => uploadImage(0)}
                  style={styles.innerPhotos}>
                  <FastImage
                    source={{uri: 'data:image/png;base64,' + image[0]}}
                    resizeMode="cover"
                    style={{width: '100%', height: 100, borderRadius: 10}}
                  />
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => uploadImage(0)}
                  style={styles.innerPhotos}>
                  <Feather name="image" size={30} color="#14226D" />
                  <Text
                    style={{fontFamily: fonts.regular, color: colors.black}}>
                    Click{' '}
                    <Text
                      style={{color: colors.primary, fontFamily: fonts.bold}}>
                      here{' '}
                    </Text>
                  </Text>
                </Pressable>
              )}

              {image[1].length > 0 ? (
                <Pressable
                  onPress={() => uploadImage(0)}
                  style={styles.innerPhotos}>
                  <FastImage
                    source={{uri: 'data:image/png;base64,' + image[1]}}
                    resizeMode="cover"
                    style={{width: '100%', height: 100, borderRadius: 10}}
                  />
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => uploadImage(1)}
                  style={styles.innerPhotos}>
                  <Feather name="image" size={30} color="#14226D" />
                  <Text
                    style={{fontFamily: fonts.regular, color: colors.black}}>
                    Click{' '}
                    <Text
                      style={{color: colors.primary, fontFamily: fonts.bold}}>
                      here{' '}
                    </Text>
                  </Text>
                </Pressable>
              )}

              {image[2].length > 0 ? (
                <Pressable
                  onPress={() => uploadImage(0)}
                  style={styles.innerPhotos}>
                  <FastImage
                    source={{uri: 'data:image/png;base64,' + image[2]}}
                    resizeMode="cover"
                    style={{width: '100%', height: 100, borderRadius: 10}}
                  />
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => uploadImage(2)}
                  style={styles.innerPhotos}>
                  <Feather name="image" size={30} color="#14226D" />
                  <Text
                    style={{fontFamily: fonts.regular, color: colors.black}}>
                    Click{' '}
                    <Text
                      style={{color: colors.primary, fontFamily: fonts.bold}}>
                      here{' '}
                    </Text>
                  </Text>
                </Pressable>
              )}
            </View>
            {/*  */}
            <View style={{flexDirection: 'row'}}>
              {image[3].length > 0 ? (
                <Pressable
                  onPress={() => uploadImage(0)}
                  style={styles.innerPhotos}>
                  <FastImage
                    source={{uri: 'data:image/png;base64,' + image[3]}}
                    resizeMode="cover"
                    style={{width: '100%', height: 100, borderRadius: 10}}
                  />
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => uploadImage(3)}
                  style={styles.innerPhotos}>
                  <Feather name="image" size={30} color="#14226D" />
                  <Text
                    style={{fontFamily: fonts.regular, color: colors.black}}>
                    Click{' '}
                    <Text
                      style={{color: colors.primary, fontFamily: fonts.bold}}>
                      here{' '}
                    </Text>
                  </Text>
                </Pressable>
              )}
              {image[4].length > 0 ? (
                <Pressable
                  onPress={() => uploadImage(0)}
                  style={styles.innerPhotos}>
                  <FastImage
                    source={{uri: 'data:image/png;base64,' + image[4]}}
                    resizeMode="cover"
                    style={{width: '100%', height: 100, borderRadius: 10}}
                  />
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => uploadImage(4)}
                  style={styles.innerPhotos}>
                  <Feather name="image" size={30} color="#14226D" />
                  <Text
                    style={{fontFamily: fonts.regular, color: colors.black}}>
                    Click{' '}
                    <Text
                      style={{color: colors.primary, fontFamily: fonts.bold}}>
                      here{' '}
                    </Text>
                  </Text>
                </Pressable>
              )}
            </View>
            {errors.image && (
              <Text
                style={{
                  marginTop: 5,
                  fontFamily: fonts.medium,
                  color: colors.red,
                }}>
                {errors.image}
              </Text>
            )}
          </View>
          <CustomButton
            title="Add Service"
            onPress={validate}
            style={{marginTop: 50}}
            disabled={true}
            loading={loading}
          />
          <View style={{marginTop: 50}} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backContainer: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textContainer: {
    marginLeft: 10,
    padding: 10,
  },
  inputContainer: {
    marginLeft: 10,
    padding: 10,
  },
  videoInput: {
    ...appstyle.shadow,
    height: 200,
    justifyContent: 'center',
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  photoInput: {
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
  },
  innerPhotos: {
    backgroundColor: '#EBEFFF',
    minHeight: 100,
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 5,
  },
  dropdwon: {},
  photoContainer: {
    flexDirection: 'row',
  },
});

export default AddService;

// const options = {
//   keyPrefix: 'videos/',
//   bucket: 'torsin-bucket',
//   region: 'ap-south-1',
//   accessKey: 'AKIA3HTEPTYVVR7VTC5L',
//   secretKey: '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',
//   successActionStatus: '201',
// };
