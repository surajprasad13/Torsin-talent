import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';

// icons
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {colors, fonts} from '../../theme';
import {CustomButton, CustomInput} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {addSkill, fetchSkill} from '../../redux/actions/userAction';
import {Button, Dialog, Portal} from 'react-native-paper';
import {updateSuccess} from '../../redux/reducers/userSlice';

const AddSkill = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const {loading, error, success, skills} = useAppSelector(state => state.user);

  const [inputValue, setInputValue] = useState('');
  const [filteredItems, setFilteredItems] = useState(skills);
  const [selectedItems, setSelectedItem] = useState<string[]>([]);

  const handleSearch = (text: string) => {
    const filter = skills.filter(item =>
      item.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredItems(filter);
    setInputValue(text);
  };

  const handleRemoveItem = (item: any) => {
    const updatedItems = selectedItems.filter(i => i !== item);
    setSelectedItem(updatedItems);
  };

  useEffect(() => {
    dispatch(fetchSkill());
  }, []);

  const valid =
    inputValue !== '' && skills.length > 0 && typeof skills !== 'string';

  useEffect(() => {
    const listener = navigation.addListener('beforeRemove', () => {
      dispatch(updateSuccess());
    });
    return () => listener;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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

        <View style={styles.inputContainer}>
          <View style={styles.chipContainer}>
            {selectedItems.map((item, index) => (
              <TouchableOpacity
                key={index.toString()}
                style={styles.chip}
                onPress={() => handleRemoveItem(item)}>
                <Text>{item}</Text>
                <View style={styles.cancelContainer}>
                  <Icon
                    name="close"
                    size={10}
                    style={{}}
                    color={colors.white}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            placeholder="Search Skill..."
            value={inputValue}
            onChangeText={handleSearch}
            style={{padding: 15}}
          />
        </View>

        <ScrollView
          style={[styles.sectionContainer, {borderWidth: valid ? 1 : 0}]}>
          {inputValue.length > 0 &&
            filteredItems.map((item, index) => (
              <Pressable
                onPress={() => {
                  setSelectedItem([...selectedItems, item]);
                }}
                key={index}
                style={styles.section}>
                <Text>{item}</Text>
              </Pressable>
            ))}
        </ScrollView>

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
        disabled={selectedItems.length > 0}
        onPress={() => {
          if (inputValue.length > 0) {
            let value = {skillArray: selectedItems};
            dispatch(addSkill(value));
          }
        }}
      />
      <View style={{marginTop: 20}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputContainer: {
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.grey4,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderWidth: 0.5,
    borderColor: colors.primary,
    borderRadius: 10,
    margin: 3,
  },
  cancelContainer: {
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 7.5,
  },
  section: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: colors.grey4,
    borderRadius: 10,
  },
  sectionContainer: {
    backgroundColor: colors.white,
    borderColor: colors.grey4,
    borderBottomWidth: 0,
    borderRadius: 10,
    margin: 5,
  },
});

export default AddSkill;
