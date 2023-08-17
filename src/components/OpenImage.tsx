import React, {useEffect} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//helpers
import CustomInput from './CustomInput';
import {colors, fonts} from '../theme';
import CustomButton from './CustomButton';
import Title from './Title';

const OpenImage = ({route}) => {
  const {selectedImage} = route.params;
  const navigation = useNavigation();

  const handleAddPhotos = () => {
    navigation.navigate('AddPortfolio', {selectedImage}); // Navigating back to AddPortfolio with selected image
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title title="Add Image" />

      <ScrollView showsVerticalScrollIndicator={false} style={{margin: 10}}>
        <Image
          source={{uri: selectedImage}}
          style={{width: 'auto', height: 200, borderRadius: 10}}
        />
        <CustomInput label="Tag People" containerStyle={{marginTop: 20}} />
        <View style={{marginTop: 20}}>
          <Text
            style={{
              fontFamily: fonts.regular,
              color: '#4F4F4F',
              fontSize: 16,
            }}>
            Description
          </Text>
          <View
            style={{
              width: '100%',
              height: 150,
              borderWidth: 0.5,
              borderRadius: 8,
              borderColor: colors.light,
              marginTop: 10,
              backgroundColor: colors.white,
            }}>
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
});

export default OpenImage;
