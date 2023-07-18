import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

//helpers
import {colors, fonts, appstyle} from '../../theme';
import {CustomButton, Title} from '../../components';

const HelpSupport = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{backgroundColor: '#f9fbff', flex: 1}}>
      <Title title="Help & Support" />
      <ScrollView>
        <View>
          <CustomButton
            disabled
            title="Raise a query"
            onPress={() => navigation.navigate('RaiseQuery')}
            style={{marginTop: 10}}
          />
        </View>
        <View style={{margin: 10}}>
          <Text style={{fontSize: 15, fontFamily: fonts.medium}}>
            All Queries
          </Text>
          {[0, 1, 2, 3, 4, 5, 6].map(item => (
            <TouchableOpacity
              onPress={() => navigation.navigate('PaymentDetail')}
              style={styles.container}>
              <FastImage
                source={{uri: 'https://source.unsplash.com/400x400?stone'}}
                resizeMode="cover"
                style={styles.image}
              />
              <View style={{width: '80%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontFamily: fonts.semibold, color: '#1E202B'}}>
                    Film Maker
                  </Text>
                  <Text style={styles.time}>Just Now</Text>
                </View>
                <Text style={styles.title}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                  in laborum.
                </Text>
                <Text
                  style={{
                    right: 5,
                    position: 'absolute',
                    bottom: -10,
                    color: 'green',
                    fontSize: 8,
                  }}>
                  Open
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  innerView: {
    ...appstyle.shadow,
    margin: 10,
    borderRadius: 12,
  },
  container: {
    padding: 15,
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    ...appstyle.shadow,
    margin: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  title: {
    fontFamily: fonts.regular,
    color: '#1E202B',
    fontSize: 10,
    marginTop: 5,
  },
  description: {
    fontFamily: fonts.regular,
    color: '#1E202B',
    opacity: 0.6,
    marginTop: 5,
  },
  time: {
    fontFamily: fonts.regular,
    color: colors.grey,
    textAlign: 'right',
    fontSize: 10,
  },
});

export default HelpSupport;
