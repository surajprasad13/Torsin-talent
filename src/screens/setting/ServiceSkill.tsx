import React, {FC, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// icons
import Feather from 'react-native-vector-icons/Feather';

import {appstyle, colors, fonts} from '../../theme';
import ServiceCard from './components/ServiceCard';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchService, fetchSkill} from '../../redux/actions/userAction';
import {Service} from '../../types/user';
import {Title} from '../../components';

const ServiceSkill: FC = ({}) => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();
  const {userToken} = useAppSelector(state => state.auth);
  const {skills, services, loading} = useAppSelector(state => state.user);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      dispatch(fetchSkill({userToken}));
      dispatch(fetchService({userToken}));
    });
    return () => listener;
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F9FBFF'}}>
      <Title title="Skills & Services" />

      <ScrollView style={{padding: 10}}>
        {loading && <ActivityIndicator />}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontFamily: fonts.semibold, color: colors.black}}>
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
            minHeight: skills.length > 0 ? 0 : 100,
          }}>
          {skills.length > 0 ? (
            skills.map((item, index) => (
              <View
                key={index.toString()}
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
                    opacity: 0.4,
                  }}>
                  {item}
                </Text>
              </View>
            ))
          ) : (
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <Text style={{fontFamily: fonts.medium, color: colors.black}}>
                No Skills
              </Text>
            </View>
          )}
        </View>

        {/*  */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 30,
          }}>
          <Text
            style={{
              fontFamily: fonts.semibold,
              color: colors.black,
            }}>
            Services
          </Text>
          <TouchableOpacity
            onPress={() => {
              //@ts-expect-error
              navigation.navigate('AddService');
            }}>
            <Text style={{color: colors.primary}}>
              <Feather name="plus-circle" size={15} color={colors.primary} />{' '}
              Add new services
            </Text>
          </TouchableOpacity>
        </View>

        {/*  */}

        <View style={{marginTop: 20}}>
          {services.length === 0 ? (
            <View
              style={{
                ...appstyle.shadow,
                borderRadius: 10,
                margin: 10,
                padding: 10,
                minHeight: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontFamily: fonts.medium, color: colors.black}}>
                No Services
              </Text>
            </View>
          ) : (
            services.map((item: Service, index) => (
              <ServiceCard item={item} key={index.toString()} />
            ))
          )}
        </View>

        {/*  */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ServiceSkill;
