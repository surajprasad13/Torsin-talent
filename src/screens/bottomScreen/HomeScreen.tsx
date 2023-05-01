import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Searchbar} from 'react-native-paper';

// components
import ImageSlider from '../../components/ImageSlider';
import CircleProgress from '../../components/CircleProgress';
import {colors, fonts} from '../../theme';

const {} = Dimensions.get('window');

const HomeScreen = ({}) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query: any) => setSearchQuery(query);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              // navigation.openDrawer();
            }}>
            <Image
              style={styles.tinyLogo}
              source={require('../../assets/images/Sort.png')}
            />
          </TouchableOpacity>
          <Searchbar
            placeholder="Search Jobs"
            onChangeText={onChangeSearch}
            value={searchQuery}
            placeholderTextColor="#BDBDBD"
            iconColor="#333333"
            style={{
              backgroundColor: '#ffffff',
              borderWidth: 1,
              width: '75%',
              height: 44,
              borderRadius: 30,
              borderColor: '#BDBDBD',
            }}
            inputStyle={styles.searchInput}
          />
        </View>

        <View
          style={{
            margin: 10,
            borderRadius: 15,
            backgroundColor: colors.white,
            flexDirection: 'row',
            padding: 10,
          }}>
          <CircleProgress />
          <View style={{width: '70%', marginLeft: 10}}>
            <Text style={{fontFamily: fonts.semibold, color: '#1E202B'}}>
              John Smith’s Profile
            </Text>
            <Text
              style={{
                fontFamily: fonts.regular,
                opacity: 0.8,
                color: '#1E202B',
              }}>
              Complete your profile. Set your profile completely so that
              recruiter will find your profile easily
            </Text>

            <TouchableOpacity>
              <Text style={{fontFamily: fonts.medium, color: '#14226D'}}>
                5 Details Needed to add.....
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{top: 8}}>
          <ImageSlider />
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
              source={require('../../assets/images/Profilepicture.png')}
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
                source={require('../../assets/images/Subtract.png')}
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
              <Image
                source={require('../../assets/images/Time_light.png')}
                style={{
                  right: 2,
                }}
              />
              <Text style={styles.innerText}>3d ago</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                source={require('../../assets/images/User_light.png')}
                style={{
                  right: 2,
                }}
              />
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
              source={require('../../assets/images/Profilepicture.png')}
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
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../assets/images/Subtract.png')}
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
              <Image
                source={require('../../assets/images/Time_light.png')}
                style={{right: 2}}
              />
              <Text style={styles.innerText}>3d ago</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                source={require('../../assets/images/User_light.png')}
                style={{right: 2}}
              />
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
              source={require('../../assets/images/Profilepicture.png')}
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
                source={require('../../assets/images/Subtract.png')}
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
              <Image
                source={require('../../assets/images/Time_light.png')}
                style={{
                  right: 2,
                }}
              />
              <Text style={styles.innerText}>3d ago</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                source={require('../../assets/images/User_light.png')}
                style={{
                  right: 2,
                }}
              />
              <Text style={styles.innerText}>James Cameroon</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchInput: {
    color: '#454545',
  },
  tinyLogo: {
    width: 37,
    height: 37,
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
    width: 101,
    height: 26,
    left: 14,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 25,
    color: '#14226D',
  },

  innertextStyle: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 10,
    marginLeft: 14,
    lineHeight: 12,
    color: '#4F4F4F',
  },

  viewmore: {
    width: 59,
    height: 20,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'center',
    color: '#0036FF',
  },

  innerText: {
    // width: 77,
    height: 19,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    display: 'flex',
    alignItems: 'center',
    color: '#4F4F4F',
  },
});
