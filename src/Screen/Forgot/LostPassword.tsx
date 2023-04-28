import React, { useState } from "react";

import { View, Text, StyleSheet, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';

import { horizontalScale, moderateScale, verticalScale } from '../Components/Metrics';

const LostPassword = ({ navigation }) => {

    const [email, setEmail] = useState('')

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>

            <TouchableOpacity
                onPress={() => navigation.navigate('LoginScreen')}
                style={{
                    left: 15,
                    marginTop: moderateScale(50)
                }}>
                <Image
                    style={styles.tinyLogo}
                    source={require('../../assets/images/backarrow.png')}
                />
            </TouchableOpacity>

            <View>

                <View style={{
                    marginTop: verticalScale(44.44),
                    marginLeft: horizontalScale(20),
                }}>
                    <Text style={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '700',
                        fontSize: moderateScale(32),
                        lineHeight: moderateScale(35),
                        color: '#0E184D'
                    }}>Lost Password</Text>

                    <Text style={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        width: horizontalScale(300),
                        fontSize: moderateScale(14),
                        lineHeight: moderateScale(17),
                        alignItems: 'center',
                        color: '#000F1A',
                        top: 20
                    }}>Please enter your email address, we will send the OTP to reset your password</Text>
                </View>

                <View style={{ marginTop: verticalScale(51) }}>

                    <Text style={{
                        color: '#4F4F4F',
                        marginLeft: horizontalScale(15),
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: moderateScale(16),
                        lineHeight: 22,
                    }}>Email</Text>

                    <View style={styles.inputText}>
                        <TextInput
                            style={styles.input}
                            placeholder="eg.john@gmail.com"
                            color = "#000000"
                            placeholderTextColor='#828282'
                            value={email}
                            onChangeText={() => setEmail()}
                        />
                    </View>

                </View>

            </View>

            <TouchableOpacity 
            onPress={() => navigation.navigate('VerifyOtp')}
            style={{
                width: '85%',
                height: 50,
                // marginTop: moderateScale(150),
                marginLeft: '7.5%',
                backgroundColor: '#14226D',
                justifyContent: 'center',
                borderRadius: 8,
                marginTop: 395,
                
            }}>
                <Text style={{
                    textAlign: 'center',
                    color: '#FFFFFF',
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    fontSize: moderateScale(16),
                    lineHeight: 22,
                    
                }}>Send OTP</Text>
            </TouchableOpacity>

        </ScrollView >
    )
};

export default LostPassword;

const styles = StyleSheet.create({

    inputText: {
        width: '92%',
        marginLeft: '4%',
        height: 50,
        borderWidth: 1,
        borderColor: '#BDBDBD',
        marginTop: 10,
        borderRadius: 12
    },

    input: {
        color: '#000000',
        fontSize: moderateScale(14),
        fontWeight: '400',
        fontFamily: 'Inter',
        fontStyle: 'normal',
    },

    tinyLogo: {
        width: 16,
        height: 16,
        tintColor: '#000000',

    },

})