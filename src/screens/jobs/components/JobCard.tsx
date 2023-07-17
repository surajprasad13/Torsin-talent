import React, {FC} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Divider} from 'react-native-paper';
import moment from 'moment';

// icons
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

// helpers
import {colors, fonts, appstyle} from '../../../theme';
import {JobScreenParamList} from '../../../routes/RouteType';
import {StackNavigationProp} from '@react-navigation/stack';

type NavigationProp = StackNavigationProp<JobScreenParamList>;

interface JobCardProp {
  item: any;
}

const JobCard: FC<JobCardProp> = ({item}) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Pressable
      onPress={() => navigation.navigate('ActiveJobDetail', {item})}
      style={[styles.cardContainer, {}]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <FastImage
          source={{uri: item.image[0]}}
          resizeMode="cover"
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            borderWidth: 0.5,
          }}
        />
        <View style={{width: '80%'}}>
          <Text style={[styles.headertext, {marginTop: 10}]}>
            {item.jobName}
          </Text>
          <Text style={styles.text}>{item.jobDescription}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.text}>$ {item.amount}</Text>
          </View>
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
            {item.location}, {item.countryName}
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

export default JobCard;
