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
} from 'react-native';

// icons
import Feather from 'react-native-vector-icons/Feather';

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

  useEffect(() => {
    dispatch(fetchSkill());
  }, []);

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

        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {selectedItems.map((item, index) => {
            return (
              <View
                key={index.toString()}
                style={{
                  padding: 5,
                  borderWidth: 1,
                  margin: 5,
                  borderColor: colors.primary,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <Text>{item}</Text>
                <Pressable
                  onPress={() => {
                    const filter = selectedItems.filter(
                      (_, _index) => _index !== index,
                    );
                    setSelectedItem(filter);
                  }}
                  style={{backgroundColor: colors.primary, padding: 2}}>
                  <Feather name="x" size={10} color={colors.white} />
                </Pressable>
              </View>
            );
          })}
        </View>

        <ScrollView>
          {inputValue.length > 0 &&
            filteredItems.map((item, index) => (
              <Pressable
                onPress={() => {
                  setSelectedItem([...selectedItems, item]);
                }}
                key={index}
                style={{
                  margin: 5,
                  backgroundColor: 'grey',
                  borderRadius: 10,
                  padding: 10,
                }}>
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
});

export default AddSkill;
