import React, {FC} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

// icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// helpers
import {colors, fonts, appstyle} from '../../../theme';
import {
  NotificationEnumType,
  NotificationItem,
} from '../../../types/notification';
import {DrawerScreenParamaList} from '../../../routes/RouteType';
import {DrawerNavigationProp} from '@react-navigation/drawer';

interface NotificationCardProp {
  item: NotificationItem;
}

const NotificationCard: FC<NotificationCardProp> = ({item}) => {
  const navigation = useNavigation();

  const onPress = () => {
    switch (item.type) {
      case NotificationEnumType.Contract_detail:
        navigation.navigate('ContractNavigator', {
          screen: 'ViewContract',
          params: {
            contractId: item.renderId,
          },
        });
        break;
      case NotificationEnumType.Proposal_Sent_By_Talent:
        navigation.navigate('ProposalNavigator', {
          screen: 'ProposalDetail',
          params: {
            proposalId: item.renderId,
          },
        });
        break;
      default:
        break;
    }
  };

  return (
    <View style={{}}>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 12,
            backgroundColor: '#d4d9f7',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Ionicons
            name="notifications-circle"
            size={30}
            color={colors.primary}
          />
        </View>
        <View style={{width: '80%'}}>
          <Text
            style={{
              fontFamily: fonts.semibold,
              color: '#333333',
              fontSize: 14,
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              fontFamily: fonts.regular,
              color: '#4F4F4F',
            }}>
            {item.description}
          </Text>
          <View style={[appstyle.rowBetween]}>
            <Text style={{fontFamily: fonts.regular, color: '#4F4F4F'}}>
              {item.senderName}
            </Text>
            <Text style={{fontFamily: fonts.regular, color: '#BDBDBD'}}>
              {moment(item.createdAt).format('lll')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 15,
    ...appstyle.rowBetween,
  },
});

export default NotificationCard;
