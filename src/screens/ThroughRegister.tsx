// import React, {useState} from "react"
// import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Image} from "react-native";

// import IndivisualRegister from "./IndivisualRegister";
// import BusinessRegister from "./BusinessRegister";

// const ThroughRegister = ({navigation}) => {

//     const [section, setSection] = useState('login');
//     const withBorder = {
//         margin: 8,
//         color: '#0E184D',
//         fontSize: 18,
//         fontWeight: '800',
//         // width: '100%',
//         // backgroundColor: '#ffffff',
//         // elevation: 1,
//         // borderRadius: 10,
//         // height: 40,
//         justifyContent: 'center',
//     };
//     const withoutBorder = {
//         margin: 8,
//         color: '#a0a0a0',
//         fontSize: 18,
//         fontWeight: '800',
//     };

//   return (
//       <ScrollView style = {{
//         flex: 1,
//         backgroundColor: '#ffffff'
//       }}>

//           <TouchableOpacity
//               onPress={() => navigation.navigate('WalkthroughScreen')}
//               style={{
//                   position: 'relative',
//                   left: 15,
//                   paddingVertical: 10
//                   // marginTop: moderateScale(10)
//               }}>
//               <Image
//                   style={styles.tinyLogo}
//                   source={require('../Image/backarrow.png')}
//               />
//           </TouchableOpacity>

//           <View>

//               <View style = {{
//                 width: '90%',
//                 marginLeft: '5%',
//                 flexDirection: 'row',
//                 justifyContent: 'space-between'

//               }}>
//                   <TouchableOpacity
//                       onPress={() => setSection('login')}
//                       style={{
//                           width: '45%',
//                           height: 50,
//                           backgroundColor: '#E0E0E0',
//                           elevation: 2,
//                           borderRadius: 12,
//                           justifyContent: 'center',
//                           alignItems: 'center',
//                       }}
//                   >
//                       <Text style={section == 'login' ? withBorder : withoutBorder}>
//                           Individual
//                       </Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                       onPress={() => setSection('signup')}
//                       style={{
//                           width: '45%',
//                           height: 50,
//                           backgroundColor: '#E0E0E0',
//                           borderRadius: 12,
//                           elevation: 2,
//                           justifyContent: 'center',
//                           alignItems: 'center'
//                       }}
//                   >
//                       <Text style={section == 'signup' ? withBorder : withoutBorder}>
//                           Business
//                       </Text>
//                   </TouchableOpacity>
//               </View>

//           </View>
//           <View>
//               {section == 'signup' ? <BusinessRegister /> : null}
//               {section == 'login' ? <IndivisualRegister /> : null}

//           </View>

//       </ScrollView>
//   )
// };

// export default ThroughRegister;

// const styles = StyleSheet.create({
//     tinyLogo: {
//         width: 25,
//         height: 25,

//     },
// })

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const ThroughRegister = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../assets/images/back.png')}
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('IndivisualRegister')}
        style={{
          alignItems: 'center',
          width: '90%',
          height: 50,
          marginLeft: '5%',
          backgroundColor: '#DFE6FD',
          justifyContent: 'center',
          borderRadius: 8,
        }}>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: '#6180F4',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '700',
          }}>
          Individual
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('FirstStepBusinessRegister')}
        style={{
          marginTop: 20,
          alignItems: 'center',
          width: '90%',
          height: 50,
          marginLeft: '5%',
          backgroundColor: '#DFE6FD',
          justifyContent: 'center',
          borderRadius: 8,
        }}>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: '#6180F4',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '700',
          }}>
          Business
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default ThroughRegister;

const styles = StyleSheet.create({});
