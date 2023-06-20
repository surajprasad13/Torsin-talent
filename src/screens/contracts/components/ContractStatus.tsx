import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Divider, Menu} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

//icons
import Entypo from 'react-native-vector-icons/Entypo';

// helpers
import {appstyle, colors, fonts} from '../../../theme';

const ContractStatus = ({item}) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const renderStatus = (id: number) => {
    switch (id) {
      case 0:
        return (
          <Text style={{fontFamily: fonts.regular, color: '#6180F4'}}>
            Waiting to be accepted
          </Text>
        );
      case 1:
        return (
          <Text style={{fontFamily: fonts.regular, color: 'green'}}>
            Accepted
          </Text>
        );
      case 2:
        return (
          <Text style={{fontFamily: fonts.regular, color: 'red'}}>
            Rejected
          </Text>
        );
      case 3:
        return (
          <Text style={{fontFamily: fonts.regular, color: 'red'}}>Archive</Text>
        );
      default:
        return;
    }
  };

  return (
    <Pressable
      key={item.toString()}
      style={[styles.cardContainer, {}]}
      onPress={() =>
        navigation.navigate('ViewContract', {id: item.contract_id})
      }>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 5,
        }}>
        <Text style={{fontFamily: fonts.semibold}}>{item.project_name}</Text>
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
        <Text style={{fontFamily: fonts.regular}}>Email - {item.email_id}</Text>
        <Text style={{textAlign: 'center', color: '#E0E2E3'}}>|</Text>
        <Text style={{fontFamily: fonts.regular, color: '#4B4D56'}}>
          Amount - <Text style={{color: colors.black}}>{item.amount}</Text>
        </Text>
      </View>
      <Divider style={{margin: 5}} />
      {renderStatus(item.status)}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    ...appstyle.shadow,
    padding: 15,
    borderRadius: 15,
    backgroundColor: 'white',
    margin: 10,
  },
  text: {
    fontFamily: fonts.regular,
    color: '#1E202B',
    fontSize: 12,
    marginTop: 5,
    justifyContent: 'center',
  },
  headertext: {
    fontFamily: fonts.regular,
    color: colors.primary,
    fontSize: 16,
    justifyContent: 'center',
  },
  icon: {
    right: 2,
  },
  cardText: {
    ...appstyle.shadow,
    padding: 20,
    margin: 10,
    borderRadius: 12,
  },
});

export default ContractStatus;
