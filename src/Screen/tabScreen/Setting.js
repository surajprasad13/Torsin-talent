import React from "react"
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Image } from "react-native"
import ProFile from "../Components/ProFile";

const Setting = ({navigation}) => {
  return (
    <SafeAreaView style={{
      flex: 1
    }}>



      <StatusBar
        barStyle='dark-content'
        hidden={false}
        backgroundColor="#ffffff"
        translucent={true}

      />

      <View style={{
        backgroundColor: '#ffffff',
        height: 100,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
      }}>

        <TouchableOpacity
          onPress={() => navigation.navigate('HomeScreen')}
          style={{
            position: 'absolute',
            top: 58,
            left: 24
          }}>
          <Image
            source={require('../../Image/backarrow.png')}
            style={{
              width: 16,
              height: 14,

            }}
          />
        </TouchableOpacity>

        <Text style={{
          textAlign: 'center',
          top: 50,
          alignItems: 'center',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: '500',
          fontSize: 16,
          lineHeight: 28,
          color: '#000C14'

        }}>View Profile</Text>

      </View>

      <View style={{
        backgroundColor: '#f9fbff',
        flex: 2
      }}>

        <View style={{
          top: 24.33
        }}>
          <ProFile />
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          top: 28
        }}>

          <Text style={{
            left: 20,
            top: 28,
            fontFamily: 'Inter',
            fontStyle: 'semi-bold',
            fontWeight: '600',
            fontSize: 20,
            lineHeight: 22,
            textAlign: 'center',
            color: '#000000',
          }}>Personal Information</Text>

          <TouchableOpacity 
          onPress={() => navigation.navigate('EditUserProfile')}
          style={{
            flexDirection: 'row',
            top: 28,
          }}>
            <Image
              source={require('../../Image/edit.png')}
              style={{
                width: 11,
                height: 13,
                right: 30,
                top: 5,
                tintColor: '#000000',
              }}
            />
            <Text style={{
              fontFamily: 'Inter',
              fontStyle: 'bold',
              fontWeight: '700',
              fontSize: 16,
              lineHeight: 22,
              textAlign: 'center',
              right: 21,
              color: '#052FD5',
            }}>Edit</Text>
          </TouchableOpacity>

        </View>

        <View style = {{
          flexDirection: 'row',
          top: 71
        }}>
          <Image
            source={require('../../Image/User_light.png')}
            style={styles.userIcon}
          />
          <Text style={styles.userText}>John Smith</Text>
        </View>

        <View style={{
          flexDirection: 'row',
          top: 94
        }}>
          <Image
            source={require('../../Image/nounMale.png')}
            style={styles.userIcon}
          />
          <Text style={styles.userText}>Male</Text>
        </View>

        <View style={{
          flexDirection: 'row',
          top: 115
        }}>
          <Image
            source={require('../../Image/Message_light.png')}
            style={styles.userIcon}
          />
          <Text style={styles.userText}>john@gmail.com</Text>
        </View>

        <View style={{
          flexDirection: 'row',
          top: 136
        }}>
          <Image
            source={require('../../Image/Phone_light.png')}
            style={styles.userIcon}
          />
          <Text style={styles.userText}>895204300</Text>
        </View>

        <View style={{
          flexDirection: 'row',
          top: 157
        }}>
          <Image
            source={require('../../Image/location.png')}
            style={styles.userIcon}
          />
          <Text style={styles.userText}>Murshid Bazar, Deira, P.O Box 40512</Text>
        </View>

      </View>

    

    </SafeAreaView>
  )
};

export default Setting;

const styles = StyleSheet.create({
  userText: {
    fontFamily: 'Inter',
    fontStyle: 'regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: '#000000',
    left: 60
  },

  userIcon: {
    width: 15,
    height: 15,
    left: 27,
    top: 3,
    tintColor: '#6c6c6c'
  }

})