import React, { useState } from "react";

import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Keyboard, SafeAreaView, Alert, Pressable } from 'react-native';
import { RadioButton } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import { horizontalScale, moderateScale, verticalScale } from "./Components/Metrics";
import Icon from 'react-native-vector-icons/FontAwesome5';
import COLORS from '../src/conts/colors';
import Button from '../src/views/components/Button';
import Input from '../src/views/components/Input';
import Loader from '../src/views/components/Loader';
import { Dropdown } from 'react-native-element-dropdown';

import ProFile from "./Components/ProFile";

const BusinessRegister = ({ navigation }) => {

    const data = [
        { label: 'India', value: '1' },
        { label: 'Nepal', value: '2' },
        { label: 'America', value: '3' },
       
    ];

    const [countryValue, setIsCountryValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [inputs, setInputs] = React.useState({
        email: '',
        fullname: '',
        phone: '',
        location: '',
        country: '',
    });

    const [value, setValue] = useState('')

    const onChangeEmail = (text) => {
        if (text.length == 0) {
            setValue({ value: true })
        } else {
            setValue({ value: false })
        }
        setValue({ value: text })
    };

    const [phoneChange, setPhoneChange] = useState('')

    const onChangePhone = (e) => {
        if (e.length == 0) {
            setPhoneChange({ phoneChange: true })
        } else {
            setPhoneChange({ phoneChange: false })
        }
        setPhoneChange({ phoneChange: e })
    }

    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    const [checked, setChecked] = React.useState('first');
    const [toggleCheckBox, setToggleCheckBox] = React.useState(false)

    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;

        if (!inputs.fullname) {
            handleError('Please input fullname', 'fullname');
            isValid = false;
        }

        if (!inputs.email) {
            handleError('Please input email', 'email');
            isValid = false;
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError('Please input a valid email', 'email');
            isValid = false;
        }

        if (!inputs.phone) {
            handleError('Please input phone number', 'phone');
            isValid = false;
        }

        if (!inputs.location) {
            handleError('Please input Location', 'location');
            isValid = false;
        }

        if (!inputs.country) {
            handleError('Please input Country', 'country');
            isValid = false;
        }

        if (isValid) {
            register();
        }
    };

    const register = () => {
        setLoading(true);
        setTimeout(() => {
            try {
                setLoading(false);
                AsyncStorage.setItem('userData', JSON.stringify(inputs));
                navigation.navigate('VerifyOtpRegister');
            } catch (error) {
                Alert.alert('Error', 'Something went wrong');
            }
        }, 3000);
    };

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <Loader visible={loading} />
            <ScrollView
                contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
                <Text style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    fontSize: moderateScale(32),
                    lineHeight: moderateScale(35),
                    color: '#0E184D'
                }}>
                    Create Account
                </Text>
                <Text style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    width: 300,
                    fontSize: moderateScale(14),
                    lineHeight: moderateScale(17),
                    alignItems: 'center',
                    color: '#000F1A'
                }}>
                    Set up your account with us! Please fill the below details to create account.
                </Text>

                <View>
                    <ProFile />
                </View>

                <View style={{ marginVertical: 10 }}>

                    <Input
                        onChangeText={text => handleOnchange(text, 'fullname')}
                        onFocus={() => handleError(null, 'fullname')}
                        // iconName="account-outline"
                        label="Name"
                        placeholder="Enter your full name"
                        error={errors.fullname}
                    />

                    <View>
                        <Input
                            onChangeText={(text) => onChangeEmail(text)}
                            onFocus={() => handleError(null, 'email')}
                            // iconName="email-outline"
                            label="Email"
                            placeholder="Enter your email address"
                            error={errors.email}
                        />
                        <Pressable
                            value={value}
                            style={{
                                position: 'absolute',
                                marginTop: 34,
                                right: 10
                            }}>
                            <Text style={{
                                color: value ? '#6180F4' : 'gray',
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: '400',
                                fontSize: 14,
                                lineHeight: 20,
                                display: 'flex',
                                alignItems: 'center',
                            }}>Verify</Text>
                        </Pressable>
                    </View>

                    <View>
                        <Input
                            keyboardType="numeric"
                            onChangeText={(e) => onChangePhone(e)}
                            onFocus={() => handleError(null, 'phone')}
                            // iconName="phone-outline"
                            label="Phone Number"
                            placeholder="Enter your phone no"
                            error={errors.phone}
                        />
                        <Pressable
                            phoneChange={phoneChange}
                            style={{
                                position: 'absolute',
                                marginTop: 34,
                                right: 10
                            }}>
                            <Text

                                style={{
                                    color: phoneChange ? '#6180F4' : 'gray',
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    fontSize: 14,
                                    lineHeight: 20,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>Verify</Text>
                        </Pressable>
                    </View>

                    <View style={{ marginTop: verticalScale(10), }}>
                        <Text style={{
                            color: '#4F4F4F',
                            marginLeft: horizontalScale(15),
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            fontSize: moderateScale(16),
                            lineHeight: 22,
                        }}>Gender</Text>

                        <View style={{ flexDirection: 'row', marginLeft: horizontalScale(15), }}>
                            <RadioButton
                                value="first"
                                status={checked === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('first')}
                            />
                            <Text style={{
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: '400',
                                fontSize: 14,
                                lineHeight: 20,
                                display: 'flex',
                                marginTop: verticalScale(7),
                                alignItems: 'center',
                                color: '#4F4F4F',
                            }}>Male</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginLeft: horizontalScale(15), }}>
                            <RadioButton
                                value="second"
                                status={checked === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('second')}
                            />
                            <Text style={{
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: '400',
                                fontSize: 14,
                                lineHeight: 20,
                                display: 'flex',
                                marginTop: verticalScale(7),
                                alignItems: 'center',
                                color: '#4F4F4F',
                            }}>Female</Text>
                        </View>

                    </View>

                    <Input
                        onChangeText={text => handleOnchange(text, 'location')}
                        onFocus={() => handleError(null, 'location')}
                        // iconName="lock-outline"
                        label="Location"
                        placeholder="Enter your Location"
                        error={errors.location}
                        location
                    />

                    <Text style={{
                        color: '#000000',
                        fontSize: 14,
                        fontWeight: '400',
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        marginBottom: -10
                    }}>Country</Text>

                    <View style={{
                        width: '100%',
                        // marginLeft: '4%',
                        height: 50,
                        borderWidth: 1,
                        borderColor: '#BDBDBD',
                        marginTop: 10,
                        borderRadius: 12
                    }}>
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: '#454545' }]}
                            data={data}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={'Country'}
                            placeholderStyle={{
                                marginLeft: 10,
                                marginTop: 10
                            }}
                            searchPlaceholder="Search..."
                            value={countryValue}
                            onFocus={() => setIsCountryValue(true)}
                            onBlur={() => setIsCountryValue(false)}
                            iconStyle={{
                                top: 5,
                                right: 5
                            }}

                        />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: moderateScale(10), marginLeft: horizontalScale(15), }}>
                        <View style={{ marginTop: moderateScale(-5) }}>
                            <CheckBox
                                style={styles.checkbox}
                                disabled={false}
                                onCheckColor="#14226D"
                                value={toggleCheckBox}
                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                            />
                        </View>
                        <Text
                            style={{
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: '400',
                                fontSize: moderateScale(14),
                                lineHeight: 22,
                                color: '#000000'
                            }}>
                            I have accepted the
                        </Text>
                        <Text
                            onPress={() => navigation.navigate('RegisterScreen')}
                            style={{
                                color: '#0E184D',
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: '700',
                                fontSize: moderateScale(14),
                                lineHeight: 22
                            }}>
                            Terms and Conditions.
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={validate}
                        style={{
                            width: '85%',
                            height: 50,
                            marginTop: verticalScale(20),
                            // marginTop: moderateScale(150),
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
                        }}>Next</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', marginTop: moderateScale(20), justifyContent: 'center', }}>
                        <Text
                            style={{
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: '400',
                                fontSize: moderateScale(14),
                                lineHeight: 22,
                                color: '#000000'
                            }}>
                            Already have an account?
                        </Text>
                        <Text
                            onPress={() => navigation.navigate('LoginScreen')}
                            style={{
                                color: '#0E184D',
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: '700',
                                fontSize: moderateScale(14),
                                lineHeight: 22
                            }}>
                            Log In
                        </Text>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

export default BusinessRegister;

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
        width: 25,
        height: 25,

    },

})