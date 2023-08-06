/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TextInput,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';

//icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

// components
import ImageSlider from '../../components/ImageSlider';
import CircleProgress from '../../components/CircleProgress';
import {appstyle, colors, fonts} from '../../theme';
import ExpertiseCard from './components/ExpertiseCard';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {profileDetail, userUpdate} from '../../redux/actions/authAction';
import {jobCorrespondSkill} from '../../redux/actions/userAction';
import {HomeScreenParamList} from '../../routes/RouteType';

const {} = Dimensions.get('window');

type NavigationProp = StackNavigationProp<HomeScreenParamList>;

const HomeScreen = ({}) => {
  const dispatch = useAppDispatch();
  const {userInfo, userToken} = useAppSelector(state => state.auth);
  const {correspond, loading} = useAppSelector(state => state.user);

  const navigation = useNavigation<NavigationProp>();

  const setToken = async () => {
    const token = await messaging().getToken();

    if (token && userInfo?.id) {
      const ref = database().ref(`/Tokens/u2id${userInfo?.id}`);
      dispatch(
        userUpdate({
          inputs: {
            deviceToken: token,
          },
        }),
      );
      await ref.update({device_token: token});
    }
  };

  useEffect(() => {
    dispatch(profileDetail(''));
  }, []);

  useEffect(() => {
    setToken();
  }, []);

  useEffect(() => {
    dispatch(jobCorrespondSkill(userToken));
  }, []);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      dispatch(jobCorrespondSkill(userToken));
    });
    return listener;
  }, []);

  const onRefresh = React.useCallback(() => {
    dispatch(jobCorrespondSkill(userToken));
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={[appstyle.rowBetween, {padding: 10}]}>
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
            borderRadius: 100,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 0.2,
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

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        style={{}}>
        <View
          style={{
            borderRadius: 15,
            backgroundColor: colors.white,
            flexDirection: 'row',
            padding: 15,
            justifyContent: 'space-between',
          }}>
          <CircleProgress image={userInfo?.profileImage ?? ''} progress={100} />

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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
          }}>
          <Text style={{fontFamily: fonts.semibold, fontSize: 16}}>
            Blogs / News
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Feeds')}>
            <Text style={{fontFamily: fonts.medium, color: colors.primary}}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <ImageSlider />

        <View style={{margin: 10}}>
          <Text
            style={{
              fontFamily: fonts.regular,
              color: '#1E202B',
            }}>
            Hey, {userInfo?.fullName} job based on your expertise
          </Text>
        </View>
        <View style={{margin: 10}}>
          {correspond
            .filter(_item => _item.proposalStatus == 0)
            .map((item, index) => (
              <ExpertiseCard item={item} key={index.toString()} />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
