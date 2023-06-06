import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

//icons
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

// helpers
import {appstyle, colors, fonts} from '../../../theme';
import {CustomButton} from '../../../components';

const RatingReview = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}>
          <Pressable
            style={{position: 'absolute', left: 10}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Feather name="arrow-left" size={20} />
          </Pressable>
          <Text style={{fontFamily: fonts.medium, fontSize: 16}}>
            Rating & Review
          </Text>
        </View>
        <View
          style={{
            ...appstyle.shadow,
            padding: 10,
            margin: 15,
            borderRadius: 15,
          }}>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: fonts.semibold,
                color: colors.black,
                fontSize: 20,
                lineHeight: 28,
              }}>
              Would you like to rate this Job & your Employer?
            </Text>
            <Text
              style={{
                fontFamily: fonts.regular,
                color: colors.black,
                opacity: 0.8,
                marginTop: 10,
                width: '92%',
                lineHeight: 22,
              }}>
              How would you rate the overall experience of your ride? Your
              Feedback matters!! Add to favourites.
            </Text>
            <FastImage
              source={require('../../../assets/images/Frame.png')}
              resizeMode="cover"
              style={{width: 80, height: 80, borderRadius: 40, marginTop: 10}}
            />
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 10,
              }}>
              {[0, 1, 2, 3, 4].map(item => (
                <AntDesign
                  key={item.toString()}
                  name="star"
                  color="#4F4F4F"
                  size={20}
                  style={{margin: 5}}
                />
              ))}
            </View>
          </View>
          <View style={{margin: 10}}>
            <Text style={{fontFamily: fonts.medium, fontSize: 18}}>
              Add Review
            </Text>
            <View
              style={{
                minHeight: 170,
                borderWidth: 0.2,
                borderRadius: 8,
                borderColor: colors.light,
                backgroundColor: colors.white,
                marginTop: 10,
              }}>
              <TextInput
                placeholder="Type description here..."
                multiline={true}
                placeholderTextColor="#333333"
                style={{padding: 15}}
              />
            </View>
          </View>
          <CustomButton
            style={{marginTop: 10}}
            title="Submit feedback"
            disabled
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFF',
  },
});

export default RatingReview;
