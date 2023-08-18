import React, {FC} from 'react';
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
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';

// icons
import Feather from 'react-native-vector-icons/Feather';

import {DrawerScreenData} from '../constants/navigation';

// components
import Logout from './Logout';
import CircleProgress from './CircleProgress';
import {colors, fonts} from '../theme';
import {useAppSelector} from '../hooks';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerScreenParamaList, RootStackParamList} from '../routes/RouteType';
import {StackNavigationProp} from '@react-navigation/stack';

type NavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerScreenParamaList, 'BottomNavigation'>,
  StackNavigationProp<RootStackParamList>
>;

const CustomSidebarMenu: FC<any> = ({state: navigationState}: any) => {
  const navigation = useNavigation<NavigationProp>();

  const {userInfo} = useAppSelector(state => state.auth);

  return (
    <SafeAreaView>
      <View style={styles.sideMenuContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 20}}>
          <CircleProgress image={userInfo?.profileImage ?? ''} progress={100} />
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
                  navigation.navigate('BottomNavigation', {
                    screen: 'SettingNavigator',
                    params: {
                      screen: 'EditProfile',
                    },
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
                navigation.navigate('BottomNavigation', {
                  screen: 'SettingNavigator',
                  params: {
                    screen: 'EditProfile',
                  },
                });
              }}>
              <Feather name="chevron-right" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileHeaderLine} />
        <ScrollView>
          {DrawerScreenData.map((item, index) => {
            return (
              <Pressable
                key={index}
                style={[
                  styles.card,
                  {
                    backgroundColor:
                      navigationState.index == index
                        ? colors.white
                        : 'transparent',
                  },
                ]}
                onPress={() => {
                  switch (item.route) {
                    case 'ProposalNavigator':
                      navigation.navigate('ProposalNavigator', {
                        screen: 'Proposals',
                      });
                      break;
                    case 'JobNavigator':
                      navigation.navigate('JobNavigator', {
                        screen: 'MyAllJobs',
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
                      navigation.navigate('HelpSupport');
                      break;
                    default:
                      //@ts-ignore
                      navigation.navigate(item.route);
                  }
                }}>
                <View>
                  {item.icon({
                    color:
                      navigationState.index == index
                        ? colors.primary
                        : colors.grey,
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
    marginTop: 10,
  },
});

export default CustomSidebarMenu;
