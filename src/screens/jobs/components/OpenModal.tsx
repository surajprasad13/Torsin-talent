import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
} from 'react-native';
import {RadioButton} from 'react-native-paper';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';

import {BottomSheet} from 'react-native-btr';
import {colors, fonts} from '../../../theme';
import {CustomButton} from '../../../components';

const OpenModal = () => {
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = React.useState('first');

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  return (
    <SafeAreaView>
      <View>
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
            <ScrollView>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 15,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    color: '#140005',
                    fontSize: 16,
                  }}>
                  Time Posted
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    color: colors.red,
                    fontSize: 16,
                  }}>
                  Clear
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 0.2,
                  borderBottomColor: colors.light,
                  marginTop: 10,
                }}></View>
              <RadioButton.Group>
                <View style={styles.toggleText}>
                  <Text style={styles.radioText}>Anytime</Text>
                  <RadioButton
                    value="first"
                    color="#0E184D"
                    status={checked === 'first' ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked('first');
                    }}
                  />
                </View>
                <View style={styles.toggleText}>
                  <Text style={styles.radioText}>Past 24 hours</Text>
                  <RadioButton
                    value="second"
                    color="#0E184D"
                    status={checked === 'second' ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked('second');
                    }}
                  />
                </View>
                <View style={styles.toggleText}>
                  <Text style={styles.radioText}>Past 3 days</Text>
                  <RadioButton
                    value="third"
                    color="#0E184D"
                    status={checked === 'third' ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked('third');
                    }}
                  />
                </View>
                <View style={styles.toggleText}>
                  <Text style={styles.radioText}>Past week</Text>
                  <RadioButton
                    value="four"
                    color="#0E184D"
                    status={checked === 'four' ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked('four');
                    }}
                  />
                </View>
                <View style={styles.toggleText}>
                  <Text style={styles.radioText}>Past month</Text>
                  <RadioButton
                    value="five"
                    color="#0E184D"
                    status={checked === 'five' ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked('five');
                    }}
                  />
                </View>
              </RadioButton.Group>
              <View style={{bottom: 20}}>
                <CustomButton disabled={true} title="Show result" />
              </View>
            </ScrollView>
          </View>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};

export default OpenModal;

const styles = StyleSheet.create({
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 0.5,
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
  radioText: {
    fontFamily: fonts.regular,
    color: '#000C14',
    fontSize: 16,
  },
  toggleText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
});
