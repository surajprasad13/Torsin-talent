/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';

//icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//helpers
import {colors, fonts} from '../../theme';
import CustomButton from '../../components/CustomButton';
import Title from '../../components/Title';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {createPortfolio, filterUser} from '../../redux/actions/userAction';
import {UserTag} from '../../types/user';
import {SettingScreenParamList} from '../../routes/RouteType';
import {resetSuccess} from '../../redux/reducers/userSlice';

const {height} = Dimensions.get('window');

type NavigationProp = StackNavigationProp<SettingScreenParamList>;

const OpenImage: FC = ({}) => {
  const {params} = useRoute<RouteProp<SettingScreenParamList, 'OpenImage'>>();

  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();

  const {user, loading, success} = useAppSelector(state => state.user);

  const [isFormComplete, setIsFormComplete] = useState(false);

  const [inputValue, setInputValue] = useState<string>('');
  const [selectedItems, setSelectedItem] = useState<UserTag[]>([]);
  const [filterdItem, setFilterdItem] = useState<UserTag[]>([]);
  const [active, setActive] = useState<boolean>(false);

  const handleSearch = (text: string) => {
    setInputValue(text);
    if (text.startsWith('@') && text.length > 0) {
      setActive(true);
      const query = text.slice(1);
      const data = user.filter(item => item.fullName.includes(query));
      setFilterdItem(data);
    } else {
      setActive(false);
    }
  };

  const handleRemoveItem = (item: any) => {
    const updatedItems = selectedItems.filter(i => i !== item);
    setSelectedItem(updatedItems);
  };

  useEffect(() => {
    dispatch(filterUser(''));
  }, []);

  useEffect(() => {
    if (selectedItems.length > 0 && inputValue.length > 0) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [selectedItems, inputValue]);

  //@ts-ignore
  useEffect(() => {
    const listener = navigation.addListener('focus', () => {});
    return () => listener;
  }, []);

  const handleAddPhotos = () => {
    if (params?.type == 'video') {
      dispatch(
        createPortfolio({
          videos: params?.item,
          id: selectedItems.map(item => item.id),
        }),
      );
    } else {
      dispatch(
        createPortfolio({
          photos: params?.item,
          id: selectedItems.map(item => item.id),
        }),
      );
    }
  };

  useEffect(() => {
    if (success) {
      navigation.navigate('AddPortfolio');
      dispatch(resetSuccess());
    }
  }, [success, loading]);

  return (
    <SafeAreaView style={styles.container}>
      <Title title="Add Image" />

      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        style={{margin: 10}}>
        {/* Image */}

        {params?.type == 'image' && (
          <FastImage
            source={{uri: params?.item}}
            resizeMode="cover"
            style={{width: 'auto', height: 200, borderRadius: 10}}
          />
        )}

        {/* Video */}

        {params?.type == 'video' && (
          <Video
            source={{uri: params?.item}}
            style={{
              width: 'auto',
              height: 200,
              borderRadius: 10,
            }}
          />
        )}

        <View style={styles.inputContainer1}>
          <View style={[styles.chipContainer, {marginTop: 10}]}>
            {selectedItems.map((item, index) => (
              <TouchableOpacity
                key={index.toString()}
                style={styles.chip}
                onPress={() => {
                  handleRemoveItem(item);
                }}>
                <FastImage
                  source={{uri: item.profileImage}}
                  defaultSource={require('../../assets/images/profile.png')}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                  }}
                />
                <Text style={{fontFamily: fonts.regular, fontSize: 10}}>
                  {item.fullName}
                </Text>
                <View style={styles.cancelContainer}>
                  <Icon name="close" size={8} style={{}} color={colors.white} />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={handleSearch}
            placeholder="Tag People"
          />
        </View>

        <ScrollView
          style={[styles.sectionContainer]}
          contentContainerStyle={{maxHeight: height * 0.3}}>
          {active
            ? filterdItem.map((item, index) => (
                <Pressable
                  onPress={() => {
                    const mention = `@${item.fullName}`;
                    setInputValue(inputValue.replace(/@\S*$/, mention));
                    setSelectedItem([item, ...selectedItems]);
                    setInputValue('');
                    setActive(false);
                  }}
                  key={index}
                  style={styles.section}>
                  <Text
                    style={{fontFamily: fonts.regular, color: colors.primary}}>
                    {item.fullName}
                  </Text>
                </Pressable>
              ))
            : null}
        </ScrollView>

        <Text style={[styles.description, {marginTop: 20}]}>Description</Text>

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

        <CustomButton
          title="Add Photos"
          onPress={handleAddPhotos}
          style={{marginTop: 50, marginBottom: 10}}
          disabled={!isFormComplete}
        />

        {/*  */}
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
  input: {
    padding: 15,
  },
  inputContainer1: {
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.grey4,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

export default OpenImage;
