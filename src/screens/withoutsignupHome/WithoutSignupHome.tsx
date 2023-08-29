import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Animated,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {Divider, Menu, Searchbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

//icons
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

//helpers
import {colors, fonts, appstyle} from '../../theme';
import ImageSlider from '../../components/ImageSlider';
import {useAppDispatch, useAppSelector} from '../../hooks';

const WithoutSignupHome = () => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const [searchQuery, setSearchQuery] = useState('');

  const [isSearching, setIsSearching] = useState(false);
  const {} = useAppSelector(state => state.user);

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const value = {
        search: query,
      };
      // dispatch(searchJob(value));
      setIsSearching(true); // Set the flag to indicate search is active
    } else {
      setIsSearching(false); // Reset the flag when query is empty
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const interpolatedSlide = new Animated.Value(isMenuOpen ? 0 : 1000); // Adjust the 1000 value as needed

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    Animated.timing(interpolatedSlide, {
      toValue: isMenuOpen ? 0 : 1000, // Adjust the values as needed
      duration: 300, // Animation duration
      useNativeDriver: false, // Adjust as needed
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#6585FC', '#162470']} style={{height: 300}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 10,
            marginTop: 20,
          }}>
          <FastImage
            source={require('../../assets/images/logo1.png')}
            style={{width: 30, height: 30}}
            resizeMode="cover"
          />
          <Text
            style={{
              marginLeft: 20,
              fontFamily: fonts.bold,
              color: colors.white,
              fontSize: 18,
            }}>
            Torsin
          </Text>
          <View style={styles.menuItem1}>
            <Pressable onPress={toggleMenu} style={styles.menuButton}>
              <Feather name="menu" size={20} color={colors.white} />
            </Pressable>
            <Animated.View
              style={[styles.menuContainer, {right: interpolatedSlide}]}>
              <Pressable style={styles.closeButton} onPress={toggleMenu}>
                <AntDesign name="close" size={15} color={colors.black} />
              </Pressable>
              <View style={styles.menuItems}>
                <Pressable style={styles.menuItem}>
                  <Text style={styles.menuItemText}>Sign in</Text>
                  <AntDesign name="right" size={10} color={colors.black} />
                </Pressable>
                <Pressable style={styles.menuItem}>
                  <Text style={styles.menuItemText}>Blogs</Text>
                  <AntDesign name="right" size={10} color={colors.black} />
                </Pressable>
                <Pressable style={styles.menuItem}>
                  <Text style={styles.menuItemText}>Terms & conditions</Text>
                  <AntDesign name="right" size={10} color={colors.black} />
                </Pressable>
              </View>
              <Pressable style={styles.joinButton}>
                <Text style={styles.joinButtonText}>Join</Text>
              </Pressable>
            </Animated.View>
          </View>
        </View>

        <Text
          style={{
            textAlign: 'center',
            fontFamily: fonts.semibold,
            color: colors.white,
            fontSize: 20,
            marginHorizontal: 20,
            marginTop: 30,
          }}>
          Find{' '}
          <Text
            style={{
              color: colors.white,
              fontFamily: fonts.regular,
              fontSize: 20,
            }}>
            freelance
          </Text>{' '}
          work in an instant, tailored to your needs.
        </Text>

        <Searchbar
          autoCapitalize="none"
          placeholder="Search Jobs"
          onChangeText={onChangeSearch}
          value={searchQuery}
          placeholderTextColor="#BDBDBD"
          iconColor="#333333"
          style={{
            marginHorizontal: 20,
            marginTop: 20,
            borderRadius: 30,
          }}
          inputStyle={styles.searchInput}
        />
      </LinearGradient>

      <ScrollView>
        {/* <FlatList
          ListHeaderComponent={<View>{loading && <ActivityIndicator />}</View>}
          data={isSearching ? search : notCorrespond}
          contentContainerStyle={{padding: 10}}
          renderItem={({item, index}) => {
            return <ExpertiseCard item={item} key={index.toString()} />;
          }}
          keyExtractor={(_, index) => index.toString()}
        /> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
          }}>
          <Text style={{fontFamily: fonts.semibold, fontSize: 16}}>
            Blogs / News
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Feeds')}>
            <Text style={{fontFamily: fonts.medium, color: colors.primary}}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <ImageSlider />
        <View style={{margin: 10, backgroundColor: '#f9fbff'}}>
          <Text
            style={{fontFamily: fonts.semibold, fontSize: 16, marginTop: 5}}>
            Why Choose Torsin?
          </Text>
          <Text
            style={{fontFamily: fonts.regular, fontSize: 14, marginTop: 10}}>
            1. <Text style={{fontFamily: fonts.bold}}>Efficiency:</Text> Say
            goodbye to endless searches. Our intuitive platform swiftly connects
            freelancers and clients, eliminating the hassle and delays often
            associated with traditional freelance interactions.
          </Text>
          <Text
            style={{fontFamily: fonts.regular, fontSize: 14, marginTop: 10}}>
            2. <Text style={{fontFamily: fonts.bold}}>Quality:</Text> We take
            pride in maintaining a curated network of top-notch freelancers.
            When you choose [Your Freelance Web App Name], you're choosing
            excellence and professionalism.
          </Text>
          <Text
            style={{fontFamily: fonts.regular, fontSize: 14, marginTop: 10}}>
            3. <Text style={{fontFamily: fonts.bold}}>Diversity:</Text> Our
            platform caters to a wide array of industries and skill sets. From
            creative to technical, you'll find freelancers who can bring your
            vision to life.
          </Text>
          <Text
            style={{fontFamily: fonts.regular, fontSize: 14, marginTop: 10}}>
            4. <Text style={{fontFamily: fonts.bold}}>Trust & Security:</Text>{' '}
            Your peace of mind matters. Our secure environment ensures that your
            projects and transactions are handled with the utmost care and
            confidentiality.
          </Text>
        </View>
        <View style={{backgroundColor: 'white'}}>
          <Text
            style={{
              fontFamily: fonts.semibold,
              fontSize: 16,
              marginTop: 5,
              margin: 10,
            }}>
            You need it, we've got it
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={{
                ...appstyle.shadow,
                padding: 10,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{padding: 5}}>Graphic design</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...appstyle.shadow,
                padding: 10,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{padding: 5}}>Graphic design</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
              bottom: 10,
            }}>
            <TouchableOpacity
              style={{
                ...appstyle.shadow,
                padding: 10,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{padding: 5}}>Graphic design</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...appstyle.shadow,
                padding: 10,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{padding: 5}}>Graphic design</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbff',
  },
  searchInput: {
    color: '#454545',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    margin: 16,
  },
  menuContainer: {
    position: 'absolute',
    width: 280,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    paddingTop: 50,
    height: 200,
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 10,
  },
  menuItems: {},
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  menuItemText: {
    fontFamily: fonts.semibold,
  },
  joinButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  joinButtonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
  },
  menuItem1: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default WithoutSignupHome;
