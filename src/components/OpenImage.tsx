import React from 'react';
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
} from 'react-native';
import CustomInput from './CustomInput';
import {colors, fonts} from '../theme';
import CustomButton from './CustomButton';
import {ScrollView} from 'react-native-gesture-handler';

const OpenImage = ({route}) => {
  const {selectedImage} = route.params;

  return (
    <SafeAreaView style={styles.container}>
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
          disabled
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
