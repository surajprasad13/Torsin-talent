import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

//helpers
import {colors, fonts, appstyle} from '../../theme';
import {CustomButton, Title} from '../../components';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {TicketList} from '../../redux/actions/userAction';
import {Ticket} from '../../types/user';
import HelpCard from './component/HelpCard';

const HelpSupport = ({item}: {item: Ticket}) => {
  const navigation = useNavigation();

  const handleCardPress = status => {
    navigation.navigate('HelpDetails', {status});
  };

  const dispatch = useAppDispatch();

  const {ticket, loading} = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(TicketList(''));
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: '#f9fbff', flex: 1}}>
      <Title title="Help & Support" />

      <View>
        <CustomButton
          disabled
          title="Raise a query"
          onPress={() => navigation.navigate('RaiseQuery')}
          style={{marginTop: 10}}
        />
      </View>
      <View style={{margin: 10}}>
        <Text
          style={{
            fontSize: 15,
            fontFamily: fonts.medium,
          }}>
          All Queries
        </Text>
        <FlatList
          data={ticket}
          renderItem={({item, index}) => {
            return <HelpCard item={item} key={index.toString()} />;
          }}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{paddingBottom: 20}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    ...appstyle.shadow,
    margin: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  title: {
    fontFamily: fonts.regular,
    color: '#1E202B',
    fontSize: 10,
    marginTop: 5,
  },
  time: {
    fontFamily: fonts.regular,
    color: colors.grey,
    textAlign: 'right',
    fontSize: 10,
  },
  status: {
    right: 5,
    position: 'absolute',
    bottom: -10,
    fontSize: 8,
  },
});

export default HelpSupport;
