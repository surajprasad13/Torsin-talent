import React, {FC} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

// icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// helpers
import {colors, fonts, appstyle} from '../../../theme';
import {NotificationInterface} from '../../../types/notification';
import {DrawerScreenParamaList} from '../../../routes/RouteType';
import {DrawerNavigationProp} from '@react-navigation/drawer';

interface NotificationCardProp {
  item: NotificationInterface;
}

enum screenType {
  Contract = 1 | 2,
  Proposal = 3 | 4,
}

type NavigationProp = DrawerNavigationProp<DrawerScreenParamaList>;

const NotificationCard: FC<NotificationCardProp> = ({item}) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={{}}>
      <TouchableOpacity
        onPress={() => {
          if (item.type == 1 || item.type == 2) {
            navigation.navigate('ContractNavigator', {
              screen: 'ViewContract',
              params: {
                id: item.renderId,
              },
            });
          }
        }}
        style={styles.container}>
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
