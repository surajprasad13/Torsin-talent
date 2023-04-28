import * as React from 'react';
import 'react-native-gesture-handler';
import { View, TouchableOpacity, Image, Text, StyleSheet, Button } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';

 import AboutUs from './drawerScreens/AboutUs';
import Tabs from '../../tabScreen/Tabs';
import CustomSidebarMenu from '../CustomSidebarMenu';
import Proposals from './drawerScreens/Proposals';
import MyRating from './drawerScreens/MyRating';
import MyService from './drawerScreens/MyService';
import MyJobs from './drawerScreens/MyJobs';
import Payment from './drawerScreens/Payment';
import SwitchAccount from './drawerScreens/SwitchAccount';
import Terms from './drawerScreens/Terms';


const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomSidebarMenu {...props} />}
            

            screenOptions={{
                drawerItemStyle: { borderRadius: 0, marginVertical: 7, borderBottomWidth: 0.5, borderBottomColor: '#d3d3d3', },
                headerShown: false,
                drawerActiveBackgroundColor: '#ffffff',
                drawerActiveTintColor: '#000C14',
                // drawerInactiveTintColor: '#333',
                drawerLabelStyle: {
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: 16,
                    lineHeight: 24,
                    color: '#000C14'
                },
            }}>

            <Drawer.Screen
                name="Notifications"
                component={Tabs}
                options={{
                    drawerIcon: ({ color }) => (
                       <>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Image
                                    source={require('../../../Image/Bell_light.png')}
                                    style={{
                                        width: 24,
                                        height: 23,
                                        left: 23

                                    }}
                                />

                                <TouchableOpacity>
                                    <Image
                                        source={require('../../../Image/forward.png')}
                                        style={{
                                            width: 6,
                                            height: 11,
                                            left: 190,
                                            top: 5

                                        }}
                                    />
                                </TouchableOpacity>

                            </View>
                       </>
                    ),

                }}
            />

            <Drawer.Screen
                name="Proposals"
                component={Proposals}
                options={{
                    drawerIcon: ({ color }) => (

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Image
                                source={require('../../../Image/Bell_light.png')}
                                style={{
                                    width: 24,
                                    height: 23,
                                    left: 23,
                                    tintColor: '#ffffff'

                                }}
                            />

                        <TouchableOpacity>
                            <Image
                                source={require('../../../Image/forward.png')}
                                style={{
                                    width: 6,
                                    height: 11,
                                    left: 190,
                                    top: 5

                                }}
                            />
                        </TouchableOpacity>
                        </View>
                    ),

                }}
            />

            <Drawer.Screen
                name="My Ratings"
                component={MyRating}
                options={{
                    drawerIcon: ({ color }) => (
                        <>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Image
                                    source={require('../../../Image/Star_light.png')}
                                    style={{
                                        width: 24,
                                        height: 23,
                                        left: 23

                                    }}
                                />

                                <TouchableOpacity>
                                    <Image
                                        source={require('../../../Image/forward.png')}
                                        style={{
                                            width: 6,
                                            height: 11,
                                            left: 190,
                                            top: 5

                                        }}
                                    />
                                </TouchableOpacity>

                            </View>
                        </>
                    ),

                }}
            />

            <Drawer.Screen
                name="My Services"
                component={MyService}
                options={{
                    drawerIcon: ({ color }) => (

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Image
                                source={require('../../../Image/Bell_light.png')}
                                style={{
                                    width: 24,
                                    height: 23,
                                    left: 23,
                                    tintColor: '#ffffff'

                                }}
                            />

                            <TouchableOpacity>
                                <Image
                                    source={require('../../../Image/forward.png')}
                                    style={{
                                        width: 6,
                                        height: 11,
                                        left: 190,
                                        top: 5

                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    ),

                }}
            />

            <Drawer.Screen
                name="My Jobs"
                component={MyJobs}
                options={{
                    drawerIcon: ({ color }) => (
                        <>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Image
                                    source={require('../../../Image/jobs.png')}
                                    style={{
                                        width: 24,
                                        height: 23,
                                        left: 23

                                    }}
                                />

                                <TouchableOpacity>
                                    <Image
                                        source={require('../../../Image/forward.png')}
                                        style={{
                                            width: 6,
                                            height: 11,
                                            left: 190,
                                            top: 5

                                        }}
                                    />
                                </TouchableOpacity>

                            </View>
                        </>
                    ),

                }}
            />


            <Drawer.Screen
                name="Payments"
                component={Payment}
                options={{
                    drawerIcon: ({ color }) => (
                        <>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Image
                                    source={require('../../../Image/card_light.png')}
                                    style={{
                                        width: 24,
                                        height: 23,
                                        left: 23

                                    }}
                                />

                                <TouchableOpacity>
                                    <Image
                                        source={require('../../../Image/forward.png')}
                                        style={{
                                            width: 6,
                                            height: 11,
                                            left: 190,
                                            top: 5

                                        }}
                                    />
                                </TouchableOpacity>

                            </View>
                        </>
                    ),

                }}
            />

            <Drawer.Screen
                name="Switch Account"
                component={SwitchAccount}
                options={{
                    drawerIcon: ({ color }) => (
                        <>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Image
                                    source={require('../../../Image/switch.png')}
                                    style={{
                                        width: 24,
                                        height: 23,
                                        left: 23

                                    }}
                                />

                                <TouchableOpacity>
                                    <Image
                                        source={require('../../../Image/forward.png')}
                                        style={{
                                            width: 6,
                                            height: 11,
                                            left: 190,
                                            top: 5

                                        }}
                                    />
                                </TouchableOpacity>

                            </View>
                        </>
                    ),

                }}
            />

            <Drawer.Screen
                name="About Us"
                component={AboutUs}
                options={{
                    drawerIcon: ({ color }) => (
                        <>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Image
                                    source={require('../../../Image/info_light.png')}
                                    style={{
                                        width: 24,
                                        height: 23,
                                        left: 23

                                    }}
                                />

                                <TouchableOpacity>
                                    <Image
                                        source={require('../../../Image/forward.png')}
                                        style={{
                                            width: 6,
                                            height: 11,
                                            left: 190,
                                            top: 5

                                        }}
                                    />
                                </TouchableOpacity>

                            </View>
                        </>
                    ),

                }}
            />

            <Drawer.Screen
                name="Terms & Privacy"
                component={Terms}
                options={{
                    drawerIcon: ({ color }) => (
                        <>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Image
                                    source={require('../../../Image/shield.png')}
                                    style={{
                                        width: 24,
                                        height: 23,
                                        left: 23

                                    }}
                                />

                                <TouchableOpacity>
                                    <Image
                                        source={require('../../../Image/forward.png')}
                                        style={{
                                            width: 6,
                                            height: 11,
                                            left: 190,
                                            top: 5

                                        }}
                                    />
                                </TouchableOpacity>

                            </View>
                        </>
                    ),

                }}
            />

            <Drawer.Screen
                name="Help & Support"
                component={Terms}
                options={{
                    drawerIcon: ({ color }) => (
                        <>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Image
                                    source={require('../../../Image/callcenter.png')}
                                    style={{
                                        width: 24,
                                        height: 23,
                                        left: 23

                                    }}
                                />

                                <TouchableOpacity>
                                    <Image
                                        source={require('../../../Image/forward.png')}
                                        style={{
                                            width: 6,
                                            height: 11,
                                            left: 190,
                                            top: 5

                                        }}
                                    />
                                </TouchableOpacity>

                            </View>
                        </>
                    ),

                }}
            />

        </Drawer.Navigator>
    );
};

export default DrawerNavigation;
