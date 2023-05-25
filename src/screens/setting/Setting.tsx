import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';

// components
import ProFile from '../../components/Profile';
import {colors, fonts} from '../../theme';
import {useAppSelector} from '../../hooks';
import ImageCropPicker from 'react-native-image-crop-picker';
import {decode} from 'base64-arraybuffer';
import {uploadFileToS3} from '../../services/s3';
import Profile from '../../components/Profile';

const Setting = ({}) => {
  const navigation = useNavigation();

  const {userInfo} = useAppSelector(state => state.auth);

  const [image, setImage] = useState('');
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [disable, setDisable] = useState(false);

  const uploadImage = async () => {
    setImageLoading(true);

    const response = await ImageCropPicker.openPicker({
      width: 400,
      height: 300,
      includeBase64: true,
      mediaType: 'photo',
      cropping: true,
    });

    if (response) {
      setImage(response.data as any);
      var base64data = decode(response.data as any);
      const url = await uploadFileToS3(
        base64data,
        `${response.filename}`,
        'image/jpeg',
      );
      setImageLoading(false);
    } else {
      setImageLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={{flex: 1, padding: 10}}>
        <View
          style={{
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View />
          <Text
            style={{
              textAlign: 'center',
              fontFamily: fonts.medium,
              fontSize: 16,
              color: '#000C14',
            }}>
            View Profile
          </Text>
          <View />
        </View>

        <View style={{backgroundColor: '#f9fbff', flex: 2}}>
          <Profile
            image={image.length > 0 ? image : userInfo?.profileImage}
            onPress={() => {
              if (disable) {
                uploadImage();
              }
            }}
            loading={imageLoading}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 40,
              padding: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: fonts.semibold,
                fontSize: 20,
                color: colors.black,
              }}>
              Personal Information
            </Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EditUserProfile');
              }}
              style={{flexDirection: 'row'}}>
              <AntDesign name="edit" size={20} />
              <Text style={{fontFamily: fonts.medium, color: colors.primary}}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.list}>
            <View style={styles.listContainer}>
              <AntDesign name="user" size={20} />
              <Text style={styles.userText}>{userInfo?.fullName}</Text>
            </View>

            {userInfo?.gender && (
              <View style={styles.listContainer}>
                <Image
                  source={require('../../assets/images/nounMale.png')}
                  style={styles.userIcon}
                />
                <Text style={styles.userText}>Male</Text>
              </View>
            )}
            <View style={styles.listContainer}>
              <Fontisto name="email" size={20} />
              <Text style={styles.userText}>{userInfo?.email}</Text>
            </View>

            <View style={styles.listContainer}>
              <Feather name="phone" size={20} />
              <Text style={styles.userText}>{userInfo?.mobileNo}</Text>
            </View>

            {userInfo?.location && (
              <View style={styles.listContainer}>
                <Entypo name="location-pin" size={20} />
                <Text style={styles.userText}>{userInfo?.location}</Text>
              </View>
            )}

            {userInfo?.countryName && (
              <View style={styles.listContainer}>
                <Entypo name="flag" size={20} />
                <Text style={styles.userText}>{userInfo?.countryName}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userText: {
    fontFamily: fonts.regular,
    color: colors.black,
    marginLeft: 10,
  },

  userIcon: {
    tintColor: '#6c6c6c',
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  list: {
    margin: 10,
  },
});

export default Setting;
