import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import {} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

//icons
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// helpers
import {appstyle, colors, fonts} from '../../../theme';
import {CustomButton} from '../../../components';

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}>
          <Pressable
            style={{position: 'absolute', left: 10}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Feather name="arrow-left" size={20} />
          </Pressable>
          <Text style={{fontFamily: fonts.medium, fontSize: 16}}>
            Report a problem
          </Text>
        </View>

        <View
          style={{
            margin: 15,
            ...appstyle.shadow,
            padding: 10,
            borderRadius: 15,
            justifyContent: 'center',
          }}>
          <Text style={{fontFamily: fonts.medium, fontSize: 18}}>
            What brings you to here?
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
          {reason.map(({title, checked}, index) => {
            return (
              <Pressable
                onPress={() => {
                  reason[index].checked = !reason[index].checked;
                  setReasons([...reason]);
                }}
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
            );
          })}
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
