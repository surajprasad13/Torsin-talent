import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Pressable} from 'react-native';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';

import {BottomSheet} from 'react-native-btr';
import {fonts} from '../../../theme';

const OpenModal = () => {
  const [visible, setVisible] = useState(false);

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Pressable
          onPress={toggleBottomNavigationView}
          style={styles.innerSearch}>
          <Text style={styles.innerText}>
            Time Posted <AntDesign name="down" size={12} />
          </Text>
        </Pressable>
        <BottomSheet
          visible={visible}
          onBackButtonPress={toggleBottomNavigationView}
          onBackdropPress={toggleBottomNavigationView}>
          <View style={styles.bottomNavigationView}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10
              }}>
              <Text
                style={{}}>
                Share Using
              </Text>
              <Text
                style={{}}>
                Share Using
              </Text>
            </View>
          </View>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};

export default OpenModal;

const styles = StyleSheet.create({
  container: {},
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 250,
  },
  innerSearch: {
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 30,
    margin: 5,
    borderColor: '#1E202B',
  },
  innerText: {
    fontFamily: fonts.regular,
    color: '#1E202B',
  },
});
