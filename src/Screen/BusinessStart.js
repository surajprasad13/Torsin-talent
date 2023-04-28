import React from "react"
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native"
import { moderateScale } from "./Components/Metrics";

const BusinessStart = () => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#ffffff'
        }}>

            <ImageBackground
                source={require('../Image/business.png')}
                style={{
                    flex: .8,
                    backgroundColor: '#ffffff',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    
                }}>

                <View style={{
                    
                }}>
                    <Text style={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '800',
                        fontSize: 32,
                        textAlign: 'center',
                        width: 259,
                        textTransform: 'uppercase',
                        color: '#14226D',
                    }}>Let’s get started with Torsin</Text>
                </View>

                </ImageBackground>

           

            <View>
                <Text style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: 16,
                    textAlign: 'center',
                    color:' #000F1A',
                }}>Account Created Successful</Text>
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate('HomeScreen')}
                style={{
                    width: '85%',
                    // flex: 0.075,
                    height: 50,
                    marginTop: moderateScale(50),
                    marginLeft: '7.5%',
                    backgroundColor: '#0E184D',
                    justifyContent: 'center',
                    borderRadius: 8
                }}>
                <Text style={{
                    textAlign: 'center',
                    color: '#FFFFFF',
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    fontSize: moderateScale(16),
                    lineHeight: 22,
                }}>Let’s start</Text>
            </TouchableOpacity>


        </View>
    )
};

export default BusinessStart;

const styles = StyleSheet.create({})