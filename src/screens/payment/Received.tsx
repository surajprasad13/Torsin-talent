import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {appstyle, fonts} from '../../theme';
import {useNavigation} from '@react-navigation/native';

const Received = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        {[0, 1, 2, 3, 4, 5, 6].map(item => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ReceivePayment')}
            style={styles.container}>
            <FastImage
              source={{uri: 'https://source.unsplash.com/400x400?stone'}}
              resizeMode="cover"
              style={styles.image}
            />
            <View style={{width: '80%'}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontFamily: fonts.semibold, color: '#1E202B'}}>
                  Film Maker
                </Text>
                <Text style={styles.time}>View Job</Text>
              </View>
              <Text style={styles.title}>Payment received $500</Text>
              <Text
                style={{
                  right: 5,
                  position: 'absolute',
                  bottom: -10,
                  color: '#1E202B',
                  fontSize: 8,
                }}>
                23/11/23 01:05 PM
              </Text>
            </View>
          </TouchableOpacity>
        ))}
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
    color: 'green',
    fontSize: 12,
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
    color: 'blue',
    textAlign: 'right',
  },
});

export default Received;
