/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
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
  getAdminPercentage,
  getContractDetail,
  updateContract,
} from '../../redux/actions/userAction';
import {Contract} from '../../types/contract';
import {interestAmount} from '../../utils';

const contractType = ['', 'Hourly', 'Fixed'];

const ViewContract = ({route}: any) => {
  const {id} = route.params;

  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {} = useAppSelector(state => state.auth);
  const {contractDetail, loading, adminPercentage} = useAppSelector(
    state => state.user,
  );

  const [contract, setContract] = useState<Contract | null>(contractDetail);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      dispatch(getContractDetail(id));
    });
    return () => listener;
  }, []);

  useEffect(() => {
    dispatch(getContractDetail(id));
  }, []);

  useEffect(() => {
    dispatch(getAdminPercentage(''));
  }, []);


  const onPressAccept = () => {
    dispatch(
      updateContract({
        id: contract?.contractId,
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
        id: contract?.contractId,
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

      <ScrollView style={{}}>
        <View style={{margin: 10, padding: 5}}>
          <CustomInput
            value={contract?.talentEmail}
            label="Talent-email-address"
            editable={false}
          />

          <CustomInput
            value={contract?.jobName}
            label="Project Name"
            editable={false}
            containerStyle={{marginTop: 15}}
          />

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
                value={contract?.description}
                editable={false}
              />
            </View>

            <CustomInput
              placeholder=""
              value={contractType[contract?.contractType as number]}
              label="Contract Type"
              editable={false}
              containerStyle={{marginTop: 15}}
            />
            <Divider style={{marginTop: 10}} />
          </View>

          {contract?.contractType == 2 && (
            <View style={{}}>
              <CustomInput
                label="Duration"
                editable={false}
                containerStyle={{marginTop: 15}}
                value={String(Math.round(contract?.timeDuration))}
              />

              <CustomInput
                placeholder="$100"
                label="Hourly Rate"
                placeholderTextColor="#333333"
                editable={false}
                value={'$' + contract?.amount}
                containerStyle={{marginTop: 10}}
              />

              <CustomInput
                label={`${adminPercentage}% Torsin Fee`}
                value={String(
                  '$' +
                    interestAmount(
                      contract?.amount,
                      contract?.timeDuration,
                      contract?.torsinRate,
                    ),
                )}
                editable={false}
                containerStyle={{marginTop: 15}}
              />

              <CustomInput
                label="Grand Total"
                editable={false}
                value={'$' + contract?.receivedAmount}
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
                    name={contract?.endDate == 1 ? 'dot-circle-o' : 'circle-o'}
                    color={contract?.endDate == 1 ? colors.primary : '#E0E0E0'}
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
                    name={contract?.endDate == 2 ? 'dot-circle-o' : 'circle-o'}
                    color={contract?.endDate == 2 ? colors.primary : '#E0E0E0'}
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

              {contract?.endDate == 2 && (
                <>
                  <CustomInput
                    label="Specified Date"
                    value={String(moment(contract?.specificDate).format('lll'))}
                    containerStyle={{marginTop: 10}}
                  />
                  <Divider style={{marginTop: 10}} />
                </>
              )}
            </View>
          )}
        </View>

        {contract?.contractType == 1 && (
          <View style={{margin: 10, padding: 5, backgroundColor: 'white'}}>
            <CustomInput
              placeholder="$"
              label="Amount"
              value={String(contract?.amount)}
            />

            {contract?.ismilestone == 1 && (
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
                    $ {contract?.amount}
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
                    $ {contract?.torsinRate}
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
                    $ {contract?.receivedAmount}
                  </Text>
                </View>
              </View>
            )}

            {contract?.ismilestone == 2 &&
              contract?.milestoneData.length > 0 &&
              contract?.milestoneData.map((a: any, b: number) => (
                <View key={b.toString()} style={{marginTop: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontFamily: fonts.medium, fontSize: 16}}>
                      Milestones
                    </Text>
                    <Pressable
                      onPress={() => {
                        contract.milestoneData[b].active =
                          !contract.milestoneData[b].active;
                        setContract(prev => ({
                          ...prev,
                          ...contract,
                        }));
                      }}>
                      <Feather
                        name={a.active ? 'chevron-down' : 'chevron-up'}
                        color={colors.primary}
                        size={20}
                      />
                    </Pressable>
                  </View>

                  {a.active && (
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
                        value={a.start_date}
                        containerStyle={{marginTop: 10}}
                      />

                      <CustomInput
                        label="End Date"
                        value={a.end_date}
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
                  )}
                </View>
              ))}
          </View>
        )}

        {contract?.ismilestone == 2 && (
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
                  $ {contract?.amount}
                </Text>
              </View>
              <View style={styles.innerFix}>
                <Text
                  style={{
                    color: '#4F4F4F',
                    fontSize: 16,
                    fontFamily: fonts.regular,
                  }}>
                  {adminPercentage}% Torsin fee
                </Text>
                <Text
                  style={{
                    color: '#828282',
                    fontFamily: fonts.regular,
                  }}>
                  $ {contract.torsinRate}
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
                  $ {contract?.receivedAmount}
                </Text>
              </View>
            </View>
          </View>
        )}
        {contract?.status == 0 && (
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
    ...appstyle.rowBetween,
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
