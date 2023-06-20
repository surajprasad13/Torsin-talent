import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

//icons

// helpers
import {appstyle, colors, fonts} from '../../../theme';

const ArchiveContractCard = ({item}) => {
  const navigation = useNavigation();

  const renderStatus = (id: number) => {
    switch (id) {
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
      onPress={() => navigation.navigate('ViewContract')}>
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

export default ArchiveContractCard;
