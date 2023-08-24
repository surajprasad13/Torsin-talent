import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

// icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//helpers
import SignupPopup from '../bottomScreen/SignupPopup';
import {colors, fonts, appstyle} from '../../theme';
import HomeCard from './component/HomeCard';

const {} = Dimensions.get('window');

const WithoutSignupHome = ({}) => {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query: any) => setSearchQuery(query);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F9FBFF'}}>
      <View
        style={{
          justifyContent: 'space-evenly',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View>
          <Pressable
            onPress={() => {
              //@ts-ignore
              // navigation.openDrawer();
            }}>
            <MaterialIcons name="sort" size={20} color="#14226D" />
          </Pressable>
        </View>
        <Searchbar
          placeholder="Search Talent"
          onChangeText={onChangeSearch}
          value={searchQuery}
          placeholderTextColor={colors.grey4}
          iconColor={colors.grey4}
          style={{
            backgroundColor: colors.white,
            borderWidth: 0.5,
            flex: 0.9,
            borderRadius: 30,
            borderColor: '#BDBDBD',
            alignItems: 'center',
          }}
          inputStyle={styles.searchInput}
        />
      </View>

      <ScrollView
        style={{
          backgroundColor: '#F9FBFF',
        }}>
        <View
          style={{
            borderRadius: 16,
            ...appstyle.shadow,
            margin: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Image
              source={require('../../assets/images/otp.png')}
              style={{
                width: 89,
                height: 80,
                margin: 5,
              }}
            />
            <View style={{margin: 5}}>
              <Text
                style={{
                  fontFamily: fonts.semibold,
                  fontSize: 16,
                  top: 10,
                  color: '#1E202B',
                }}>
                Sign up to explore more
              </Text>
              <Text
                style={{
                  width: 175,
                  fontFamily: fonts.regular,
                  fontSize: 10,
                  color: '#1E202B',
                  marginTop: 10,
                }}>
                Continue to the sign up page to start exploring more content.
              </Text>
              <Pressable style={{marginTop: 20}}>
                <SignupPopup />
              </Pressable>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 10,
          }}>
          <Text
            style={{
              fontFamily: fonts.medium,
              color: '#1E202B',
            }}>
            John based on your expertise
          </Text>
          <Pressable onPress={() => navigation.navigate('ViewAllTalent')}>
            <Text
              style={{
                fontFamily: fonts.medium,
                color: '#14226D',
              }}>
              View all
            </Text>
          </Pressable>
        </View>
        {[0, 1, 2, 3, 4, 5, 6].map(index => (
          <HomeCard key={index} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    color: '#454545',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WithoutSignupHome;
