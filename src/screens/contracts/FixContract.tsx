import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
  Keyboard,
} from 'react-native';
import {Divider} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

//icons
import Entypo from 'react-native-vector-icons/Entypo';

// components
import {CustomButton, CustomInput, Title} from '../../components';
import MilestoneCard from './components/MilestoneCard';

//helpers
import {colors, fonts} from '../../theme';
import {calculatePrice} from '../../utils';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {} from '../../redux/actions/userAction';
import {updateSuccess} from '../../redux/reducers/userSlice';
import {ContractsScreenParamList} from '../../routes/RouteType';

interface MilestoneProp {
  name: string;
  start_date: string;
  end_date: string;
  price: number;
}

type NavigationProp = StackNavigationProp<ContractsScreenParamList>;

const FixContract = ({route}: any) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();
  const {loading} = useAppSelector(state => state.user);

  const {item} = route.params;

  const [list, setList] = useState<number[]>([]);

  const [amount, setAmount] = useState('');
  const [inputs, setInputs] = useState<MilestoneProp[]>([]);

  const closePopup = () => {
    dispatch(updateSuccess());
    if (navigation.canGoBack()) {
      navigation.navigate('Contract');
    }
  };

  useEffect(() => {
    if (inputs.length >= 0) {
      if (inputs.length > 1) {
        const data = Object.values(inputs).reduce(
          (a, b) => Number(a.price) + Number(b.price),
        );
        setAmount(String(data));
      } else if (inputs.length == 1) {
        setAmount(String(inputs[0].price));
      } else {
        setAmount('');
      }
    }
  }, [inputs]);

  const validate = () => {
    Keyboard.dismiss();
    let _isValid = true;

    if (_isValid) {
      onPressSend();
    }
  };

  const onPressSend = () => {
    const data = {
      ...JSON.parse(item),
      amount: Number(amount),
      torsin_rate: calculatePrice(5, Number(amount)),
      received_amount:
        Number(amount) - Number(calculatePrice(5, Number(amount))),
      end_date: 1,
      specific_date: '',
      is_milestone: 1,
      milestone_data: inputs,
    };
    dispatch(createContract(data));
  };

  useEffect(() => {
    const listener = navigation.addListener('beforeRemove', () => {
      dispatch(updateSuccess());
    });
    return listener;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Title title="Create Contract" />
      <Modal visible={created} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 12,
              width: '90%',
            }}>
            {/* Popup Content */}
            <Pressable onPress={closePopup} style={{alignItems: 'flex-end'}}>
              <Entypo name="cross" size={15} />
            </Pressable>
            <View style={{alignItems: 'center'}}>
              <FastImage
                source={require('../../assets/images/hire.png')}
                style={{width: 50, height: 50}}
              />
            </View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontFamily: fonts.medium,
                marginTop: 10,
              }}>
              Contract Sent
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: fonts.medium,
                marginTop: 10,
              }}>
              We have emailed the contract for Music Composer app to
              user@torsion.com.
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: fonts.medium,
                marginTop: 10,
                fontSize: 16,
              }}>
              user@torsin.com.
            </Text>
            <CustomButton
              title="Close"
              disabled
              style={{marginTop: 10}}
              onPress={closePopup}
            />
          </View>
        </View>
      </Modal>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{margin: 10, padding: 5, backgroundColor: '#f9fbff', flex: 1}}>
        <View style={styles.fixContainer}>
          <CustomInput
            placeholder="$"
            label="Amount"
            value={amount}
            onChangeText={text => setAmount(text)}
          />
          <Divider style={{marginTop: 20}} />
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                textAlign: 'center',
                flex: 1,
                fontFamily: fonts.medium,
                fontSize: 16,
              }}>
              Milestones
            </Text>
            <TouchableOpacity
              onPress={() => {
                setList([...list, 1]);
                setInputs([
                  ...inputs,
                  {name: '', start_date: '', end_date: '', price: ''},
                ]);
                if (list.length == 0) {
                  setAmount('');
                }
              }}
              style={{alignItems: 'center', flexDirection: 'row'}}>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  color: colors.primary,
                }}>
                Add{' '}
              </Text>
              <Entypo
                name="circle-with-plus"
                size={18}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>

          <Divider style={{marginTop: 20}} />

          {list.map((_, index) => {
            return (
              <MilestoneCard
                key={index.toString()}
                item={inputs[index]}
                index={index}
                onPressRemove={() => {
                  setList(list.filter((a, _index) => _index !== index));
                  setInputs(inputs.filter((a, _index) => _index !== index));
                }}
                onChangeTextField={text => {
                  const name = text.replace(/[^a-zA-Z ]/g, '');
                  inputs[index].name = name;
                  setInputs([...inputs]);
                }}
                onChangePrice={text => {
                  const pattern = /^[0-9]*$/;
                  const pass = pattern.test(text);
                  if (pass) {
                    inputs[index].price = text;
                    setInputs([...inputs]);
                  }
                }}
                onChangeStartDate={text => {
                  inputs[index].start_date = text;
                  setInputs([...inputs]);
                }}
                onChangeEndDate={text => {
                  inputs[index].end_date = text;
                  setInputs([...inputs]);
                }}
              />
            );
          })}
        </View>

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
              $ {Number(amount)}
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
              $ {calculatePrice(5, Number(amount))}
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
              $ {Number(amount) - calculatePrice(5, Number(amount))}
            </Text>
          </View>
        </View>

        <CustomButton
          disabled
          title="Sent"
          loading={loading}
          onPress={validate}
          style={{marginTop: 100}}
        />
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
    padding: 8,
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#BDBDBD',
    margin: 2,
  },
  innerFix: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default FixContract;
