import React, {FC, useState} from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import {fonts} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {updateUserInfo} from '../../redux/reducers/authSlice';
import {Title} from '../../components';

const Location: FC = () => {
  const {userInfo} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const navigation = useNavigation();

  const [value, setValue] = useState<string>('');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F9fbff'}}>
      <Title title="Location" />
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        minLength={3}
        onPress={data => {
          const location = data.description;
          dispatch(updateUserInfo({...userInfo, location: location}));
          navigation.goBack();
        }}
        query={{
          key: 'AIzaSyD5ZBkfaJ4fOC-c8RZXEN9dxmwxZrAgooI',
          // key: 'AIzaSyD9HAzCj-r9Zw8dZnQWkNgrkewOc4aRjGc',
          language: 'en',
        }}
        styles={{
          container: styles.autocompleteContainer,
          textInput: styles.textInput,
          listView: styles.listView,
          poweredContainer: styles.powered,
        }}
        textInputProps={{
          onChangeText: text => {
            setValue(text);
          },
          value,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  autocompleteContainer: {},
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
    margin: 10,
  },
  listView: {
    padding: 5,
  },
  powered: {},
});

export default Location;
