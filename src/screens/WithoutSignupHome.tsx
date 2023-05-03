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
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import SignupPopup from './bottomScreen/SignupPopup';
import {fonts} from '../theme';

// icons
import Feather from 'react-native-vector-icons/Feather';

const {} = Dimensions.get('window');

const WithoutSignupHome = ({}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query: any) => setSearchQuery(query);

  return (
    <View style={{flex: 1, backgroundColor: '#F9FBFF'}}>
      <View
        style={{
          justifyContent: 'space-evenly',
          flexDirection: 'row',
          padding: 30,
          top: 30,
        }}>
        <View>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Feather name="user" size={20} />
          </TouchableOpacity>
        </View>
        <Searchbar
          placeholder="Search Talent"
          onChangeText={onChangeSearch}
          value={searchQuery}
          placeholderTextColor="#BDBDBD"
          iconColor="#BDBDBD"
          style={{
            backgroundColor: '#ffffff',
            borderWidth: 1,
            width: '75%',
            height: 50,
            borderRadius: 30,
            borderColor: '#BDBDBD',
          }}
          inputStyle={styles.searchInput}
        />
      </View>

      <ScrollView
        style={{
          flex: 1,
          top: 20,
          backgroundColor: '#F9FBFF',
        }}>
        <View
          style={{
            backgroundColor: '#ffffff',
            elevation: 2,
            width: '90%',
            marginLeft: '5%',
            marginTop: 10,
            borderRadius: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Image
              source={require('../assets/images/otp.png')}
              style={{
                width: 89,
                height: 80,
                left: 5,
                top: 5,
              }}
            />
            <Text
              style={{
                width: 183,
                height: 20,
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '600',
                fontSize: 16,
                top: 10,
                left: 15,
                lineHeight: 20,
                display: 'flex',
                alignItems: 'center',
                color: '#1E202B',
              }}>
              Sign up to explore more
            </Text>
          </View>

          <Text
            style={{
              width: 175,
              height: 26,
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: 10,
              top: 35,
              left: 100,
              opacity: 0.8,
              position: 'absolute',
              lineHeight: 12,
              textAlign: 'center',
              color: '#1E202B',
            }}>
            Continue to the sign up page to start exploring more content.
          </Text>

          <Pressable
            style={{
              alignItems: 'center',
            }}>
            <SignupPopup />
          </Pressable>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 30,
          }}>
          <Text
            style={{
              height: 20,
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: 16,
              lineHeight: 20,
              display: 'flex',
              color: '#1E202B',
              textAlign: 'left',
              // right: '70%'
            }}>
            John based on your expertise
          </Text>
          <Text
            style={{
              height: 20,
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: 16,
              lineHeight: 20,
              display: 'flex',
              textAlign: 'right',
              color: '#14226D',
              // left: '50%'
            }}>
            view all
          </Text>
        </View>

        <View
          style={{
            height: 174,
            backgroundColor: '#ffffff',
            elevation: 2,
            width: '90%',
            marginLeft: '5%',
            marginTop: 10,
            borderRadius: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Image
              source={require('../assets/images/Profilepicture.png')}
              style={{
                width: 44.55,
                height: 44.55,
                left: 10,
                top: 10,
              }}
            />
            <Text
              style={{
                width: 183,
                height: 20,
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: 14,
                top: 10,
                left: 27,
                lineHeight: 17,
                display: 'flex',
                alignItems: 'center',
                color: '#1E202B',
              }}>
              Music Programmer
            </Text>
          </View>

          <Text
            style={{
              width: 246,
              height: 38,
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: 12,
              left: 72,
              opacity: 0.8,
              bottom: 10,
              lineHeight: 12,
              textAlign: 'justify',
              color: '#1E202B',
            }}>
            As a musician minim mollit non deseruntAmet minim mollit non
            deserunt
          </Text>
          <Text
            style={{
              width: 183,
              height: 20,
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: 12,
              left: 72,
              lineHeight: 17,
              display: 'flex',
              alignItems: 'center',
              color: '#1E202B',
              bottom: 15,
            }}>
            $500.00-$ 600.00
          </Text>

          <View
            style={{
              width: '90%',
              left: '5%',
              borderWidth: 0.5,
              borderColor: '#BDBDBD',
            }}></View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              top: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                source={require('../assets/images/Subtract.png')}
                style={{
                  top: 3,
                  right: 2,
                }}
              />
              <Text style={styles.innerText}>South Dakota</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
              }}>
              <Feather name="user" size={20} />
              <Text style={styles.innerText}>3d ago</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
              }}>
              <Feather name="user" size={20} />
              <Text style={styles.innerText}>James Cameroon</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            height: 174,
            backgroundColor: '#F9FBFF',
            elevation: 2,
            width: '90%',
            marginLeft: '5%',
            marginTop: 10,
            borderRadius: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Image
              source={require('../assets/images/Profilepicture.png')}
              style={{
                width: 44.55,
                height: 44.55,
                left: 10,
                top: 10,
              }}
            />
            <Text
              style={{
                width: 183,
                height: 20,
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: 14,
                top: 10,
                left: 27,
                lineHeight: 17,
                display: 'flex',
                alignItems: 'center',
                color: '#1E202B',
              }}>
              Music Composer
            </Text>
          </View>

          <Text
            style={{
              width: 246,
              height: 38,
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: 12,
              left: 72,
              opacity: 0.8,
              bottom: 10,
              lineHeight: 12,
              textAlign: 'justify',
              color: '#1E202B',
            }}>
            As a musician minim mollit non deseruntAmet minim mollit non
            deserunt
          </Text>
          <Text
            style={{
              width: 183,
              height: 20,
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: 12,
              left: 72,
              lineHeight: 17,
              display: 'flex',
              alignItems: 'center',
              color: '#1E202B',
              bottom: 15,
            }}>
            $500.00-$ 600.00
          </Text>

          <View
            style={{
              width: '90%',
              left: '5%',
              borderWidth: 0.5,
              borderColor: '#BDBDBD',
            }}></View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              top: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                source={require('../assets/images/Subtract.png')}
                style={{
                  top: 3,
                  right: 2,
                }}
              />
              <Text style={styles.innerText}>South Dakota</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
              }}>
              <Feather name="user" size={20} />
              <Text style={styles.innerText}>3d ago</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
              }}>
              <Feather name="user" size={20} />
              <Text style={styles.innerText}>James Cameroon</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            height: 174,
            backgroundColor: '#ffffff',
            elevation: 2,
            width: '90%',
            marginLeft: '5%',
            marginTop: 10,
            borderRadius: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Image
              source={require('../assets/images/Profilepicture.png')}
              style={{
                width: 44.55,
                height: 44.55,
                left: 10,
                top: 10,
              }}
            />
            <Text
              style={{
                width: 183,
                height: 20,
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: 14,
                top: 10,
                left: 27,
                lineHeight: 17,
                display: 'flex',
                alignItems: 'center',
                color: '#1E202B',
              }}>
              Music Composer
            </Text>
          </View>

          <Text
            style={{
              width: 246,
              height: 38,
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: 12,
              left: 72,
              opacity: 0.8,
              bottom: 10,
              lineHeight: 12,
              textAlign: 'justify',
              color: '#1E202B',
            }}>
            As a musician minim mollit non deseruntAmet minim mollit non
            deserunt
          </Text>
          <Text
            style={{
              width: 183,
              height: 20,
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: 12,
              left: 72,
              lineHeight: 17,
              display: 'flex',
              alignItems: 'center',
              color: '#1E202B',
              bottom: 15,
            }}>
            $500.00-$ 600.00
          </Text>

          <View
            style={{
              width: '90%',
              left: '5%',
              borderWidth: 0.5,
              borderColor: '#BDBDBD',
            }}></View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              top: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                source={require('../assets/images/Subtract.png')}
                style={{
                  top: 3,
                  right: 2,
                }}
              />
              <Text style={styles.innerText}>South Dakota</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
              }}>
              <Feather name="user" size={20} />
              <Text style={styles.innerText}>3d ago</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
              }}>
              <Feather name="user" size={20} />
              <Text style={styles.innerText}>James Cameroon</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    color: '#454545',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -5,
  },
  tinyLogo: {
    width: 25,
    height: 25,
    tintColor: '#BDBDBD',
    top: 15,
  },

  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },

  textStyle: {
    fontStyle: fonts.bold,
    color: '#14226D',
  },

  innertextStyle: {
    fontStyle: fonts.regular,
    color: '#4F4F4F',
  },

  viewmore: {
    fontStyle: fonts.regular,
    textAlign: 'center',
    color: '#0036FF',
  },

  innerText: {
    // width: 77,
    fontStyle: fonts.medium,
    color: '#4F4F4F',
  },
});

export default WithoutSignupHome;
