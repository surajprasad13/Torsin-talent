import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, ScrollView, Image, FlatList, Animated, Dimensions } from "react-native"
import { Searchbar } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Badge } from 'react-native-elements';
import SignupPopup from './SignupPopup';
import ProFile from '../Components/ProFile';
import ImageSlider from '../Components/ImageSlider';
import CircleProgress from '../Components/CircleProgress';

const { height, width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {

  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = query => setSearchQuery(query);



  return (

    <View style={{ flex: 1, backgroundColor: '#F9FBFF' }}>

      <View style={{
        justifyContent: 'space-evenly',
        top: 30,
        flexDirection: 'row',
        alignItems: 'center',

      }}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}>
            <Image
              style={styles.tinyLogo}
              source={require('../../Image/Sort.png')}
              tintColor='#14226D'
            />
          </TouchableOpacity>
        </View>
        <Searchbar
          placeholder="Search Jobs"
          onChangeText={onChangeSearch}
          value={searchQuery}
          placeholderTextColor='#BDBDBD'
          iconColor='#333333'
          style={{
            backgroundColor: '#ffffff',
            borderWidth: 1,
            width: '75%',
            height: 44,
            borderRadius: 30,
            borderColor: '#BDBDBD'
          }}
          inputStyle={styles.searchInput}
        />
      </View>

      <ScrollView style={{
        flex: 1,
        top: 30,
        backgroundColor: '#F9FBFF'
      }}>

        <View style={{
          backgroundColor: '#ffffff',
          elevation: 2,
          width: '90%',
          height: 146,
          marginLeft: '5%',
          marginTop: 10,
          borderRadius: 19
        }}>

          <View style={{
            flexDirection: 'row'
          }}>
            <View style={{
              top: 21,
              left: 10
            }}>
              <CircleProgress />
            </View>
            <Text style={{
              width: 158,
              height: 20,
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize: 16,
              top: 22,
              left: 116,
              position: 'absolute',
              lineHeight: 20,
              display: 'flex',
              alignItems: 'center',
              color: '#1E202B',
            }}>John Smith’s Profile</Text>
          </View>

          <Text style={{
            width: 175,
            height: 45,
            fontFamily: 'Inter',
            fontStyle: 'regular',
            fontWeight: '400',
            fontSize: 10,
            top: 49,
            left: 116,
            opacity: 0.8,
            position: 'absolute',
            lineHeight: 15,
            color: '#1E202B',
          }}>Complete your profile. Set your profile completely so that recruiter will find your profile easily</Text>


          <TouchableOpacity>
            <Text style={{
              left: 116,
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: 12,
              top: 15,
              display: 'flex',
              alignItems: 'center',
              color: '#14226D',
            }}>5 Details Needed to add.....</Text>
          </TouchableOpacity>

        </View>

        <View style={{
          top: 8
        }}>
          <ImageSlider />
        </View>


        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 30
        }}>
          <Text style={{
            height: 20,
            fontFamily: 'Inter',
            fontStyle: 'medium',
            fontWeight: '500',
            fontSize: 16,
            lineHeight: 20,
            display: 'flex',
            color: '#1E202B',
            textAlign: 'left',
            // right: '70%'
          }}>John based on your expertise</Text>
          <Text style={{
            height: 20,
            fontFamily: 'Inter',
            fontStyle: 'medium',
            fontWeight: '500',
            fontSize: 16,
            lineHeight: 20,
            display: 'flex',
            textAlign: 'right',
            color: '#14226D',
            // left: '50%'
          }}>view all</Text>
        </View>


        <View style={{
          height: 174,
          backgroundColor: '#ffffff',
          elevation: 2,
          width: '90%',
          marginLeft: '5%',
          marginTop: 10,
          borderRadius: 16,
        }}>

          <View style={{
            flexDirection: 'row'
          }}>
            <Image
              source={require('../../Image/Profilepicture.png')}
              style={{
                width: 44.55,
                height: 44.55,
                left: 10,
                top: 10,
              }}
            />
            <Text style={{
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
            }}>Music Programmer</Text>
          </View>

          <Text style={{
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
          }}>As a musician minim mollit non deseruntAmet minim mollit non deserunt</Text>
          <Text style={{
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
          }}>$500.00-$ 600.00</Text>

          <View style={{
            width: '90%',
            left: '5%',
            borderWidth: .5,
            borderColor: '#BDBDBD',

          }}></View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            top: 20,
          }}>

            <View style={{
              flexDirection: 'row',
            }}>
              <Image
                source={require('../../Image/Subtract.png')}
                style={{
                  top: 3,
                  right: 2
                }}
              />
              <Text style={styles.innerText}>South Dakota</Text>
            </View>

            <View style={{
              flexDirection: 'row',
            }}>
              <Image
                source={require('../../Image/Time_light.png')}
                style={{

                  right: 2
                }}
              />
              <Text style={styles.innerText}>3d ago</Text>
            </View>

            <View style={{
              flexDirection: 'row',
            }}>
              <Image
                source={require('../../Image/User_light.png')}
                style={{

                  right: 2
                }}
              />
              <Text style={styles.innerText}>James Cameroon</Text>
            </View>

          </View>

        </View>

        <View style={{
          height: 174,
          backgroundColor: '#F9FBFF',
          elevation: 2,
          width: '90%',
          marginLeft: '5%',
          marginTop: 10,
          borderRadius: 16,
        }}>

          <View style={{
            flexDirection: 'row'
          }}>
            <Image
              source={require('../../Image/Profilepicture.png')}
              style={{
                width: 44.55,
                height: 44.55,
                left: 10,
                top: 10,
              }}
            />
            <Text style={{
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
            }}>Music Composer</Text>
          </View>

          <Text style={{
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
          }}>As a musician minim mollit non deseruntAmet minim mollit non deserunt</Text>
          <Text style={{
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
          }}>$500.00-$ 600.00</Text>

          <View style={{
            width: '90%',
            left: '5%',
            borderWidth: .5,
            borderColor: '#BDBDBD',

          }}></View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            top: 20,
          }}>

            <View style={{
              flexDirection: 'row',
            }}>
              <Image
                source={require('../../Image/Subtract.png')}
                style={{
                  top: 3,
                  right: 2
                }}
              />
              <Text style={styles.innerText}>South Dakota</Text>
            </View>

            <View style={{
              flexDirection: 'row',
            }}>
              <Image
                source={require('../../Image/Time_light.png')}
                style={{

                  right: 2
                }}
              />
              <Text style={styles.innerText}>3d ago</Text>
            </View>

            <View style={{
              flexDirection: 'row',
            }}>
              <Image
                source={require('../../Image/User_light.png')}
                style={{

                  right: 2
                }}
              />
              <Text style={styles.innerText}>James Cameroon</Text>
            </View>

          </View>

        </View>

        <View style={{
          height: 174,
          backgroundColor: '#ffffff',
          elevation: 2,
          width: '90%',
          marginLeft: '5%',
          marginTop: 10,
          borderRadius: 16,
        }}>

          <View style={{
            flexDirection: 'row'
          }}>
            <Image
              source={require('../../Image/Profilepicture.png')}
              style={{
                width: 44.55,
                height: 44.55,
                left: 10,
                top: 10,
              }}
            />
            <Text style={{
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
            }}>Music Composer</Text>
          </View>

          <Text style={{
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
          }}>As a musician minim mollit non deseruntAmet minim mollit non deserunt</Text>
          <Text style={{
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
          }}>$500.00-$ 600.00</Text>

          <View style={{
            width: '90%',
            left: '5%',
            borderWidth: .5,
            borderColor: '#BDBDBD',

          }}></View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            top: 20,
          }}>

            <View style={{
              flexDirection: 'row',
            }}>
              <Image
                source={require('../../Image/Subtract.png')}
                style={{
                  top: 3,
                  right: 2
                }}
              />
              <Text style={styles.innerText}>South Dakota</Text>
            </View>

            <View style={{
              flexDirection: 'row',
            }}>
              <Image
                source={require('../../Image/Time_light.png')}
                style={{

                  right: 2
                }}
              />
              <Text style={styles.innerText}>3d ago</Text>
            </View>

            <View style={{
              flexDirection: 'row',
            }}>
              <Image
                source={require('../../Image/User_light.png')}
                style={{

                  right: 2
                }}
              />
              <Text style={styles.innerText}>James Cameroon</Text>
            </View>

          </View>

        </View>

      </ScrollView>



    </View>
  )
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchInput: {
    color: '#454545',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -5
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
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 25,
    color: "#14226D",
  },

  innertextStyle: {
    fontFamily: 'Inter',
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 10,
    marginLeft: 14,
    lineHeight: 12,
    color: "#4F4F4F",
  },

  viewmore: {
    width: 59,
    height: 20,
    fontFamily: 'Inter',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 20,
    textAlign: "center",
    color: "#0036FF",
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
  }

})