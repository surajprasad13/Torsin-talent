import React, {FC, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

// helpers
import {RootStackParamList} from '../../routes/RouteType';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {withoutSignupSkill} from '../../redux/actions/userAction';
import {colors, appstyle, fonts} from '../../theme';
import {Title} from '../../components';
import {Divider} from 'react-native-paper';
import moment from 'moment';
import {AntDesign, Entypo} from '../../theme/icons';

const FliterJobs: FC = ({}) => {
  const navigation = useNavigation();

  const {params} = useRoute<RouteProp<RootStackParamList, 'FilterJobs'>>();

  const dispatch = useAppDispatch();
  const {loading, without} = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(withoutSignupSkill(params?.item));
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <Title title="Job List" />
      <FlatList
        data={without}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('FilterJobDetail', {item})}
              style={{
                ...appstyle.shadow,
                margin: 15,
                padding: 10,
                borderRadius: 12,
              }}>
              <Text
                style={{
                  fontFamily: fonts.medium,
                  color: colors.primary,
                }}>
                {item.jobName}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  color: colors.grey,
                  fontSize: 12,
                  marginTop: 5,
                }}>
                {item.jobDescription.length > 50
                  ? item.jobDescription.slice(0, 50) + '...'
                  : item.jobDescription}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.medium,
                  color: colors.black,
                  fontSize: 12,
                  marginTop: 5,
                }}>
                ${item.priceRate}
              </Text>
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
                  <AntDesign
                    name="clockcircleo"
                    size={10}
                    style={styles.icon}
                  />
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
                    {item.location.length > 10
                      ? item.location.substring(0, 10) + '...'
                      : item.location}
                    ,
                    {item.countryName.length > 10
                      ? item.countryName.substring(0, 10) + '...'
                      : item.countryName}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icon: {
    right: 2,
  },
});

export default FliterJobs;
