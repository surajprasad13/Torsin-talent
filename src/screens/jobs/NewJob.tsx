import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';
import React from 'react';
import {appstyle, colors, fonts} from '../../theme';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

//icons
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const NewJob = ({}) => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <Pressable style={[styles.cardContainer, {}]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <FastImage
            source={require('../../assets/images/men.png')}
            resizeMode="cover"
            style={{width: 50, height: 50, borderRadius: 25}}
          />
          <View style={{width: '80%'}}>
            <Text style={{fontFamily: fonts.semibold, color: colors.black}}>
              Java Developer
            </Text>
            <Text style={[styles.headertext, {marginTop: 10}]}>
              Testing Java
            </Text>
            <Text style={styles.text}>Test YourSelf</Text>
            <Text style={styles.text}>$22222</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}></View>
          </View>
        </View>

        <Divider style={{marginTop: 10}} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 15,
            margin: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginRight: 20,
            }}>
            <AntDesign name="checkcircle" size={20} style={{color: 'green'}} />
            <Text
              style={{
                fontFamily: fonts.medium,
                fontSize: 16,
                color: 'blue',
                marginLeft: 10,
              }}>
              Accept
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
            }}>
            <Entypo name="circle-with-cross" size={20} style={{color: 'red'}} />
            <Text
              style={{
                fontFamily: fonts.medium,
                fontSize: 16,
                color: 'red',
                marginLeft: 10,
              }}
              numberOfLines={1}>
              Reject
            </Text>
          </View>
        </View>
      </Pressable>
      <Pressable style={[styles.cardContainer, {}]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <FastImage
            source={require('../../assets/images/men.png')}
            resizeMode="cover"
            style={{width: 50, height: 50, borderRadius: 25}}
          />
          <View style={{width: '80%'}}>
            <Text style={{fontFamily: fonts.semibold, color: colors.black}}>
              Java Developer
            </Text>
            <Text style={[styles.headertext, {marginTop: 10}]}>
              Testing Java
            </Text>
            <Text style={styles.text}>Test YourSelf</Text>
            <Text style={styles.text}>$22222</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}></View>
          </View>
        </View>

        <Divider style={{marginTop: 10}} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 15,
            margin: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginRight: 20,
            }}>
            <AntDesign name="checkcircle" size={20} style={{color: 'green'}} />
            <Text
              style={{
                fontFamily: fonts.medium,
                fontSize: 16,
                color: 'blue',
                marginLeft: 10,
              }}>
              Accept
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
            }}>
            <Entypo name="circle-with-cross" size={20} style={{color: 'red'}} />
            <Text
              style={{
                fontFamily: fonts.medium,
                fontSize: 16,
                color: 'red',
                marginLeft: 10,
              }}
              numberOfLines={1}>
              Reject
            </Text>
          </View>
        </View>
      </Pressable>
      <Pressable style={[styles.cardContainer, {}]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <FastImage
            source={require('../../assets/images/men.png')}
            resizeMode="cover"
            style={{width: 50, height: 50, borderRadius: 25}}
          />
          <View style={{width: '80%'}}>
            <Text style={{fontFamily: fonts.semibold, color: colors.black}}>
              Java Developer
            </Text>
            <Text style={[styles.headertext, {marginTop: 10}]}>
              Testing Java
            </Text>
            <Text style={styles.text}>Test YourSelf</Text>
            <Text style={styles.text}>$22222</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}></View>
          </View>
        </View>

        <Divider style={{marginTop: 10}} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 15,
            margin: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginRight: 20,
            }}>
            <AntDesign name="checkcircle" size={20} style={{color: 'green'}} />
            <Text
              style={{
                fontFamily: fonts.medium,
                fontSize: 16,
                color: 'blue',
                marginLeft: 10,
              }}>
              Accept
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
            }}>
            <Entypo name="circle-with-cross" size={20} style={{color: 'red'}} />
            <Text
              style={{
                fontFamily: fonts.medium,
                fontSize: 16,
                color: 'red',
                marginLeft: 10,
              }}
              numberOfLines={1}>
              Reject
            </Text>
          </View>
        </View>
      </Pressable>
      <Pressable style={[styles.cardContainer, {}]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <FastImage
            source={require('../../assets/images/men.png')}
            resizeMode="cover"
            style={{width: 50, height: 50, borderRadius: 25}}
          />
          <View style={{width: '80%'}}>
            <Text style={{fontFamily: fonts.semibold, color: colors.black}}>
              Java Developer
            </Text>
            <Text style={[styles.headertext, {marginTop: 10}]}>
              Testing Java
            </Text>
            <Text style={styles.text}>Test YourSelf</Text>
            <Text style={styles.text}>$22222</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}></View>
          </View>
        </View>

        <Divider style={{marginTop: 10}} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 15,
            margin: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginRight: 20,
            }}>
            <AntDesign name="checkcircle" size={20} style={{color: 'green'}} />
            <Text
              style={{
                fontFamily: fonts.medium,
                fontSize: 16,
                color: 'blue',
                marginLeft: 10,
              }}>
              Accept
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
            }}>
            <Entypo name="circle-with-cross" size={20} style={{color: 'red'}} />
            <Text
              style={{
                fontFamily: fonts.medium,
                fontSize: 16,
                color: 'red',
                marginLeft: 10,
              }}>
              Reject
            </Text>
          </View>
        </View>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    ...appstyle.shadow,
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'white',
    marginTop: 20,
    margin: 10,
  },
  text: {
    fontFamily: fonts.regular,
    color: '#1E202B',
    fontSize: 12,
    marginTop: 5,
    justifyContent: 'center',
  },
  headertext: {
    fontFamily: fonts.regular,
    color: colors.primary,
    fontSize: 16,
    justifyContent: 'center',
  },
  icon: {
    right: 2,
  },
});

export default NewJob;
