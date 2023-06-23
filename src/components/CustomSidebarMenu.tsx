import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

// icons
import Feather from 'react-native-vector-icons/Feather';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// components
import Logout from './Logout';
import CircleProgress from './CircleProgress';
import {colors, fonts} from '../theme';
import {useAppSelector} from '../hooks';

const List = [
  {
    title: 'Notifications',
    route: 'Notifications',
    icon: ({color}: {color: string}) => (
      <EvilIcon name="bell" color={color} size={20} />
    ),
  },

  {
    title: 'Proposals',
    route: 'Proposals',
    icon: ({color}: {color: string}) => (
      <IonIcon name="newspaper-outline" color={color} size={20} />
    ),
  },
  {
    title: 'My Jobs',
    route: 'MyJobs',
    icon: ({color}: {color: string}) => (
      <FontAwesome name="calendar-check-o" color={color} size={20} />
    ),
  },
  {
    title: 'My Rating',
    route: 'MyRatings',
    icon: ({color}: {color: string}) => (
      <EvilIcon name="star" color={color} size={20} />
    ),
  },
  {
    title: 'My Contracts',
    route: 'ContractNavigator',
    icon: ({color}: {color: string}) => (
      <Feather name="briefcase" color={color} size={20} />
    ),
  },
  {
    title: 'My Services',
    route: 'MyServices',
    icon: ({color}: {color: string}) => (
      <EvilIcon name="star" color={color} size={20} />
    ),
  },
  {
    title: 'Payment',
    route: 'PaymentNavigator',
    icon: ({color}: {color: string}) => (
      <MaterialIcon name="payments" color={color} size={20} />
    ),
  },
  {
    title: 'About us',
    route: 'AboutUs',
    icon: ({color}: {color: string}) => (
      <AntDesign name="infocirlceo" color={color} size={20} />
    ),
  },
  {
    title: 'Terms and Privacy',
    route: 'TermsPrivacy',
    icon: ({color}: {color: string}) => (
      <IonIcon name="shield-checkmark-outline" color={color} size={20} />
    ),
  },
  {
    title: 'Help and Support',
    route: 'HelpSupport',
    icon: ({color}: {color: string}) => (
      <IonIcon name="md-headset" color={color} size={20} />
    ),
  },
];

const CustomSidebarMenu = ({state, ...rest}: any) => {
  const navigation = useNavigation();

  const {userInfo} = useAppSelector(state => state.auth);

  return (
    <SafeAreaView>
      <View style={styles.sideMenuContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 20}}>
          <CircleProgress image={userInfo?.profileImage} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              flex: 1,
            }}>
            <View style={{marginLeft: 10}}>
              <Text style={{fontFamily: fonts.semibold, color: '#1E202B'}}>
                {userInfo?.fullName}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('DrawerSetting', {
                    screen: 'EditProfile',
                  });
                }}>
                <Text
                  style={{
                    fontFamily: fonts.medium,
                    color: '#14226D',
                  }}>
                  Update profile
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DrawerSetting', {
                  screen: 'EditProfile',
                });
              }}>
              <Feather name="chevron-right" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileHeaderLine} />
        <ScrollView>
          {List.map((item, index) => {
            return (
              <Pressable
                key={index}
                style={[
                  styles.card,
                  {
                    backgroundColor:
                      state.index == index ? colors.white : 'transparent',
                  },
                ]}
                onPress={() => {
                  switch (item.route) {
                    case 'Proposals':
                      navigation.navigate('Proposals', {
                        sectionId: 'sent',
                      });
                      break;
                    case 'MyJobs':
                      navigation.navigate('MyJobs', {
                        sectionId: 'active',
                      });
                      break;
                    case 'AboutUs':
                      navigation.navigate('WebScreen', {
                        item: 'https://google.com',
                      });
                      break;
                    case 'TermsPrivacy':
                      navigation.navigate('WebScreen', {
                        item: 'https://facebook.com',
                      });
                      break;
                    case 'HelpSupport':
                      navigation.navigate('WebScreen', {
                        item: 'https://github.com',
                      });
                      break;
                    default:
                      navigation.navigate(item.route);
                  }
                }}>
                <View>
                  {item.icon({
                    color: state.index == index ? colors.primary : colors.grey,
                  })}
                </View>
                <View style={{flex: 1, marginLeft: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={[styles.text]}>{item.title}</Text>
                    <Feather
                      name="chevron-right"
                      size={20}
                      color={colors.grey}
                    />
                  </View>
                  <Divider style={{marginTop: 10}} />
                </View>
              </Pressable>
            );
          })}
        </ScrollView>

        <Logout />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuContainer: {
    height: '100%',
    borderTopRightRadius: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 15,
    textAlign: 'center',
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: 'white',
    backgroundColor: '#1e202e',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderText: {
    color: '#1e202e',
    left: 21,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  profileHeaderLine: {
    height: 9,
    backgroundColor: '#f9fbff',
    marginTop: 15,
    width: '100%',
  },
  card: {
    margin: 5,
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontFamily: fonts.medium,
    fontSize: 16,
    marginTop: 15,
  },
});

export default CustomSidebarMenu;
