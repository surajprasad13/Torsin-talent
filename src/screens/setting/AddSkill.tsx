import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

// icons
import Feather from 'react-native-vector-icons/Feather';

import {colors, fonts} from '../../theme';
import {CustomButton, CustomInput} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {addSkill} from '../../redux/actions/userAction';
import {Button, Dialog, Portal} from 'react-native-paper';
import {updateSuccess} from '../../redux/reducers/userSlice';

const AddSkill = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const {userToken} = useAppSelector(state => state.auth);
  const {loading, error, success} = useAppSelector(state => state.user);

  const [inputValue, setInputValue] = useState('');

  const handleSearch = (text: string) => {
    setInputValue(text);
    dispatch(addSkill(text));
  };

  useEffect(() => {
    const listener = navigation.addListener('beforeRemove', () => {
      dispatch(updateSuccess());
    });
    return () => listener;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1}} contentContainerStyle={{flex: 1}}>
        <Portal>
          <Dialog visible={success} style={{backgroundColor: 'white'}}>
            <Dialog.Title>Skill Added</Dialog.Title>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  dispatch(updateSuccess());
                  if (navigation.canGoBack()) {
                    navigation.goBack();
                  }
                }}>
                Ok
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colors.white,
            padding: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }}
            style={{padding: 10}}>
            <Feather name="arrow-left" size={20} />
          </TouchableOpacity>

          <Text
            style={{
              fontFamily: fonts.medium,
              color: '#000C14',
            }}>
            Add Skills
          </Text>
          <View style={{flex: 0.14}} />
        </View>
        <View style={{flex: 1, padding: 10}}>
          <Text
            style={{
              fontFamily: fonts.semibold,
              color: colors.black,
              fontSize: 16,
            }}>
            Add skills
          </Text>
          <Text style={{fontFamily: fonts.regular, color: '#1E202B'}}>
            Job Description Complete your profile. Set your profile completely .
          </Text>

          <CustomInput
            label="Skill"
            placeholder="eg. Song Production"
            value={inputValue}
            onChangeText={handleSearch}
            containerStyle={{marginTop: 20}}
          />
          {!!error && (
            <Text
              style={{
                padding: 10,
                color: colors.red,
                fontFamily: fonts.medium,
              }}>
              {error}
            </Text>
          )}
        </View>

        <CustomButton
          title="Add skill"
          loading={loading}
          disabled={inputValue.length > 0}
          onPress={() => {
            if (inputValue.length > 0) {
              let value = {
                inputs: {
                  skillArray: inputValue,
                },
                userToken,
              };
              dispatch(addSkill(value));
              console.log(value);
            }
          }}
        />
        <View style={{marginTop: 20}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default AddSkill;
