import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {appstyle, colors, fonts} from '../../../theme';
import FastImage from 'react-native-fast-image';
import {Service} from '../../../types/user';
import {useNavigation} from '@react-navigation/native';

type ServiceProp = {
  item: Service;
  index?: number;
};

const ServiceCard = ({item}: ServiceProp) => {
  const navigation = useNavigation();
  const {serviceImage} = item;

  return (
    <View style={[styles.cardContainer]}>
      {serviceImage && serviceImage.length > 0 && (
        <FastImage
          source={{uri: serviceImage[0]}}
          resizeMode="contain"
          style={{width: 50, height: 50, borderRadius: 25, borderWidth: 0.5}}
        />
      )}
      <View style={{width: '80%'}}>
        <Text style={{fontFamily: fonts.semibold, color: '#1E202B'}}>
          {item.serviceName}
        </Text>
        <Text style={{fontFamily: fonts.regular, color: '#1E202B'}}>
          {item.serviceDescription}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text style={styles.text}>$ {item.serviceCharge}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('ServiceDetail', {item})}>
            <Text
              style={{
                fontFamily: fonts.medium,
                color: colors.primary,
                fontSize: 12,
              }}>
              View more
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    ...appstyle.shadow,
    padding: 15,
    borderRadius: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderStartColor: 'white',
    marginBottom: 10,
  },
  text: {
    fontFamily: fonts.regular,
    color: '#1E202B',
    fontSize: 12,
  },
});

export default ServiceCard;
