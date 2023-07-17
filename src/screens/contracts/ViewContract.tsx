/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';

//components
import {CustomInput, Title} from '../../components';
import {appstyle, colors, fonts} from '../../theme';

//icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

// helpers
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  getContractDetail,
  updateContract,
} from '../../redux/actions/userAction';

const contractType = ['', 'Hourly', 'Fixed'];

const ViewContract = ({route}: any) => {
  const {id} = route.params;

  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {} = useAppSelector(state => state.auth);
  const {contractDetail, loading} = useAppSelector(state => state.user);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      dispatch(getContractDetail(id));
    });
    return () => listener;
  }, []);

  useEffect(() => {
    dispatch(getContractDetail(id));
  }, []);

  console.log(contractDetail, 'success');

  const onPressAccept = () => {
    dispatch(
      updateContract({
        id: contractDetail.contractDetails.contractId,
        inputs: {
          status: 1,
        },
      }),
    );
    dispatch(getContractDetail(id));
  };

  const onPressReject = () => {
    dispatch(
      updateContract({
        id: contractDetail.contractDetails.contractId,
        inputs: {
          status: 2,
        },
      }),
    );
    dispatch(getContractDetail(id));
  };

  if (loading || contractDetail == null) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Title title="Contract Details" />

      {loading && <ActivityIndicator />}

      <ScrollView>
        {/* Section 1 */}

        <View style={{margin: 10, padding: 5, backgroundColor: 'white'}}>
          <CustomInput
            value={contractDetail.talentDtails.email}
            label="Talent-email-address"
            editable={false}
          />
          <Text>{contractDetail.talentDetails.email}</Text>
          <View style={{marginTop: 15}}>
            <CustomInput
              value={contractDetail.jobDetails.jobName}
              label="Project Name"
              editable={false}
            />
          </View>

          <View style={{marginTop: 20}}>
            <Text
              style={{
                fontFamily: fonts.regular,
                color: '#4F4F4F',
                fontSize: 16,
              }}>
              Description
            </Text>
            <View
              style={{
                width: '100%',
                height: 170,
                borderWidth: 1,
                borderRadius: 8,
                backgroundColor: colors.white,
                borderColor: '#BDBDBD',
                marginTop: 10,
              }}>
              <TextInput
                placeholder="Write short description about contract..."
                multiline={true}
                placeholderTextColor="#333333"
                maxLength={500}
                style={{padding: 15}}
                value={contractDetail.contractDetails.description}
                editable={false}
              />
            </View>

            <CustomInput
              placeholder=""
              value={contractType[contractDetail.contractDetails.contractType]}
              label="Contract Type"
              editable={false}
              containerStyle={{marginTop: 15}}
            />
            <Divider style={{marginTop: 10}} />
          </View>

          {contractDetail.contractDetails.contractType == 2 && (
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
                    value={contractDetail.contractDetails.amount}
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
                value={contractDetail.contractDetails.torsinRate}
                editable={false}
                containerStyle={{marginTop: 15}}
              />
              <CustomInput
                label="Grand Total"
                editable={false}
                value={contractDetail.contractDetails.receivedAmount}
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
                    name={
                      contractDetail.contractDetails.endDate == 1
                        ? 'dot-circle-o'
                        : 'circle-o'
                    }
                    color={
                      contractDetail.contractDetails.endDate == 1
                        ? colors.primary
                        : '#E0E0E0'
                    }
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
                    name={
                      contractDetail.contractDetails.endDate == 2
                        ? 'dot-circle-o'
                        : 'circle-o'
                    }
                    color={
                      contractDetail.contractDetails.endDate == 2
                        ? colors.primary
                        : '#E0E0E0'
                    }
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

              {contractDetail.contractDetails.endDate == 2 && (
                <>
                  <CustomInput
                    label="Specified Date"
                    value={contractDetail.contractDetails.specificDate}
                    containerStyle={{marginTop: 10}}
                  />
                  <Divider style={{marginTop: 10}} />
                </>
              )}
            </View>
          )}
        </View>

        {contractDetail.contractDetails.contractType == 1 && (
          <View style={{margin: 10, padding: 5, backgroundColor: 'white'}}>
            <CustomInput
              placeholder="$"
              label="Amount"
              value={contractDetail.contractDetails.amount}
            />

            {contractDetail.contractDetails.ismilestone == 1 && (
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
                    $ {contractDetail.contractDetails.amount}
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
                    $ {contractDetail.contractDetails.torsinRate}
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
                    $ {contractDetail.contractDetails.receivedAmount}
                  </Text>
                </View>
              </View>
            )}

            {contractDetail.contractDetails.ismilestone == 2 &&
              contractDetail.milestoneData.length > 0 &&
              contractDetail.milestoneData.map((a, b) => (
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
          </View>
        )}

        {contractDetail.contractDetails.ismilestone == 2 && (
          <View style={{margin: 10, padding: 5, backgroundColor: 'white'}}>
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
                  $ {contractDetail.contractDetails.amount}
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
                  $ {contractDetail.contractDetails.torsinRate}
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
                  $ {contractDetail.contractDetails.receivedAmount}
                </Text>
              </View>
            </View>
          </View>
        )}

        {contractDetail.contractDetails.status == 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 20,
              bottom: 10,
            }}>
            <Pressable
              onPress={onPressReject}
              style={{
                ...appstyle.shadow,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                width: '40%',
                borderRadius: 15,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  backgroundColor: colors.red,
                  borderRadius: 100,
                  right: 10,
                }}>
                <Feather name="x" size={20} color={colors.white} />
              </View>
              <Text style={{color: colors.red}}>Reject</Text>
            </Pressable>

            <Pressable
              onPress={onPressAccept}
              style={{
                ...appstyle.shadow,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                width: '40%',
                borderRadius: 15,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  backgroundColor: 'green',
                  borderRadius: 100,
                  right: 10,
                }}>
                <Feather name="check" size={20} color={colors.white} />
              </View>
              <Text style={{color: colors.blue}}>Accept</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbff',
  },
  fixContainer: {
    marginTop: 20,
  },
  dateContainer: {
    padding: 10,
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#BDBDBD',
  },
  innerFix: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default ViewContract;
