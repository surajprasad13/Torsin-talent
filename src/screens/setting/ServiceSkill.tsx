import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// icons
import Feather from 'react-native-vector-icons/Feather';

import {appstyle, colors, fonts} from '../../theme';
import ServiceCard from './components/ServiceCard';

const ServiceSkill = ({}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F9FBFF'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: colors.white,
          padding: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}
          style={{padding: 10}}>
          <Feather name="arrow-left" size={20} />
        </TouchableOpacity>

        <Text
          style={{
            fontFamily: fonts.medium,
            color: '#000C14',
          }}>
          Skills & Services
        </Text>
        <View />
      </View>

      <ScrollView style={{padding: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: fonts.semibold,
              color: colors.black,
            }}>
            Skills
          </Text>
          <TouchableOpacity
            onPress={() => {
              //@ts-expect-error
              navigation.navigate('AddSkill');
            }}>
            <Text style={{color: colors.primary}}>
              <Feather name="plus-circle" size={15} color={colors.primary} />{' '}
              Add new skills{' '}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            ...appstyle.shadow,
            borderRadius: 10,
            margin: 10,
            padding: 10,
            flexWrap: 'wrap',
            flexDirection: 'row',
          }}>
          {/*  */}

          {[0, 1, 2, 3, 4, 5, 6,7,8,9,10].map(item => {
            return (
              <View
                key={item.toString()}
                style={{
                  borderWidth: 1,
                  borderColor: '#08161433',
                  margin: 5,
                  padding: 10,
                  borderRadius: 30,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    color: colors.black,
                    opacity: 0.3,
                  }}>
                  Singing
                </Text>
              </View>
            );
          })}
        </View>

        {/*  */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Text
            style={{
              fontFamily: fonts.semibold,
              color: colors.black,
            }}>
            Services
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('AddService')}>
            <Text style={{color: colors.primary}}>
              <Feather name="plus-circle" size={15} color={colors.primary} />{' '}
              Add new services
            </Text>
          </TouchableOpacity>
        </View>

        {/*  */}

        <View style={{marginTop: 20}}>
          {[0, 1, 2, 3, 4, 5,6,7,8,9,10].map((item, index) => (
            <ServiceCard key={index.toString()} />
          ))}
        </View>

        {/*  */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ServiceSkill;
