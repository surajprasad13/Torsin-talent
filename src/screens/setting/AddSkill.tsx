/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';

// icons
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {colors, fonts} from '../../theme';
import {CustomButton, CustomInput, Title} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {addSkill, fetchAdminService} from '../../redux/actions/userAction';
import {Button, Dialog, Portal} from 'react-native-paper';
import {resetAdminService, updateSuccess} from '../../redux/reducers/userSlice';

const AddSkill: FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const {loading, error, success, adminService} = useAppSelector(
    state => state.user,
  );

  const [inputValue, setInputValue] = useState<string>('');
  const [selectedItems, setSelectedItem] = useState<string[]>([]);
  const [duplicateSkill, setDuplicateSkill] = useState<string | null>(null);

  const handleSearch = (text: string) => {
    if (selectedItems.length > 10) return;
    setInputValue(text);
    dispatch(fetchAdminService(text));

    if (selectedItems.includes(text)) {
      setDuplicateSkill('Skill already added');
    } else {
      setDuplicateSkill(null);
    }
  };

  const handleRemoveItem = (item: any) => {
    const updatedItems = selectedItems.filter(i => i !== item);
    setSelectedItem(updatedItems);
  };

  const valid =
    inputValue !== '' &&
    typeof adminService !== 'string' &&
    adminService.length > 0;

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

      <Title title="Add Skill" />

      <View style={{flex: 1, padding: 10}}>
        <View>
          <CustomInput
            editable={selectedItems.length <= 10}
            placeholder="Search Skill..."
            value={inputValue}
            label="Add Skills"
            onChangeText={handleSearch}
          />
          <Pressable
            style={{position: 'absolute', right: 10, top: 44}}
            disabled={!inputValue || !!duplicateSkill} // Disable the button when inputValue is empty or duplicate skill exists
            onPress={() => {
              if (selectedItems.length > 10) return;
              selectedItems.push(inputValue);
              setSelectedItem([...selectedItems]);
              setInputValue('');
            }}>
            <Feather
              name="plus-circle"
              size={18}
              color={inputValue ? colors.primary : colors.grey4}
            />
          </Pressable>
        </View>

        {!!duplicateSkill && (
          <Text
            style={{
              padding: 10,
              color: colors.red,
              fontFamily: fonts.medium,
            }}>
            {duplicateSkill}
          </Text>
        )}

        <View style={[styles.chipContainer, {marginTop: 10}]}>
          {selectedItems.map((item, index) => (
            <TouchableOpacity
              key={index.toString()}
              style={styles.chip}
              onPress={() => handleRemoveItem(item)}>
              <Text style={{fontFamily: fonts.regular, fontSize: 10}}>
                {item}
              </Text>
              <View style={styles.cancelContainer}>
                <Icon name="close" size={8} style={{}} color={colors.white} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
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

        <ScrollView
          style={[styles.sectionContainer, {borderWidth: valid ? 1 : 0}]}>
          {inputValue.length > 0 &&
            adminService.length > 0 &&
            typeof adminService !== 'string' &&
            adminService.map((item, index) => (
              <Pressable
                onPress={() => {
                  setInputValue('');
                  selectedItems.push(item.serviceName);
                  setSelectedItem([...selectedItems]);
                  dispatch(resetAdminService());
                }}
                key={index}
                style={styles.section}>
                <Text>{item.serviceName}</Text>
              </Pressable>
            ))}
        </ScrollView>
      </View>

      <CustomButton
        title="Add skill"
        loading={loading}
        disabled={selectedItems.length > 0}
        onPress={() => {
          if (selectedItems.length > 0) {
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
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 7,
    borderWidth: 0.5,
    borderColor: colors.primary,
    borderRadius: 100,
    margin: 3,
  },
  cancelContainer: {
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 7.5,
    marginLeft: 5,
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
