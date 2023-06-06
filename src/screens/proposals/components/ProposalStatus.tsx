import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Divider} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

//icons
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

// helpers
import {appstyle, colors, fonts} from '../../../theme';

const ProposalStatus = ({item}: any) => {
  const navigation = useNavigation();

  const renderStatus = (id: number) => {
    switch (id) {
      case 1:
        return;
      case 2:
        return (
          <Text style={{fontFamily: fonts.regular, color: 'green'}}>
            Accepted
          </Text>
        );
      case 3:
        return (
          <Text style={{fontFamily: fonts.regular, color: 'red'}}>
            Rejected
          </Text>
        );
      default:
        return;
    }
  };

  return (
    <Pressable
      onPress={() => navigation.navigate('ProposalDetail', {item})}
      key={item.toString()}
      style={[styles.cardContainer, {}]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <FastImage
          source={{
            uri:
              item.images !== null
                ? item.images[0]
                : 'https://source.unsplash.com/400x400?user',
          }}
          resizeMode="cover"
          style={{width: 50, height: 50, borderRadius: 25}}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
            marginLeft: 10,
          }}>
          <View style={{width: '70%'}}>
            <Text style={{fontFamily: fonts.semibold, color: colors.black}}>
              {item.jobName}
            </Text>
            <Text style={[styles.headertext, {marginTop: 10}]}>
              {item.jobDescription}
            </Text>
            <Text style={styles.text}>{item.message}</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.text}>Charges: ${item.charges}</Text>
            </View>
          </View>
          {renderStatus(item.proposalStatus)}
        </View>
      </View>

      <Divider style={{marginTop: 10}} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 15,
          margin: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AntDesign name="clockcircleo" size={10} style={styles.icon} />
          <Text style={{fontFamily: fonts.regular, fontSize: 12}}>
            {moment(item.createdAt).format('lll')}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Entypo name="location-pin" size={10} style={styles.icon} />
          <Text
            style={{fontFamily: fonts.regular, fontSize: 12}}
            numberOfLines={1}>
            {item.location.length > 20
              ? item.location.substring(0, 20).concat('...')
              : item.location}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    ...appstyle.shadow,
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'white',
    marginTop: 20,
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
});

export default ProposalStatus;
