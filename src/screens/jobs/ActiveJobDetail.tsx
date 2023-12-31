import React, {FC, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Divider} from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import moment from 'moment';

// helpers
import {appstyle, colors, fonts} from '../../theme';

//icons

import {AntDesign, Entypo, IonIcons} from '../../theme/icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {CustomInput, Title} from '../../components';

const contractType = ['', 'Fixed', 'Hourly'];

const ActiveJobDetail: FC = ({route}: any) => {
  const navigation = useNavigation();

  const {item} = route.params;

  const [isExpanded, setIsExpanded] = useState(false);
  const heightProgress = useSharedValue(150);

  const handleViewMore = () => {
    setIsExpanded(!isExpanded);
    heightProgress.value = withTiming(isExpanded ? 150 : 300);
  };

  const rStyle = useAnimatedStyle(() => {
    return {height: heightProgress.value};
  });

  // console.log(item);

  return (
    <SafeAreaView style={styles.container}>
      <Title title="Active Job Details" />
      <ScrollView contentContainerStyle={{margin: 10}}>
        <View style={styles.cardContainer}>
          <Animated.View style={[rStyle, {overflow: 'hidden'}]}>
            <Text style={{fontSize: 18, fontFamily: fonts.medium}}>
              {item.jobName}
            </Text>

            <View style={{width: '80%'}}>
              <Text style={styles.headertext}>{item.fullName}</Text>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  fontSize: 12,
                }}>
                email : {item.email}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  fontSize: 12,
                }}>
                Cost : {item.amount} AEDs
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                margin: 10,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesign name="clockcircleo" size={10} style={styles.icon} />
                <Text style={{fontFamily: fonts.regular, fontSize: 12}}>
                  {moment(item.createdAt).format('lll')}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Entypo name="location-pin" size={10} style={styles.icon} />
                <Text style={{fontFamily: fonts.regular, fontSize: 12}}>
                  {item.location}, {item.countryName}
                </Text>
              </View>
            </View>
            <View style={{marginTop: 20}}>
              <Divider />
            </View>
            <View style={{marginTop: 20}}>
              <Text style={{fontSize: 14, fontFamily: fonts.semibold}}>
                Job Description
              </Text>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  marginTop: 10,
                  fontSize: 12,
                  color: '#1E202B',
                }}>
                {item.jobDescription}
              </Text>
            </View>
          </Animated.View>

          <TouchableOpacity
            style={{alignItems: 'flex-end', padding: 5}}
            onPress={handleViewMore}>
            <Text
              style={{
                color: colors.primary,
                fontFamily: fonts.regular,
                fontSize: 12,
              }}>
              {isExpanded ? 'View Less' : 'View More'}
            </Text>
          </TouchableOpacity>
        </View>

        {item.contractType == 2 && (
          <View style={{}}>
            <View style={{marginTop: 15}}>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  color: '#4F4F4F',
                  fontSize: 16,
                }}>
                Hourly Rate
              </Text>
              <View
                style={{
                  padding: 15,
                  marginTop: 10,
                  borderRadius: 12,
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 0.5,
                  borderColor: '#4f4f4f',
                }}>
                <TextInput
                  placeholder="100 AEDs"
                  placeholderTextColor="#333333"
                  style={{}}
                  editable={false}
                  value={item.amount}
                />
                <Text
                  style={{
                    color: '#333333',
                    padding: 10,
                    fontFamily: fonts.regular,
                    position: 'absolute',
                    right: 10,
                  }}>
                  /hr
                </Text>
              </View>
            </View>
            <CustomInput
              label={`${adminPercentage}% Torsin Fee`}
              value={item.torsinRate}
              editable={false}
              containerStyle={{marginTop: 15}}
            />
            <CustomInput
              label="Grand Total"
              editable={false}
              value={item.receivedAmount}
              containerStyle={{marginTop: 15}}
            />
            <Divider style={{marginTop: 15}} />
            <View style={{marginTop: 15}}>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  color: '#4F4F4F',
                  fontSize: 16,
                }}>
                End Date
              </Text>
              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <FontAwesome
                  name={item.endDate == 1 ? 'dot-circle-o' : 'circle-o'}
                  color={item.endDate == 1 ? colors.primary : '#E0E0E0'}
                  size={24}
                />
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    color: '#4F4F4F',
                    marginLeft: 10,
                    fontSize: 16,
                  }}>
                  Undefined
                </Text>
              </Pressable>

              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <FontAwesome
                  name={item.endDate == 2 ? 'dot-circle-o' : 'circle-o'}
                  color={item.endDate == 2 ? colors.primary : '#E0E0E0'}
                  size={24}
                />

                <Text
                  style={{
                    fontFamily: fonts.regular,
                    color: '#4F4F4F',
                    marginLeft: 10,
                    fontSize: 16,
                  }}>
                  Specific Date
                </Text>
              </Pressable>
            </View>

            {item.endDate == 2 && (
              <>
                <CustomInput
                  label="Specified Date"
                  value={item.specificDate}
                  containerStyle={{marginTop: 10}}
                />
                <Divider style={{marginTop: 10}} />
              </>
            )}
          </View>
        )}

        <View style={styles.cardContainer}>
          <Text
            style={{
              fontFamily: fonts.semibold,
              color: colors.primary,
              textAlign: 'center',
              fontSize: 16,
            }}>
            Contract
          </Text>

          <CustomInput
            placeholder=""
            value={contractType[item.contractType]}
            label="Contract Type"
            editable={false}
            containerStyle={{marginTop: 15}}
          />

          {item.ismilestone == 2 &&
            item.milestoneData.length > 0 &&
            item.milestoneData.map((a: any, b: number) => (
              <View key={b.toString()} style={{marginTop: 10}}>
                <Text style={{fontFamily: fonts.medium, fontSize: 16}}>
                  Milestones
                </Text>

                <View
                  style={{
                    borderWidth: 0.5,
                    borderColor: '#BDBDBD',
                    padding: 10,
                    borderRadius: 12,
                    marginTop: 20,
                  }}>
                  <CustomInput
                    placeholder="Enter name"
                    label="Milestone name"
                    value={a.name}
                    editable={false}
                    containerStyle={{marginTop: 10}}
                  />

                  <CustomInput
                    label="Start Date"
                    placeholder=""
                    editable={false}
                    value={a.startDate}
                    containerStyle={{marginTop: 10}}
                  />

                  <CustomInput
                    label="End Date"
                    value={a.endDate}
                    placeholder=""
                    editable={false}
                    containerStyle={{marginTop: 10}}
                  />

                  <CustomInput
                    placeholder="$ Enter amount"
                    label="Milestone Price"
                    value={`${a.price}`}
                    editable={false}
                    containerStyle={{marginTop: 10}}
                  />
                </View>
              </View>
            ))}

          {item.isMileStone == 1 && (
            <View
              style={{
                borderWidth: 0.5,
                borderColor: '#BDBDBD',
                padding: 10,
                borderRadius: 12,
                marginTop: 20,
                backgroundColor: colors.white,
              }}>
              <View style={styles.innerFix}>
                <Text
                  style={{
                    color: '#4F4F4F',
                    fontSize: 16,
                    fontFamily: fonts.regular,
                  }}>
                  Milestone Price
                </Text>
                <Text
                  style={{
                    color: '#828282',
                    fontFamily: fonts.regular,
                  }}>
                  $ {item.amount}
                </Text>
              </View>
              <View style={styles.innerFix}>
                <Text
                  style={{
                    color: '#4F4F4F',
                    fontSize: 16,
                    fontFamily: fonts.regular,
                  }}>
                  5% Torsin fee
                </Text>
                <Text
                  style={{
                    color: '#828282',
                    fontFamily: fonts.regular,
                  }}>
                  $ {item.torsinRate}
                </Text>
              </View>
              <View style={styles.innerFix}>
                <Text style={{fontSize: 16, fontFamily: fonts.semibold}}>
                  Grand Total
                </Text>
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 16,
                    fontFamily: fonts.semibold,
                  }}>
                  $ {item.recievedAmount}
                </Text>
              </View>
            </View>
          )}

          {item.isMileStone == 2 && (
            <View style={{padding: 5, backgroundColor: 'white'}}>
              <View
                style={{
                  borderWidth: 0.5,
                  borderColor: '#BDBDBD',
                  padding: 10,
                  borderRadius: 12,
                  marginTop: 20,
                  backgroundColor: colors.white,
                }}>
                <View style={styles.innerFix}>
                  <Text
                    style={{
                      color: '#4F4F4F',
                      fontSize: 16,
                      fontFamily: fonts.regular,
                    }}>
                    Milestone Price
                  </Text>
                  <Text
                    style={{
                      color: '#828282',
                      fontFamily: fonts.regular,
                    }}>
                    $ {item.amount}
                  </Text>
                </View>
                <View style={styles.innerFix}>
                  <Text
                    style={{
                      color: '#4F4F4F',
                      fontSize: 16,
                      fontFamily: fonts.regular,
                    }}>
                    5% Torsin fee
                  </Text>
                  <Text
                    style={{
                      color: '#828282',
                      fontFamily: fonts.regular,
                    }}>
                    $ {item.torsinRate}
                  </Text>
                </View>
                <View style={styles.innerFix}>
                  <Text style={{fontSize: 16, fontFamily: fonts.semibold}}>
                    Grand Total
                  </Text>
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 16,
                      fontFamily: fonts.semibold,
                    }}>
                    $ {item.recievedAmount}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* {item.status == 4 && ( )} */}
        <View>
          <Pressable
            onPress={() => {
              navigation.navigate('ChatUser', {item});
            }}
            style={{
              ...appstyle.shadow,
              marginTop: 10,
              padding: 15,
              margin: 5,
              flexDirection: 'row',
              borderRadius: 15,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#D6DFFF',
                padding: 15,
                borderRadius: 100,
              }}>
              <AntDesign
                name="star"
                size={30}
                style={{color: colors.primary}}
              />
            </View>
            <View
              style={{
                width: '80%',
              }}>
              <Text style={{fontFamily: fonts.medium, fontSize: 16}}>
                Chats
              </Text>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  marginTop: 5,
                  fontSize: 10,
                  opacity: 0.8,
                  color: '#1E202B',
                  lineHeight: 15,
                }}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Blanditiis labore iusto velit aspernatur deleniti necessitatibus
                molestias ad, dolores nisi harum placeat quis consequuntur hic
                libero laboriosam nam iste, ipsam accusantium.
              </Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('Complaints')}
            style={{
              ...appstyle.shadow,
              marginTop: 10,
              padding: 15,
              margin: 5,
              flexDirection: 'row',
              borderRadius: 15,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#D6DFFF',
                padding: 15,
                borderRadius: 100,
              }}>
              <IonIcons
                name="md-shield-checkmark"
                size={30}
                style={{color: colors.primary}}
              />
            </View>
            <View
              style={{
                width: '80%',
              }}>
              <Text style={{fontFamily: fonts.medium, fontSize: 16}}>
                Report a problems
              </Text>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  marginTop: 5,
                  fontSize: 10,
                  opacity: 0.8,
                  color: '#1E202B',
                  lineHeight: 15,
                }}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Blanditiis labore iusto velit aspernatur deleniti necessitatibus
                molestias ad, dolores nisi harum placeat quis consequuntur hic
                libero laboriosam nam iste, ipsam accusantium.
              </Text>
            </View>
          </Pressable>
        </View>

        {/* <Pressable
          style={{
            padding: 15,
            backgroundColor: colors.primary,
            borderRadius: 12,
            marginTop: 20,
          }}>
          <Text
            style={{
              fontFamily: fonts.bold,
              color: colors.white,
              fontSize: 14,
              textAlign: 'center',
            }}>
            Request Payment
          </Text>
        </Pressable> */}

        <View style={{marginTop: 50}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFF',
  },
  cardContainer: {
    ...appstyle.shadow,
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'white',
    marginTop: 10,
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
    color: colors.black,
    fontSize: 12,
    justifyContent: 'center',
  },
  icon: {
    right: 2,
  },
  innerImage: {
    width: 86,
    height: 86,
    borderRadius: 5,
    margin: 5,
  },
  innerFix: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default ActiveJobDetail;
const json = {
  amount: 600,
  clientId: 191,
  contractDesc: 'okay test it  and take a look at the contract details ',
  contractId: 'a487d347-6e62-4097-85ec-58a6495694a6',
  contractType: 1,
  countryName: 'India',
  createdAt: '2023-09-08T11:11:22.420680Z',
  email: 'webclient@yopmail.com',
  endDate: 1,
  fullName: 'Web client',
  image: [],
  ismilestone: 2,
  jobDescription:
    'here we are testing the payment details again & again to fix all the issues and get the proper details ',
  jobId: 243,
  jobName: 'Third time payment check ',
  location: 'New Delhi',
  milestoneData: [
    {
      endDate: '2023-09-09',
      milestoneId: 58,
      name: 'M1',
      price: 200,
      startDate: '2023-09-08',
      status: 4,
    },
    {
      endDate: '2023-09-29',
      milestoneId: 59,
      name: 'M2',
      price: 400,
      startDate: '2023-09-22',
      status: 2,
    },
  ],
  profileImage: null,
  recievedAmount: 552,
  specificDate: null,
  status: 1,
  timeDuration: 0,
  torsinRate: 48,
};
