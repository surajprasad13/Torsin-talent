import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';

// components
import Logout from './Logout';
import CircleProgress from './CircleProgress';

const CustomSidebarMenu = (props: any) => {
  const navigation = useNavigation();
  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              top: 20,
              left: 10,
            }}>
            <CircleProgress />
            <Text
              style={{
                bottom: 65,
                left: 119,
                fontFamily: 'Inter',
                fontWeight: '600',
                fontSize: 16,
                lineHeight: 20,
                display: 'flex',
                alignItems: 'center',
                color: '#1E202B',
              }}>
              John Smith
            </Text>

            <TouchableOpacity
              onPress={() => {
                //@ts-expect-error
                navigation.navigate('EditProfile');
              }}>
              <Text
                style={{
                  bottom: 65,
                  left: 119,
                  height: 20,
                  fontFamily: 'Inter',
                  fontWeight: '500',
                  fontSize: 14,
                  lineHeight: 20,
                  display: 'flex',
                  alignItems: 'center',
                  color: '#14226D',
                }}>
                Update profile
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              //@ts-expect-error
              navigation.navigate('EditProfile');
            }}
            style={{
              marginTop: 60,
              position: 'absolute',
              right: 20,
            }}>
            <Image
              source={require('../assets/images/forward.png')}
              style={{
                width: 6,
                height: 11,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          onPress={() => {}}
          label={({}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                bottom: 10,
                borderRadius: 10,
              }}></View>
          )}
        />
      </DrawerContentScrollView>
      <Logout />
    </View>
  );
};

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: 290,
    height: '100%',
    borderTopRightRadius: 10,
    backgroundColor: '#ffffff',
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
    width: 290,
  },
});

export default CustomSidebarMenu;
