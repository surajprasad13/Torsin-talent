import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import React from 'react';
import {useAppSelector} from '../../hooks';
import ExpertiseCard from './components/ExpertiseCard';

import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {fonts} from '../../theme';

const Allexpertise = () => {
  const navigation = useNavigation();
  const {correspond} = useAppSelector(state => state.user);

  const renderItem = ({item, index}) => <ExpertiseCard item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
        <Pressable
          style={{position: 'absolute', left: 10}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Feather name="arrow-left" size={20} />
        </Pressable>
        <Text style={{fontFamily: fonts.medium, fontSize: 16}}>
          Top recommended jobs
        </Text>
      </View>
      <FlatList
        style={{}}
        contentContainerStyle={{padding: 10}}
        data={correspond}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFF',
  },
});

export default Allexpertise;
