import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {} from 'react-native-paper';

//icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

// components
import ImageSlider from '../../components/ImageSlider';
import CircleProgress from '../../components/CircleProgress';
import {colors, fonts} from '../../theme';
import ExpertiseCard from './components/ExpertiseCard';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {profileDetail} from '../../redux/actions/authAction';

const {} = Dimensions.get('window');

const HomeScreen = ({}) => {
  const dispatch = useAppDispatch();
  const {userInfo} = useAppSelector(state => state.auth);

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(profileDetail(userInfo?.token.access));
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{padding: 10}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              //@ts-ignore
              navigation.openDrawer();
            }}>
            <MaterialIcons name="sort" size={20} color="#14226D" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 0.9,
              backgroundColor: colors.white,
              borderRadius: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Feather
              name="search"
              size={18}
              color={colors.primary}
              style={{marginLeft: 10}}
            />

            <TextInput
              placeholder="Search Talent"
              disableFullscreenUI
              placeholderTextColor="#BDBDBD"
              style={{
                padding: 10,
                flex: 1,
              }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            borderRadius: 15,
            backgroundColor: colors.white,
            flexDirection: 'row',
            padding: 15,
            justifyContent: 'space-between',
          }}>
          <CircleProgress image={userInfo?.profileImage} />
          <View style={{width: '70%'}}>
            <Text style={{fontFamily: fonts.semibold, color: '#1E202B'}}>
              {userInfo?.fullName} Profile
            </Text>
            <Text
              style={{
                fontFamily: fonts.regular,
                opacity: 0.8,
                color: '#1E202B',
              }}>
              Complete your profile. Set your profile completely so that
              recruiter will find your profile easily
            </Text>

            <TouchableOpacity>
              <Text style={{fontFamily: fonts.medium, color: colors.primary}}>
                5 Details Needed to add.....
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{top: 8}}>
          <ImageSlider />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 30,
          }}>
          <Text
            style={{
              fontFamily: fonts.regular,
              fontSize: 16,
              color: '#1E202B',
            }}>
            John based on your expertise
          </Text>
          <Text
            style={{
              height: 20,
              fontFamily: fonts.semibold,
              fontSize: 16,
              color: colors.primary,
            }}>
            view all
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
            <ExpertiseCard item={item} key={index.toString()} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchInput: {
    color: '#454545',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
