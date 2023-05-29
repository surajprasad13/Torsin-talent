import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  FlatList,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';
import {RadioButton} from 'react-native-paper';

//icons
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// components

import {colors, fonts} from '../../../theme';
import ExpertiseCard from '../../../screens/home/components/ExpertiseCard';
import OpenModal from './OpenModal';
import {useAppSelector} from '../../../hooks';

const {} = Dimensions.get('window');

const MusicJob = ({}) => {
  const navigation = useNavigation();
  const {correspond} = useAppSelector(state => state.user);
  const [bottomIndex, setBottomIndex] = useState(-1);
  const renderItem = ({item, index}) => <ExpertiseCard item={item} />;
  const [checked, setChecked] = useState('first');

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
    <SafeAreaView style={{flex: 1}}>
      <View style={{backgroundColor: colors.white, padding: 10}}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={20} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: fonts.semibold,
              fontSize: 16,
              color: '#1E202B',
              textAlign: 'center',
            }}>
            Music
          </Text>
          <View style={{flex: 0.2}} />
        </View>

        <View
          style={{
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            padding: 10,
          }}>
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
        </View>
      </View>
      <ScrollView style={{padding: 10, backgroundColor: '#F9FBFF'}}>
        <View
          style={{
            padding: 10,
          }}>
          <Text
            style={{
              fontFamily: fonts.regular,
              fontSize: 16,
              color: '#1E202B',
            }}>
            Search results
          </Text>
        </View>
        <View style={{marginTop: 10}}>
          <FlatList
            data={correspond}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      </ScrollView>
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

export default MusicJob;

const styles = StyleSheet.create({
  searchInput: {
    color: '#454545',
  },
  item: {
    backgroundColor: '#f9c2ff',
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
