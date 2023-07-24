import {useNavigation} from '@react-navigation/native';
import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';

// icons
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {colors, fonts} from '../../theme';
import {CustomButton, CustomInput} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {addSkill} from '../../redux/actions/userAction';
import {Button, Dialog, Portal} from 'react-native-paper';
import {updateSuccess} from '../../redux/reducers/userSlice';

interface Skills {
  id: number;
  skillName: string;
}

interface SkillSelectionProp {
  onSelect: (item: Skills[]) => void;
}

const AddSkill: FC<SkillSelectionProp> = ({onSelect}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const {userToken} = useAppSelector(state => state.auth);
  const {loading, error, success} = useAppSelector(state => state.user);

  const [skill, setSkill] = useState<string>('');
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState<Skills[]>([]);

  const handleRemoveItem = (item: Skills) => {
    const updatedItems = selectedItems.filter(i => i !== item);
    setSelectedItems(updatedItems);
    setSkill(''); // Reset the skill state
  };

  const handleSelectItem = (item: Skills) => {
    setSelectedItems([...selectedItems, item]);
    setSkill(''); // Reset the skill state
  };

  const handleSearch = (text: string) => {
    setInputValue(text);

    dispatch(addSkill(text));
  };

  // useEffect(() => {
  //   const listener = navigation.addListener('beforeRemove', () => {
  //     dispatch(updateSuccess());
  //   });
  //   return () => listener;
  // }, []);

  const valid =
    inputValue !== '' && skill.length > 0 && typeof skill !== 'string';

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

          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <View style={styles.chipContainer}>
                {selectedItems.map((item, index) => (
                  <TouchableOpacity
                    key={index.toString()}
                    style={styles.chip}
                    onPress={() => handleRemoveItem(item)}>
                    <Text>{item.skillName}</Text>
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
                placeholder="Search items..."
                value={skill}
                onChangeText={handleSearch}
                style={styles.input}
              />
            </View>

            <View
              style={[styles.sectionContainer, {borderWidth: valid ? 1 : 0}]}>
              {inputValue !== '' &&
                skill.length > 0 &&
                typeof skill !== 'string' &&
                skill.map((item, index) => (
                  <TouchableOpacity
                    key={index.toString()}
                    style={styles.section}
                    onPress={() => handleSelectItem(item)}>
                    <Text style={{fontFamily: fonts.regular}}>
                      {item.skillName}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
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
        </View>

        <CustomButton
          title="Add skill"
          loading={loading}
          disabled={skill.length > 0}
          onPress={() => {
            if (skill.length > 0) {
              let value = {
                inputs: {
                  skillName: skill,
                  // skillArray: skill,
                },
                userToken,
              };
              dispatch(addSkill(value));
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
  cancelContainer: {
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 7.5,
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
  sectionContainer: {
    backgroundColor: colors.white,
    borderColor: colors.grey4,
    borderBottomWidth: 0,
    borderRadius: 10,
  },
  section: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: colors.grey4,
    borderRadius: 10,
  },
  input: {
    padding: 15,
  },
});

export default AddSkill;
