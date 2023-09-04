import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Animated,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {Divider, Menu, Searchbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

//icons
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//helpers
import {colors, fonts, appstyle} from '../../theme';
import ImageSlider from '../../components/ImageSlider';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {withoutSignupSkill} from '../../redux/actions/userAction';
import ExpertiseWithoutCard from './component/ExpertiseWithoutCard';
import {WithoutSkill} from '../../types/user';
import {updateSuccess} from '../../redux/reducers/userSlice';
import {CustomInput} from '../../components';

const WithoutSignupHome = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const {loading, error, success, without} = useAppSelector(
    state => state.user,
  );

  const [inputValue, setInputValue] = useState<string>('');
  const [selectedItems, setSelectedItem] = useState<string[]>([]);

  const handleSearch = (text: string) => {
    if (selectedItems.length > 10) return;
    setInputValue(text);
    dispatch(withoutSignupSkill(text));
  };

  const handleRemoveItem = (item: any) => {
    const updatedItems = selectedItems.filter(i => i !== item);
    setSelectedItem(updatedItems);
  };

  const valid =
    inputValue !== '' && typeof without !== 'string' && without.length > 0;
  //@ts-ignore
  useEffect(() => {
    const listener = navigation.addListener('beforeRemove', () => {
      dispatch(updateSuccess());
    });
    return () => listener;
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const interpolatedSlide = new Animated.Value(isMenuOpen ? 0 : 1000);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    Animated.timing(interpolatedSlide, {
      toValue: isMenuOpen ? 0 : 1000, // Adjust the values as needed
      duration: 300, // Animation duration
      useNativeDriver: false, // Adjust as needed
    }).start();
  };

  console.log(without);

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

        <CustomInput
          editable={selectedItems.length <= 10}
          placeholder="Search Skill..."
          value={inputValue}
          onChangeText={handleSearch}
          containerStyle={{margin: 15}}
        />
      </LinearGradient>

      <ScrollView>
        <View style={[styles.chipContainer, {marginTop: 10}]}>
          {selectedItems.map((item, index) => (
            <TouchableOpacity
              key={index.toString()}
              style={styles.chip}
              onPress={() => handleRemoveItem(item)}>
              <Text style={{fontFamily: fonts.regular, fontSize: 10}}>
                {item}
              </Text>
              <View style={styles.cancelContainer}>
                <Icon name="close" size={8} style={{}} color={colors.white} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView
          style={[styles.sectionContainer, {borderWidth: valid ? 1 : 0}]}>
          {inputValue.length > 0 &&
            without.length > 0 &&
            typeof without !== 'string' &&
            without.map((item, index) => (
              <Pressable
                onPress={() => {
                  setInputValue('');
                  setSelectedItem([...selectedItems]);
                }}
                key={index}
                style={styles.section}>
                <Text>{item.adminService}</Text>
              </Pressable>
            ))}
        </ScrollView>

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

          {without.map((_item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: index > 0 ? 20 : 0,
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
                <Text style={{padding: 5}}>{_item.adminService}</Text>
              </TouchableOpacity>
            </View>
          ))}
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
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 7,
    borderWidth: 0.5,
    borderColor: colors.primary,
    borderRadius: 100,
    margin: 3,
  },
  cancelContainer: {
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 7.5,
    marginLeft: 5,
  },
  section: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: colors.grey4,
    borderRadius: 10,
  },
  sectionContainer: {
    backgroundColor: colors.white,
    borderColor: colors.grey4,
    borderBottomWidth: 0,
    borderRadius: 10,
    margin: 5,
  },
});

export default WithoutSignupHome;
