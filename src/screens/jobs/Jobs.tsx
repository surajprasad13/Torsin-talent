import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Searchbar} from 'react-native-paper';

//icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

// components
import ImageSlider from '../../components/ImageSlider';
import CircleProgress from '../../components/CircleProgress';
import {colors, fonts} from '../../theme';
import ExpertiseCard from '../../screens/home/components/ExpertiseCard';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {notJobCorrespondSkill} from '../../redux/actions/userAction';

const {} = Dimensions.get('window');

const Jobs = ({}) => {
  const {userInfo, userToken} = useAppSelector(state => state.auth);
  const {notCorrespond} = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();

  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query: any) => setSearchQuery(query);

  useEffect(() => {
    dispatch(notJobCorrespondSkill(userToken));
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{padding: 10}}>
        <TouchableOpacity onPress={() => navigation.navigate('SearchJob')}>
          <View
            style={{
              justifyContent: 'space-evenly',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Searchbar
              placeholder="Search Jobs"
              onChangeText={onChangeSearch}
              value={searchQuery}
              placeholderTextColor="#BDBDBD"
              iconColor="#333333"
              style={{
                backgroundColor: colors.white,
                borderWidth: 1,
                flex: 1,
                borderRadius: 30,
                borderColor: '#BDBDBD',
              }}
              inputStyle={styles.searchInput}
            />
          </View>
        </TouchableOpacity>

        <View style={{top: 8}}>
          <ImageSlider />
        </View>

        <View
          style={{
            padding: 10,
            marginTop: 10,
          }}>
          <Text
            style={{
              fontFamily: fonts.regular,
              fontSize: 16,
              color: '#1E202B',
            }}>
            Jobs based on your expertise
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          {notCorrespond.map((item, index) => (
            <ExpertiseCard item={item} key={index.toString()} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Jobs;

const styles = StyleSheet.create({
  searchInput: {
    color: '#454545',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
