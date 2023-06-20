import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Divider, Menu} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

import {appstyle, colors, fonts} from '../../../theme';

const ContractCard = ({}) => {
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('ViewContract')}>
      <View style={styles.cardText}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 5,
          }}>
          <Text style={{fontFamily: fonts.semibold}}>Job Name</Text>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            contentStyle={{
              backgroundColor: 'white',
            }}
            anchor={
              <Pressable onPress={openMenu}>
                <Entypo name="dots-three-vertical" size={20} style={{}} />
              </Pressable>
            }>
            <Pressable>
              <Menu.Item
                onPress={() => {
                  setVisible(false);
                  navigation.navigate('EditContracts');
                }}
                title="Edit"
                style={{
                  backgroundColor: 'white',
                  height: 30,
                }}
                titleStyle={{
                  color: colors.primary,
                  fontFamily: fonts.regular,
                  fontSize: 12,
                }}
                contentStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </Pressable>
            <Divider />
            <Menu.Item
              title="Withdraw"
              style={{
                backgroundColor: 'white',
                height: 30,
              }}
              titleStyle={{
                fontFamily: fonts.regular,
                color: colors.primary,
                fontSize: 12,
              }}
              contentStyle={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </Menu>
        </View>
        <Divider style={{margin: 5}} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 5,
          }}>
          <Text style={{fontFamily: fonts.regular}}>
            Email - Talent@torsin.com
          </Text>
          <Text style={{textAlign: 'center', color: '#E0E2E3'}}>|</Text>
          <Text style={{fontFamily: fonts.regular, color: '#4B4D56'}}>
            Amount - <Text style={{color: colors.black}}>$500.00</Text>
          </Text>
        </View>
        <Divider style={{margin: 5}} />
        <Text style={{fontFamily: fonts.regular, color: '#6180F4', padding: 5}}>
          Waiting to be accepted
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbff',
  },
  cardText: {
    ...appstyle.shadow,
    padding: 20,
    margin: 10,
    borderRadius: 12,
  },
});

export default ContractCard;
