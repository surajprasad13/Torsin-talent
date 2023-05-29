import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RadioButton, Searchbar} from 'react-native-paper';
import BottomSheet from '@gorhom/bottom-sheet';

//icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';

// components

import {colors, fonts} from '../../theme';
import ExpertiseCard from '../../screens/home/components/ExpertiseCard';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {notJobCorrespondSkill} from '../../redux/actions/userAction';
import {searchJob} from '../../redux/actions/userAction';

const {} = Dimensions.get('window');

const Jobs = ({}) => {
  const {userInfo, userToken} = useAppSelector(state => state.auth);
  const {notCorrespond, search, loading} = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();

  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bottomIndex, setBottomIndex] = useState(-1);
  const [checked, setChecked] = useState('first');

  const onChangeSearch = (query: any) => {
    const value = {
      search: query,
      userToken,
    };
    dispatch(searchJob(value));
    setSearchQuery(query);
  };

  useEffect(() => {
    dispatch(notJobCorrespondSkill(userToken));
  }, []);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index == 0) {
      bottomSheetRef.current.close();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{padding: 10}}>
        <TouchableOpacity onPress={() => navigation.navigate('SearchJob')}>
          <View
            style={{
              justifyContent: 'space-evenly',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Searchbar
              autoCapitalize="none"
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
        {search.length > 0 && (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View
              style={{
                justifyContent: 'center',
                backgroundColor: '#EBEFFF',
                width: 30,
                height: 30,
                borderRadius: 4,
                alignItems: 'center',
                margin: 5,
              }}>
              <Octicons name="git-compare" size={15} />
            </View>
            <TouchableOpacity
              style={styles.innerSearch}
              onPress={() => {
                setBottomIndex(1);
                bottomSheetRef.current?.expand();
              }}>
              <Text style={styles.innerText}>
                Budget <AntDesign name="down" size={12} />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.innerSearch}>
              <Text style={styles.innerText}>
                Avilability
                <AntDesign name="down" size={12} />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.innerSearch}>
              <Text style={styles.innerText}>
                Location <AntDesign name="down" size={12} />
              </Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        {(search.length == 0 || searchQuery.length == 0) && (
          <View style={{padding: 10, marginTop: 10}}>
            <Text
              style={{
                fontFamily: fonts.regular,
                fontSize: 16,
                color: '#1E202B',
              }}>
              Jobs based on your expertise
            </Text>
          </View>
        )}
      </View>

      <FlatList
        ListHeaderComponent={<View>{loading && <ActivityIndicator />}</View>}
        data={
          search.length > 0 || searchQuery.length > 0 ? search : notCorrespond
        }
        contentContainerStyle={{padding: 10}}
        renderItem={({item, index}) => {
          return <ExpertiseCard item={item} key={index.toString()} />;
        }}
        keyExtractor={(_, index) => index.toString()}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={bottomIndex}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <Text style={{fontSize: 16, fontFamily: fonts.semibold}}>
            Time Posted
          </Text>
          <Text
            style={{
              color: '#FF0000',
              fontFamily: fonts.regular,
              fontSize: 14,
            }}>
            Clear
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 0.2,
            borderBottomColor: colors.light,
            marginTop: 10,
          }}></View>
        <View style={styles.toggleText}>
          <Text style={styles.radioText}>Anytime</Text>
          <RadioButton
            value="first"
            color="#0E184D"
            status={checked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked('first');
            }}
          />
        </View>
        <View style={styles.toggleText}>
          <Text style={styles.radioText}>Past 24 hours</Text>
          <RadioButton
            value="second"
            color="#0E184D"
            status={checked === 'second' ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked('second');
            }}
          />
        </View>
        <View style={styles.toggleText}>
          <Text style={styles.radioText}>Past 3 days</Text>
          <RadioButton
            value="third"
            color="#0E184D"
            status={checked === 'third' ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked('third');
            }}
          />
        </View>
        <View style={styles.toggleText}>
          <Text style={styles.radioText}>Past week</Text>
          <RadioButton
            value="four"
            color="#0E184D"
            status={checked === 'four' ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked('four');
            }}
          />
        </View>
        <View style={styles.toggleText}>
          <Text style={styles.radioText}>Past month</Text>
          <RadioButton
            value="five"
            color="#0E184D"
            status={checked === 'five' ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked('five');
            }}
          />
        </View>
        <View
          style={{
            borderRadius: 10,
            margin: 10,
            padding: 10,
            flexWrap: 'wrap',
            flexDirection: 'row',
          }}></View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchInput: {
    color: '#454545',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  innerSearch: {
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 30,
    margin: 5,
    borderColor: '#1E202B',
  },
  innerText: {
    fontFamily: fonts.regular,
    color: '#1E202B',
  },
  radioText: {
    fontFamily: fonts.regular,
    color: '#000C14',
    fontSize: 16,
  },
  toggleText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
});

export default Jobs;
