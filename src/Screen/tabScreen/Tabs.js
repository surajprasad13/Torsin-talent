import React, { useEffect, useState, createContext } from 'react';
import {
    Text,
    View,
    Image
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/AntDesign'

import HomeScreen from './HomeScreen';
import Publish from './Publish';
import ProfileScreen from './Jobs';
import Plan from './Publish';
// import Inbox from './Inbox';
import { TouchableOpacity } from 'react-native';
import Jobs from './Jobs';
import Chat from './Chat';
import Setting from './Setting';

// export const GlobalInfoTab = createContext();


// import Main from '../Drawer/Main'


const Tab = createBottomTabNavigator();

const Tabs = () => {

    // const [myid, setMyID] = useState("")
    // const homeClick = async () => {
    //     let user = await AsyncStorage.getItem('user_id');
    //     let parsed = JSON.parse(user);
    //     setMyID(parsed)
    // }

    // useEffect(() => {
    //     homeClick()
    // }, [])




    return (
        // <GlobalInfoTab.Provider value={{ myid: myid }}>
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: true
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image source={require('../../Image/tabImage/Home_light.png')}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#14226D' : '#66636C'
                            }}
                        />
                    )

                }}
            />

            <Tab.Screen
                name="Jobs"
                component={Jobs}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image source={require('../../Image/tabImage/Search.png')}
                            resizeMode="contain"
                            style={{
                                tintColor: focused ? '#14226D' : '#66636C',
                                width: 25,
                                height: 25,
                            }}
                        />
                    )

                }}

            />

            <Tab.Screen
                name="Chat"
                component={Chat}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image source={require('../../Image/tabImage/chat.png')}
                            resizeMode="contain"
                            style={{
                                tintColor: focused ? '#14226D' : '#66636C',
                                width: 25,
                                height: 25,
                            }}
                        />
                    )

                }}

            />

            <Tab.Screen
                name='Setting'
                component={Setting}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image source={require('../../Image/tabImage/User_light.png')}
                            resizeMode="contain"
                            style={{
                                tintColor: focused ? '#14226D' : '#66636C',
                                width: 25,
                                height: 25,
                            }}
                        />
                    )

                }}
            />

            {/* <Main /> */}
        </Tab.Navigator>
        // </GlobalInfoTab.Provider>



    );
};

export default Tabs;