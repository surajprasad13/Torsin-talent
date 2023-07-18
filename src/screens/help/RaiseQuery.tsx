import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import {} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

//icons
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// helpers
import {appstyle, colors, fonts} from '../../theme';
import {CustomButton, Title} from '../../components';

const ReportProblem = () => {
  const navigation = useNavigation();

  const [reason, setReasons] = useState([
    {
      title: 'My manager was not good....',
      checked: false,
    },
    {
      title: 'iNADEQUATE JOB DESCRIPTIONS',
      checked: false,
    },
    {
      title: 'lACK OF TWO-WAY COMMUNICATION',
      checked: false,
    },
    {
      title: 'LACK OF EQUIPMENT AND FACILITIES',
      checked: false,
    },
  ]);

  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleReasonSelection = index => {
    const updatedReasons = reason.map((item, i) => ({
      ...item,
      checked: i === index,
    }));
    setReasons(updatedReasons);
  };

  const handleRaiseButton = () => {
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title title="Raise a Query" />
      <ScrollView>
        <View style={{margin: 10}}>
          {reason.map(({title, checked}, index) => {
            return (
              <Pressable
                onPress={() => handleReasonSelection(index)}
                style={{
                  ...appstyle.shadow,
                  margin: 5,
                  padding: 10,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderWidth: 1,
                  borderColor: checked ? colors.primary : 'white',
                }}
                key={index.toString()}>
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    textTransform: 'capitalize',
                  }}>
                  {title}
                </Text>

                <MaterialIcons
                  name={checked ? 'check-circle' : 'radio-button-unchecked'}
                  color={checked ? colors.primary : '#D9D9D9'}
                  size={25}
                />
              </Pressable>
            );
          })}
        </View>

        <View style={{alignItems: 'center', margin: 10}}>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#000C14',
              width: '95%',
            }}
          />
          <Text
            style={{
              textAlign: 'center',
              backgroundColor: '#F8FAFF',
              position: 'absolute',
              top: -10,
              width: 100,
              color: '#1E202B',
            }}>
            Or type here
          </Text>
        </View>
        <View
          style={{
            margin: 15,
            ...appstyle.shadow,
            padding: 10,
            borderRadius: 15,
          }}>
          <Text style={{fontFamily: fonts.medium, fontSize: 18}}>Problem</Text>
          <View
            style={{
              minHeight: 170,
              borderWidth: 0.5,
              borderRadius: 8,
              borderColor: colors.light,
              backgroundColor: colors.white,
              marginTop: 10,
            }}>
            <TextInput
              placeholder="Type problem here..."
              multiline={true}
              placeholderTextColor="#333333"
              style={{padding: 15}}
            />
          </View>
        </View>
        <CustomButton
          style={{marginTop: 10}}
          title="Raise"
          disabled
          onPress={handleRaiseButton}
        />

        {/* Popup */}
        <Modal
          visible={isPopupVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={handlePopupClose}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Feather name="" size={25} />
              <Text style={styles.popupText}>
                Query raise successfully. ID number send to your email
              </Text>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFF',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  popupText: {
    fontFamily: fonts.medium,
    marginBottom: 10,
  },
});

export default ReportProblem;
