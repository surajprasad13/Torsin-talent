import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet, View, FlatList} from 'react-native';
import {Searchbar} from 'react-native-paper';

//icons
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../../../theme';
import {useNavigation} from '@react-navigation/native';

const SearchJob = ({}) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(responseJson => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = item => {
    navigation.navigate('MusicJob');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View
          style={{
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
          }}>
          <Feather
            name="arrow-left"
            size={20}
            onPress={() => navigation.navigate('DrawerNavigation')}
          />
          <Searchbar
            placeholder="Search Jobs"
            onChangeText={text => searchFilterFunction(text)}
            value={search}
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
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 15,
  },
  textInputStyle: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 30,
    padding: 15,
    borderColor: '#BDBDBD',
    flex: 0.95,
  },
  searchInput: {
    color: '#454545',
  },
});

export default SearchJob;
