import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
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
import {CustomButton, CustomInput, Title} from '../../components';

// helpers
import {appstyle, colors, fonts} from '../../theme';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {addProposal} from '../../redux/actions/userAction';
import {resetSuccess} from '../../redux/reducers/userSlice';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadFileToS3, uploadVideoToS3} from '../../services/s3';
import {decode} from 'base64-arraybuffer';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import ImageCropPicker from 'react-native-image-crop-picker';

type InputProps = {
  job: number;
  message: string;
  video: string;
  portfolio: string;
  projectType: number;
  charge: number;
  images: Array<string>;
};

const AddJobDetails = ({route}: any) => {
  const {id} = route.params;

  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const {userToken} = useAppSelector(state => state.auth);
  const {loading, addSuccess} = useAppSelector(state => state.user);

  const [inputs, setInputs] = useState({
    message: '',
    video: '',
    portfolio: '',
    projectType: '',
    charge: '',
    images: [],
  });

  const [data, setData] = useState<InputProps | object>({job: id ?? 0});

  const [errors, setErrors] = useState<any>({});

  const [image, setImage] = useState(['', '', '']);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [videoLoading, setVideoLoading] = useState<boolean>(false);
  const [video, setVideo] = useState('');

  const projectTypes = [
    {label: 'Fixed', value: '1'},
    {label: 'Hourly', value: '2'},
  ];

  const handleOnchange = (text: string, input: any) => {
    setData((prevState: any) => ({...prevState, [input]: text}));
    setInputs((prevState: any) => ({...prevState, [input]: text}));
  };

  const validate = () => {
    Keyboard.dismiss();

    let isValid = true;

    if (inputs.message.length == 0) {
      handleError('Please add message', 'message');
      isValid = false;
    }
    if (inputs.message.length < 50) {
      handleError('Please add at least 50 character', 'message');
      isValid = false;
    }
    if (inputs.charge.length > 0) {
      if (Number(inputs.charge) == 0) {
        handleError('Please add valid amount', 'serviceCharge');
        isValid = false;
      }
    }
    if (isValid) {
      postService();
    }
  };

  const handleError = (_error: any, input: any) => {
    setErrors((prevState: any) => ({...prevState, [input]: _error}));
  };

  const postService = () => {
    let value = {
      inputs: data,
      userToken,
    };
    dispatch(addProposal(value));
  };

  useEffect(() => {
    const listener = navigation.addListener('beforeRemove', () => {
      dispatch(resetSuccess());
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
            images: [...inputs.images, url.Location],
          }));
          //@ts-ignore
          image[index] = response.assets[0].base64;
          setImageLoading(false);
        } catch (_error: any) {
          setImageLoading(false);
        }
      }
    });
  };

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

      setVideo(response.sourceURL as string);
      setVideoLoading(false);
    } else {
      setVideoLoading(false);
    }
  };

  useEffect(() => {
    if (addSuccess) {
      navigation.navigate('ProposalSentSuccess');
    }
  }, [addSuccess]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F9FBFF'}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <Title title="Add Proposal Detail" />

        <ScrollView>
          <View style={{marginTop: 0, margin: 15}}>
            <Text
              style={{
                fontFamily: fonts.regular,
                color: '#4F4F4F',
                fontSize: 16,
              }}>
              Message
            </Text>

            <TextInput
              placeholder="I am writing to submit a proposal on behalf of your requirement for  ..."
              multiline={true}
              //returnKeyType="none"
              placeholderTextColor="#4F4F4F"
              value={inputs.message}
              maxLength={500}
              onChangeText={text => {
                handleOnchange(text, 'message');
              }}
              onFocus={() => {
                handleError('', 'message');
              }}
              blurOnSubmit={true}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              style={{
                marginTop: 10,
                padding: 15,
                height: 170,
                borderWidth: 0.5,
                borderRadius: 8,
                borderColor: colors.light,
                backgroundColor: colors.white,
              }}
            />
            {errors && (
              <Text
                style={{
                  marginTop: 5,
                  color: 'red',
                }}>
                {errors.message}
              </Text>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '100%',
            }}>
            <View style={{marginTop: 10, width: '45%'}}>
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
                  data={projectTypes}
                  labelField="label"
                  valueField="value"
                  placeholder={'Select'}
                  placeholderStyle={{color: '#828282'}}
                  value={String(inputs.projectType)}
                  onChange={item => {
                    setData((prevState: any) => ({
                      ...prevState,
                      projectType: Number(item.value),
                    }));
                    setInputs((prevState: any) => ({
                      ...prevState,
                      projectType: Number(item.value),
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
              maxLength={5}
              keyboardType="number-pad"
              value={String(inputs.charge)}
              onChangeText={text => {
                handleError('', 'serviceCharge');
                const pattern = /^[0-9]*$/;
                const pass = pattern.test(text);
                if (pass) {
                  handleOnchange(text, 'charge');
                }
              }}
              containerStyle={{marginTop: 10, width: '45%'}}
              error={errors.serviceCharge}
            />
          </View>

          <View style={styles.textContainer}>
            <Text
              style={{
                fontFamily: fonts.regular,
                color: '#4F4F4F',
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
              {image.map((item: string, index: number) => {
                return (
                  <View key={index.toString()} style={{flex: 1}}>
                    {item.length > 0 ? (
                      <Pressable
                        onPress={() => uploadImage(0)}
                        style={styles.innerPhotos}>
                        <FastImage
                          source={{
                            uri: 'data:image/png;base64,' + item,
                          }}
                          resizeMode="cover"
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 10,
                          }}
                        />
                      </Pressable>
                    ) : (
                      <Pressable
                        onPress={() => uploadImage(index)}
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
                    )}
                  </View>
                );
              })}
            </View>
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
          </Pressable>
          <CustomInput
            label="Add Portfolio link"
            placeholder="https://portfolio.link.com"
            containerStyle={{marginTop: 10, margin: 15}}
            value={inputs.portfolio}
            onChangeText={text => handleOnchange(text, 'portfolio')}
          />
          <CustomButton
            title="Submit"
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
    marginTop: 10,
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
    minHeight: 140,
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

export default AddJobDetails;
