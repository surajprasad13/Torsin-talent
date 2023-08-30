/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Modal,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Video from 'react-native-video';
import ImageCropPicker from 'react-native-image-crop-picker';
import {Divider} from 'react-native-paper';
import {useFormik} from 'formik';

// icons
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

// components
import {Title} from '../../components';

// helpers
import {appstyle, colors, fonts} from '../../theme';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {updateSuccess} from '../../redux/reducers/userSlice';
import {uploadFileToS3, uploadVideoToS3} from '../../services/s3';
import {SettingScreenParamList} from '../../routes/RouteType';
import {decode} from 'base64-arraybuffer';
import {getPortfolio} from '../../redux/actions/userAction';
import FastImage from 'react-native-fast-image';

type Source = 'camera' | 'library';

type NavigationProp = StackNavigationProp<SettingScreenParamList>;

type InputProps = {
  serviceImage: Array<string>;
  serviceVideo: string;
};

const {width} = Dimensions.get('window');

const AddPortfolio: FC = ({}) => {
  const navigation = useNavigation<NavigationProp>();

  const dispatch = useAppDispatch();

  const {loading, error, portfolio} = useAppSelector(state => state.user);

  const [inputs, setInputs] = useState<InputProps>({
    serviceImage: [],
    serviceVideo: '',
  });

  const [video, setVideo] = useState<string>('');

  const [videoModal, setVideoModal] = useState<boolean>(false);
  const [imageModal, setImageModal] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const [list, setList] = useState(1);

  //@ts-ignore
  useEffect(() => {
    const listener = navigation.addListener('beforeRemove', () => {
      dispatch(updateSuccess());
    });
    return () => listener;
  }, []);

  useEffect(() => {
    dispatch(getPortfolio(''));
  }, []);

  const onPressVideo = async (source: Source) => {
    try {
      let response: any = null;
      if (source == 'camera') {
        setVideoModal(false);
      } else {
        response = await ImageCropPicker.openPicker({
          width: 800,
          height: 600,
          cropping: true,
          mediaType: 'video',
        });
      }
      console.log(response);
    } catch (_error: any) {
      console.log('ImagePicker Error: ', _error);
    }
  };

  const onPressImage = async (source: Source) => {
    try {
      let response: any = null;

      if (source == 'camera') {
        response = await ImageCropPicker.openCamera({
          width: 800,
          height: 600,
          cropping: true,
          mediaType: 'photo',
        });

        setImageLoading(true);
      } else {
        response = await ImageCropPicker.openPicker({
          width: 800,
          height: 600,
          cropping: true,
          mediaType: 'photo',
          includeBase64: true,
        });

        setImageLoading(true);
      }

      var base64data = decode(response.data as any);
      const url = await uploadFileToS3(
        base64data,
        `${response.filename}`,
        'image/jpeg',
      );

      setImageLoading(false);
      setImageModal(false);
      navigation.navigate('OpenImage', {item: url.Location, type: 'image'});
    } catch (_error: any) {
      console.log('ImagePicker Error: ', _error);
      setImageLoading(false);
    }
  };

  const uploadVideo = async () => {
    const response = await ImageCropPicker.openPicker({
      mediaType: 'video',
      includeBase64: true,
    });
    if (response) {
      const url = await uploadVideoToS3(
        response.sourceURL as string,
        response.filename as string,
      );
      setInputs((prevState: any) => ({
        ...prevState,
        serviceVideo: url.body.postResponse.location,
      }));
      navigation.navigate('OpenImage', {item: '', type: 'video'});
    } else {
    }
  };

  const onSubmit = (event: any) => {
    console.log(event);
  };

  const formik = useFormik({
    initialValues: {
      image: false,
      video: false,
    },
    onSubmit,
  });

  console.log(portfolio);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F9FBFF'}}>
      {/* Video Modal */}

      <Modal visible={videoModal} animationType="slide" transparent>
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
                onPress={() => {
                  onPressVideo('camera');
                }}
                style={{
                  padding: 5,
                  margin: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Feather name="camera" size={20} color={colors.primary} />
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
                onPress={() => {
                  onPressVideo('library');
                }}
                style={{
                  padding: 5,
                  margin: 5,
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center',
                }}>
                <Feather name="video" size={20} color={colors.primary} />
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
            </View>

            <View style={{margin: 20, marginTop: -10}}>
              <TouchableOpacity
                onPress={() => {
                  setVideoModal(false);
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

      {/* Photo Modal */}

      <Modal visible={imageModal} animationType="slide" style={{}} transparent>
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
                onPress={() => {
                  onPressImage('camera');
                }}
                style={{
                  padding: 5,
                  margin: 5,
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center',
                }}>
                <Feather name="camera" size={20} color={colors.primary} />
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
                onPress={() => {
                  onPressImage('library');
                }}
                style={{
                  padding: 5,
                  margin: 5,
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center',
                }}>
                <Feather name="image" size={20} color={colors.primary} />
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
                  setImageModal(false);
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
            onPress={() => setVideoModal(true)}
            style={styles.videoInput}>
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

          {imageLoading && <ActivityIndicator />}

          <View
            style={{
              ...appstyle.shadow,
              borderRadius: 10,
              margin: 10,
              padding: 10,
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 10,
            }}>
            {portfolio?.photos.map((item, index) => (
              <Pressable
                key={index}
                style={{}}
                onPress={() => {
                  navigation.navigate('PortfolioDetail', {
                    item: item,
                    type: 'image',
                  });
                }}>
                <FastImage
                  source={{uri: item.photos}}
                  resizeMode="cover"
                  style={{width: width * 0.4, height: 150, borderRadius: 10}}
                />
              </Pressable>
            ))}

            {Array(list)
              .fill('')
              .map((_, index) => {
                return (
                  <View key={index} style={styles.photoContainer}>
                    <Pressable
                      onPress={() => setImageModal(true)}
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
                  </View>
                );
              })}
          </View>

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

          {/*  */}
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

export default AddPortfolio;
