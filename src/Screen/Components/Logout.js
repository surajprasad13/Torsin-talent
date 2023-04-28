import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import AwesomeAlert from "react-native-awesome-alerts";



const Logout = () => {
    const navigation = useNavigation();

    const [showAlert, setShowAlert] = useState(false)

    return (
        <View style={{
            backgroundColor: '#F0F0F0',
            width: 290,
            height: 60,
            flexDirection: 'row',

        }}>

            <Image
                source={require("../../Image/logout.png")}
                style={{
                    width: 20,
                    height: 20,
                    top: 25,
                    left: 30
                }}
            />

            <TouchableOpacity
                onPress={() => setShowAlert(!showAlert)}>
                <Text style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: 18,
                    lineHeight: 25,
                    top: 20,
                    left: 40,
                    color: "#000000"
                }}>Log Out</Text>
            </TouchableOpacity>

            <AwesomeAlert
                show={showAlert}

                // title="Confirm Log Out "
                // titleStyle={}
                // message="Are you sure you want to logout?"
                // messageStyle={}



                showConfirmButton={true}
                confirmText="Log Out"
                confirmButtonStyle={{
                    backgroundColor: '#ffffff'
                }}
                confirmButtonTextStyle={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    fontSize: 16,
                    lineHeight: 22,
                    color: '#14226D',
                }}
                onConfirmPressed={() => {
                    navigation.navigate('LoginScreen')
                }}

                showCancelButton={true}
                cancelText="Cancel"
                cancelButtonStyle={{ backgroundColor: 'red', borderRadius: 8, width: 100, height: 45, }}
                cancelButtonTextStyle={{
                    textAlign: 'center',
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    fontSize: 16,
                    lineHeight: 22,
                    color: '#FFFFFF',
                }}
                onCancelPressed={() => {
                    console.log('Cancel')
                    setShowAlert(false)
                }}

                // showProgress= {true}
                // progressColor="red"
                // progressSize={40}

                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}

                customView={
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        <Image
                            source={require('../../Image/logout.png')}
                            style={{
                                width: 30,
                                height: 30
                            }}
                        />

                        <Text style={{
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontWeight: '600',
                            fontSize: 18,
                            lineHeight: 24,
                            textAlign: 'center',
                            color: '#121212',
                            marginTop: 10
                        }}>Confirm Logout</Text>

                        <Text style={{
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            fontSize: 14,
                            lineHeight: 24,
                            textAlign: 'center',
                            color: '#121212',
                            marginTop: 10
                        }}>Are you sure you want to logout?</Text>

                    </View>
                }
            />

        </View>
    )
};

export default Logout;

const styles = StyleSheet.create({})