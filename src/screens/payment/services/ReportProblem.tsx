import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

//icons
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// helpers
import {appstyle, colors, fonts} from '../../../theme';
import {CustomButton, Title} from '../../../components';
import {Divider} from 'react-native-paper';

const ReportProblem = () => {
  const navigation = useNavigation();

  const [reason, setReasons] = useState([
    {
      title: 'My manager was not good....',
      checked: false,
    },
    {
      title: 'iNADEQUATE JOB DESCRIPTIONS',
      checked: false,
    },
    {
      title: 'lACK OF TWO-WAY COMMUNICATION',
      checked: false,
    },
    {
      title: 'LACK OF EQUIPMENT AND FACILITIES',
      checked: false,
    },
  ]);

  const handleReasonSelection = selectedIndex => {
    const updatedReasons = reason.map((item, index) => {
      if (index === selectedIndex) {
        return {
          ...item,
          checked: true,
        };
      }
      return {
        ...item,
        checked: false,
      };
    });

    setReasons(updatedReasons);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title title="Report a problem" />
      <ScrollView>
        <View
          style={{
            margin: 15,
            ...appstyle.shadow,
            padding: 10,
            borderRadius: 15,
            justifyContent: 'center',
          }}>
          <Text style={{fontFamily: fonts.medium, fontSize: 18}}>
            What brings you here?
          </Text>
          <Text
            style={{
              fontFamily: fonts.regular,
              fontSize: 14,
              color: '#52525B',
              marginTop: 10,
            }}>
            Pick the one that most applies to you.
          </Text>
        </View>

        <View style={{margin: 10}}>
          {reason.map(({title, checked}, index) => (
            <Pressable
              onPress={() => handleReasonSelection(index)}
              style={{
                ...appstyle.shadow,
                margin: 5,
                padding: 10,
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: checked ? colors.primary : 'white',
              }}
              key={index.toString()}>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  textTransform: 'capitalize',
                }}>
                {title}
              </Text>

              <MaterialIcons
                name={checked ? 'check-circle' : 'radio-button-unchecked'}
                color={checked ? colors.primary : '#D9D9D9'}
                size={25}
              />
            </Pressable>
          ))}
        </View>

        <View style={{alignItems: 'center', margin: 10}}>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#000C14',
              width: '95%',
            }}
          />
          <Text
            style={{
              textAlign: 'center',
              backgroundColor: '#F8FAFF',
              position: 'absolute',
              top: -10,
              width: 100,
              color: '#1E202B',
            }}>
            Or type here
          </Text>
        </View>
        <View
          style={{
            margin: 15,
            ...appstyle.shadow,
            padding: 10,
            borderRadius: 15,
          }}>
          <Text style={{fontFamily: fonts.medium, fontSize: 18}}>Problem</Text>
          <View
            style={{
              minHeight: 170,
              borderWidth: 0.2,
              borderRadius: 8,
              borderColor: colors.light,
              backgroundColor: colors.white,
              marginTop: 10,
            }}>
            <TextInput
              placeholder="Type problem here..."
              multiline={true}
              placeholderTextColor="#333333"
              style={{padding: 15}}
            />
          </View>
        </View>
        <CustomButton style={{marginTop: 10}} title="Report problem" disabled />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFF',
  },
});

export default ReportProblem;
