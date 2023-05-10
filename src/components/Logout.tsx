import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Dialog, Portal} from 'react-native-paper';

// icons
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

// helpers
import {colors, fonts} from '../theme';
import {useAppDispatch} from '../hooks';
import {logout} from '../redux/reducers/authSlice';
import {StackActions, useNavigation} from '@react-navigation/native';

const Logout = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState<boolean>(false);

  const toggleModal = () => setVisible(!visible);

  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={toggleModal}>
        <SimpleLineIcons name="logout" size={20} />
        <Text
          style={{
            fontFamily: fonts.semibold,
            fontSize: 18,
            marginLeft: 10,
          }}>
          Log Out
        </Text>
      </TouchableOpacity>

      <Portal>
        <Dialog visible={visible} onDismiss={toggleModal}>
          <Dialog.Content
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <SimpleLineIcons name="logout" size={35} />

            <Text
              style={{
                fontFamily: fonts.semibold,
                fontSize: 18,
                lineHeight: 24,
                textAlign: 'center',
                color: '#121212',
                marginTop: 10,
              }}>
              Confirm Logout
            </Text>

            <Text
              style={{
                fontFamily: fonts.regular,
                textAlign: 'center',
                color: '#121212',
                marginTop: 10,
              }}>
              Are you sure you want to logout?
            </Text>
          </Dialog.Content>
          <Dialog.Actions style={{alignSelf: 'center'}}>
            <Button
              style={{backgroundColor: 'red'}}
              labelStyle={{color: colors.white}}
              onPress={toggleModal}>
              Cancel
            </Button>
            <Button
              onPress={() => {
                dispatch(logout());
                toggleModal();
                navigation.dispatch(StackActions.replace('OnboardingScreen'));
              }}>
              Logout
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F0',
    width: '100%',
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
});

export default Logout;
