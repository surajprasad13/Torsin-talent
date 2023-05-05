import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';

// icons
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

// components
import {CustomButton, CustomInput, Loader} from '../../components';

// helpers
import {appstyle, colors, fonts} from '../../theme';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {addService} from '../../redux/actions/userAction';
import {Button, Dialog, Portal} from 'react-native-paper';
import {updateSuccess} from '../../redux/reducers/userSlice';

const AddService = ({}) => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const {userToken} = useAppSelector(state => state.auth);
  const {loading, success, error} = useAppSelector(state => state.user);

  const [inputs, setInputs] = useState({
    serviceName: '',
    chargeType: 0,
    serviceCharge: 0,
    serviceDescription: '',
  });

  const data = [
    {label: 'Fixed', value: '1'},
    {label: 'Hourly', value: '2'},
  ];

  const handleOnchange = (text: string, input: any) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const onPressAdd = () => {
    let value = {
      inputs,
      userToken,
    };
    dispatch(addService(value));
    if (navigation.canGoBack()) navigation.goBack();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F9FBFF'}}>
      <Portal>
        <Dialog visible={success}>
          <Dialog.Title>Service Added</Dialog.Title>
          <Dialog.Actions>
            <Button
              onPress={() => {
                dispatch(updateSuccess());
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
            Job Description Complete your profile. Set your profile completely .
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
                  setInputs(prevState => ({
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
              }}>
              <TextInput
                placeholder="Type description here..."
                multiline={true}
                placeholderTextColor="#333333"
                value={inputs.serviceDescription}
                onChangeText={text =>
                  handleOnchange(text, 'serviceDescription')
                }
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
            Job Description Complete your profile. Set your profile completely .
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
        <View style={styles.videoInput}>
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
              <Text>upload</Text>
            </Text>
          </View>
        </View>
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
          {/*  */}
          <View style={styles.photoContainer}>
            <View style={styles.innerPhotos}>
              <Feather name="image" size={30} color="#14226D" />
              <Text style={{fontFamily: fonts.regular, color: colors.black}}>
                Click{' '}
                <Text style={{color: colors.primary, fontFamily: fonts.bold}}>
                  here{' '}
                </Text>
              </Text>
            </View>
            <View style={styles.innerPhotos}>
              <Feather name="image" size={30} color="#14226D" />
              <Text style={{fontFamily: fonts.regular, color: colors.black}}>
                Click{' '}
                <Text style={{color: colors.primary, fontFamily: fonts.bold}}>
                  here{' '}
                </Text>
              </Text>
            </View>
            <View style={styles.innerPhotos}>
              <Feather name="image" size={30} color="#14226D" />
              <Text style={{fontFamily: fonts.regular, color: colors.black}}>
                Click{' '}
                <Text style={{color: colors.primary, fontFamily: fonts.bold}}>
                  here{' '}
                </Text>
              </Text>
            </View>
          </View>
          {/*  */}
          <View style={{flexDirection: 'row'}}>
            <View style={styles.innerPhotos}>
              <Feather name="image" size={30} color="#14226D" />
              <Text style={{fontFamily: fonts.regular, color: colors.black}}>
                Click{' '}
                <Text style={{color: colors.primary, fontFamily: fonts.bold}}>
                  here{' '}
                </Text>
              </Text>
            </View>
            <View style={styles.innerPhotos}>
              <Feather name="image" size={30} color="#14226D" />
              <Text style={{fontFamily: fonts.regular, color: colors.black}}>
                Click{' '}
                <Text style={{color: colors.primary, fontFamily: fonts.bold}}>
                  here{' '}
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <CustomButton
          title="Add Service"
          onPress={onPressAdd}
          style={{marginTop: 50}}
          disabled={true}
          loading={loading}
        />
        <View style={{marginTop: 50}} />
      </ScrollView>
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
