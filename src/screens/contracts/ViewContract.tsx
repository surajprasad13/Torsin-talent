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
  getContractDetail,
  updateContract,
} from '../../redux/actions/userAction';

const contractType = ['', 'Hourly', 'Fixed'];

enum EndDate {
  undefined = 'undefined',
  specified = 'specified',
}

const ViewContract = ({route}: any) => {
  const {id} = route.params;

  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {} = useAppSelector(state => state.auth);
  const {contractDetail, loading} = useAppSelector(state => state.user);

  const [endDate, setEndDate] = useState<EndDate>(EndDate.undefined);

  const [rate, setRate] = useState('');

  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      dispatch(getContractDetail(id));
      console.log(contractDetail);
    });
    return listener;
  }, []);

  useEffect(() => {
    dispatch(getContractDetail(id));
  }, []);

  const onPressAccept = () => {
    dispatch(
      updateContract({
        id: contractDetail.contract_details[0].contract_id,
        inputs: {
          status: 1,
        },
      }),
    );
  };

  const onPressReject = () => {
    dispatch(
      updateContract({
        id: contractDetail.contract_details[0].contract_id,
        inputs: {
          status: 2,
        },
      }),
    );
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
            value={contractDetail.talent_details[0].email}
            label="Talent-email-address"
            editable={false}
          />
          <Text>{contractDetail.talent_details.email}</Text>
          <View style={{marginTop: 15}}>
            <CustomInput
              value={contractDetail.job_details[0].jobName}
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
                value={contractDetail.contract_details[0].desc}
                editable={false}
                onChangeText={(text: string) => setDescription(text)}
              />
            </View>

            <CustomInput
              placeholder=""
              value={
                contractType[contractDetail.contract_details[0].contract_type]
              }
              label="Contract Type"
              editable={false}
              containerStyle={{marginTop: 15}}
            />
            <Divider style={{marginTop: 10}} />
          </View>

          <View>
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
                  value={rate}
                  onChangeText={text => {
                    setRate(text);
                  }}
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
              value="15"
              containerStyle={{marginTop: 15}}
            />
            <CustomInput
              label="Grand Total"
              value="100"
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
                    contractDetail.contract_details[0].end_date == 1
                      ? 'dot-circle-o'
                      : 'circle-o'
                  }
                  color={
                    contractDetail.contract_details[0].end_date == 1
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
                    contractDetail.contract_details[0].end_date == 2
                      ? 'dot-circle-o'
                      : 'circle-o'
                  }
                  color={
                    contractDetail.contract_details[0].end_date == 2
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

            {contractDetail.contract_details[0].end_date == 2 && (
              <>
                <CustomInput
                  label="Specified Date"
                  value=""
                  containerStyle={{marginTop: 10}}
                />
                <Divider style={{marginTop: 10}} />
              </>
            )}
          </View>
        </View>

        {contractDetail.contract_details[0].contract_type == 2 && (
          <View style={{margin: 10, padding: 5, backgroundColor: 'white'}}>
            <CustomInput placeholder="$" label="Amount" value="" />

            <View style={{marginTop: 10}}>
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
                  editable={false}
                  containerStyle={{marginTop: 10}}
                />

                <CustomInput
                  label="Start Date"
                  placeholder=""
                  editable={false}
                  containerStyle={{marginTop: 10}}
                />

                <CustomInput
                  label="End Date"
                  placeholder=""
                  editable={false}
                  containerStyle={{marginTop: 10}}
                />

                <CustomInput
                  placeholder="$ Enter amount"
                  label="Milestone Price"
                  editable={false}
                  containerStyle={{marginTop: 10}}
                />
              </View>
            </View>
          </View>
        )}
        {contractDetail.contract_details[0].status == 0 && (
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
