import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Pressable,
  ActivityIndicator,
  Modal,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadFileToS3, uploadVideoToS3} from '../../services/s3';
import {decode} from 'base64-arraybuffer';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import ImageCropPicker from 'react-native-image-crop-picker';
import {Divider} from 'react-native-paper';

// icons
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

// components
import {CustomButton, Title} from '../../components';

// helpers
import {appstyle, colors, fonts} from '../../theme';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {updateSuccess} from '../../redux/reducers/userSlice';

type InputProps = {
  serviceImage: Array<string>;
  serviceVideo: string;
};

const AddService = ({}) => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const {userToken} = useAppSelector(state => state.auth);
  const {loading, success, error} = useAppSelector(state => state.user);

  const [inputs, setInputs] = useState<InputProps>({
    serviceImage: [],
    serviceVideo: '',
  });

  const [errors, setErrors] = useState<any>({});

  const [image, setImage] = useState(['', '', '', '', '']);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [videoLoading, setVideoLoading] = useState<boolean>(false);
  const [video, setVideo] = useState('');
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isPopupVisible1, setPopupVisible1] = useState(false);

  const [list, setList] = useState(1);

  const validate = () => {
    Keyboard.dismiss();

    let isValid = true;

    if (inputs.serviceImage.length == 0) {
      handleError('Please add atleast one image', 'image');
      isValid = false;
    }

    if (isValid) {
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const selectImageHandler = async () => {
    try {
      const response = await ImageCropPicker.openPicker({
        width: 800,
        height: 600,
        cropping: true,
      });

      setSelectedImage(response.path);
      navigation.navigate('OpenCamera', {selectedImage: response.path});
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

  const handleError = (_error: any, input: any) => {
    setErrors((prevState: any) => ({...prevState, [input]: _error}));
  };

  useEffect(() => {
    const listener = navigation.addListener('beforeRemove', () => {
      dispatch(updateSuccess());
    });
    return () => listener;
  }, []);

  const uploadVideo = async () => {
    handleError('', 'video');

    const response = await ImageCropPicker.openPicker({
      mediaType: 'video',
      includeBase64: true,
    });
    if (response) {
      setVideoLoading(true);
      const url = await uploadVideoToS3(
        response.sourceURL as string,
        response.filename as string,
      );
      setInputs((prevState: any) => ({
        ...prevState,
        serviceVideo: url.body.postResponse.location,
      }));

      setVideo(response.sourceURL);
      setVideoLoading(false);
    } else {
      setVideoLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F9FBFF'}}>
      <Modal
        visible={isPopupVisible}
        animationType="slide"
        style={{}}
        transparent>
        <View style={{backgroundColor: 'rgba(0,0,0,0.5)', flex: 1}}>
          <View
            style={{
              position: 'absolute',
              bottom: '10%',
              width: '100%',
            }}>
            <View
              style={{
                margin: 20,
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 10,
              }}>
              <Pressable
                // onPress={() => navigation.navigate('OpenCamera')}
                style={{
                  padding: 5,
                  margin: 5,
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center',
                }}>
                <Feather name="camera" size={20} color="#ADD8E6" />
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    fontSize: 16,
                    color: '#4F4F4F',
                    marginLeft: 20,
                  }}>
                  Camera
                </Text>
              </Pressable>

              <Divider />

              <Pressable
                onPress={uploadVideo}
                style={{
                  padding: 5,
                  margin: 5,
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center',
                }}>
                <Feather name="video" size={20} color="#ADD8E6" />
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    fontSize: 16,
                    color: '#4F4F4F',
                    marginLeft: 20,
                  }}>
                  Video Library
                </Text>
              </Pressable>

              <Divider />
            </View>
            <View style={{margin: 20, marginTop: -10}}>
              <TouchableOpacity
                onPress={() => {
                  setPopupVisible(false);
                }}
                style={{
                  backgroundColor: 'white',
                  padding: 15,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: fonts.regular,
                    color: colors.primary,
                    fontSize: 16,
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isPopupVisible1}
        animationType="slide"
        style={{}}
        transparent>
        <View style={{backgroundColor: 'rgba(0,0,0,0.5)', flex: 1}}>
          <View
            style={{
              position: 'absolute',
              bottom: '10%',
              width: '100%',
            }}>
            <View
              style={{
                margin: 20,
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 10,
              }}>
              <Pressable
                // onPress={() => navigation.navigate('OpenCamera')}
                style={{
                  padding: 5,
                  margin: 5,
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center',
                }}>
                <Feather name="camera" size={20} color="#ADD8E6" />
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    fontSize: 16,
                    color: '#4F4F4F',
                    marginLeft: 20,
                  }}>
                  Camera
                </Text>
              </Pressable>

              <Divider />

              <Pressable
                onPress={selectImageHandler}
                style={{
                  padding: 5,
                  margin: 5,
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center',
                }}>
                <Feather name="video" size={20} color="#ADD8E6" />
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    fontSize: 16,
                    color: '#4F4F4F',
                    marginLeft: 20,
                  }}>
                  Image Library
                </Text>
              </Pressable>

              <Divider />
            </View>
            <View style={{margin: 20, marginTop: -10}}>
              <TouchableOpacity
                onPress={() => {
                  setPopupVisible1(false);
                }}
                style={{
                  backgroundColor: 'white',
                  padding: 15,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: fonts.regular,
                    color: colors.primary,
                    fontSize: 16,
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <Title title="Add Portfolio" />

        <ScrollView>
          {/* <View style={styles.inputContainer}>
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
                  maxLength={500}
                  onChangeText={text => {
                    handleError('', 'serviceDescription');
                    handleOnchange(text, 'serviceDescription');
                  }}
                  blurOnSubmit={true}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  style={{padding: 15}}
                />
              </View>
              {errors && (
                <Text
                  style={{
                    marginTop: 5,
                    color: 'red',
                  }}>
                  {errors.serviceDescription}
                </Text>
              )}
            </View>
          </View> */}

          <View style={styles.textContainer}>
            <Text
              style={{
                fontFamily: fonts.semibold,
                color: colors.black,
                fontSize: 16,
              }}>
              Video
            </Text>
          </View>

          <Pressable
            onPress={() => setPopupVisible(true)}
            style={styles.videoInput}>
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

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
              margin: 15,
            }}>
            <Text
              style={{
                fontFamily: fonts.semibold,
                color: colors.black,
                fontSize: 16,
              }}>
              Photos
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (list <= 5) {
                  setList(list + 1);
                }
              }}>
              <Text style={{color: '#4F4F4F'}}>
                <Feather name="plus-circle" size={15} color={colors.primary} />{' '}
                Add more{' '}
              </Text>
            </TouchableOpacity>
          </View>
          {Array(list)
            .fill('')
            .map((_, index) => {
              return (
                <View
                  key={index}
                  style={{
                    ...appstyle.shadow,
                    borderRadius: 10,
                    margin: 10,
                    padding: 10,
                  }}>
                  {imageLoading && <ActivityIndicator style={{margin: 20}} />}

                  <View style={styles.photoContainer}>
                    <Pressable
                      onPress={() => setPopupVisible1(true)}
                      style={styles.innerPhotos}>
                      <Feather name="image" size={30} color="#14226D" />
                      <Text
                        style={{
                          fontFamily: fonts.regular,
                          color: colors.black,
                        }}>
                        Click{' '}
                        <Text
                          style={{
                            color: colors.primary,
                            fontFamily: fonts.bold,
                          }}>
                          here{' '}
                        </Text>
                      </Text>
                    </Pressable>

                    <FastImage
                      source={{uri: `data:image/jpeg;base64,${image[index]}`}}
                      style={styles.innerPhotos}
                    />
                  </View>
                  {/*  */}

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
              );
            })}

          {list >= 2 && (
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                marginTop: 10,
                margin: 15,
              }}>
              <Pressable
                onPress={() => {
                  if (list >= 2) {
                    setList(list - 1);
                  }
                }}
                style={{
                  backgroundColor: 'red',
                  padding: 5,
                  borderRadius: 100,
                }}>
                <Feather name="x" size={15} color={colors.white} />
              </Pressable>
            </View>
          )}
          {!!error && (
            <Text
              style={{
                margin: 10,
                color: colors.red,
                fontFamily: fonts.medium,
              }}>
              {error}
            </Text>
          )}
          <CustomButton
            title="Save"
            onPress={validate}
            style={{marginTop: 20}}
            disabled={!loading}
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
  photoContainer: {},
  container1: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default AddService;
