import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {Divider} from 'react-native-paper';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import moment from 'moment';

// helpers
import {appstyle, colors, fonts} from '../../theme';

//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {CustomInput, Title} from '../../components';
import {useAppSelector} from '../../hooks';

const contractType = ['', 'Hourly', 'Fixed'];

const OldJobDetail = ({route}: any) => {
  const {item} = route.params;
  const navigation = useNavigation();

  const {loading} = useAppSelector(state => state.job);

  const ref = useRef(null);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleViewMore = () => {
    if (ref.current) {
      //@ts-ignore
      ref.current.scrollTo({y: 0, animated: true});
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isExpanded ? 0 : 1),
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Title title="Past Job Details" />

      {loading && (
        <View
          style={{
            marginTop: 10,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <ActivityIndicator color={colors.white} style={{}} />
        </View>
      )}

      <ScrollView contentContainerStyle={{margin: 15}}>
        <View style={styles.cardContainer}>
          {isExpanded ? (
            <Animated.View style={{}}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: fonts.medium,
                }}>
                {item.jobName}
              </Text>

              <View style={{width: '80%', marginTop: 10}}>
                <Text style={styles.headertext}>{item.fullName}</Text>
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    fontSize: 12,
                    marginTop: 5,
                  }}>
                  email : {item.email}
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    fontSize: 12,
                    marginTop: 5,
                  }}>
                  Cost : ${item.amount}
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
                  <AntDesign
                    name="clockcircleo"
                    size={10}
                    style={styles.icon}
                  />
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
                    lineHeight: 20,
                    marginTop: 10,
                    fontSize: 12,
                    color: '#1E202B',
                  }}>
                  {item.jobDescription}
                </Text>
              </View>
            </Animated.View>
          ) : (
            <Animated.View style={[{}, animatedStyle]}>
              <Text
                style={{fontSize: 18, fontFamily: fonts.medium, padding: 5}}>
                {item.jobName}
              </Text>

              <View style={{width: '80%', margin: 5}}>
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
                  Cost : ${item.amount}
                </Text>
              </View>
            </Animated.View>
          )}

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
                  placeholder="$100"
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
              label="5% Torsin Fee"
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
            item.milestoneData.map((a: any, b: number) => {
              const settleStatus = item.status == 2;

              const activateStatus = item.status !== 0;

              return (
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
              );
            })}

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
                  $ {item.receivedAmount}
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
                    $ {item.receivedAmount}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>

        <Divider style={{margin: 5, marginTop: 20}} />

        <View>
          <Pressable
            onPress={() => navigation.navigate('RatingReview', {item})}
            style={{
              ...appstyle.shadow,
              marginTop: 20,
              padding: 10,
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
                Add Rating & Review
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
              padding: 10,
              margin: 10,
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
              <Ionicons
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

          <Pressable
            onPress={() => {
              navigation.navigate('ChatUser', {item});
            }}
            style={{
              ...appstyle.shadow,
              marginTop: 10,
              padding: 10,
              margin: 10,
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
              <MaterialCommunityIcons
                name="message-reply-text-outline"
                size={30}
                style={{color: colors.primary}}
              />
            </View>
            <View
              style={{
                width: '80%',
              }}>
              <Text style={{fontFamily: fonts.medium, fontSize: 16}}>
                Chat History
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

export default OldJobDetail;
