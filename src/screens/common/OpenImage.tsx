import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//helpers
import CustomInput from '../../components/CustomInput';
import {colors, fonts} from '../../theme';
import CustomButton from '../../components/CustomButton';
import Title from '../../components/Title';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {filterUser} from '../../redux/actions/userAction';

const OpenImage: FC = ({route}) => {
  const {selectedImage} = route.params;
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const {loading, error, success, user} = useAppSelector(state => state.user);

  const handleAddPhotos = () => {
    navigation.navigate('AddPortfolio', {selectedImage});
  };

  const [inputValue, setInputValue] = useState<string>('');
  const [selectedItems, setSelectedItem] = useState<string[]>([]);

  const handleSearch = (text: string) => {
    if (selectedItems.length > 10) return;
    setInputValue(text);
    dispatch(filterUser(text));
  };

  const handleRemoveItem = (item: any) => {
    const updatedItems = selectedItems.filter(i => i !== item);
    setSelectedItem(updatedItems);
  };

  useEffect(() => {
    dispatch(filterUser(''));
  });

  return (
    <SafeAreaView style={styles.container}>
      <Title title="Add Image" />

      <ScrollView showsVerticalScrollIndicator={false} style={{margin: 10}}>
        <Image
          source={{uri: selectedImage}}
          style={{width: 'auto', height: 200, borderRadius: 10}}
        />
        <CustomInput
          label="Tag People"
          containerStyle={{marginTop: 20}}
          value={inputValue}
          onChangeText={handleSearch}
        />
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
        <View style={{marginTop: 20}}>
          <Text style={styles.description}>Description</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Type description here..."
              multiline={true}
              placeholderTextColor="#333333"
              maxLength={500}
              blurOnSubmit={true}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              style={{padding: 15}}
            />
          </View>
        </View>
        <CustomButton
          title="Add Photos"
          onPress={handleAddPhotos}
          style={{marginTop: 50, marginBottom: 10}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbff',
  },
  inputContainer: {
    width: '100%',
    height: 150,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: colors.light,
    marginTop: 10,
    backgroundColor: colors.white,
  },
  description: {
    fontFamily: fonts.regular,
    color: '#4F4F4F',
    fontSize: 16,
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
});

export default OpenImage;
