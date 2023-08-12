import React, {FC} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';

// icons
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

// helpers
import {appstyle, colors, fonts} from '../../theme';
import {CustomButton, Title} from '../../components';
import {useAppSelector} from '../../hooks';

interface ProposalDetailProp {
  route: any;
}

const HelpDetails: FC<ProposalDetailProp> = ({}) => {
  const navigation = useNavigation();

  const {loading} = useAppSelector(state => state.user);

  const {
    params: {item},
  } = useRoute();

  const renderButtons = () => {
    if (item.status === 2) {
      return (
        <View style={styles.button}>
          <CustomButton
            disabled
            title="Chat Now"
            onPress={() => {
              navigation.navigate('ChatCard', {item});
            }}
          />
        </View>
      );
    } else if (item.status === 4) {
      return (
        <View style={styles.button}>
          <CustomButton
            disabled
            title="Old Chat"
            onPress={() => {
              navigation.navigate('ChatUser', {item});
            }}
          />
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title title="Job Details" />
      {loading && <ActivityIndicator />}
      <ScrollView>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Ticket No : #{item.ticketId}</Text>
          <Text style={styles.cardSubtitle}>
            Topic Name: <Text style={styles.description}>{item.topicName}</Text>
          </Text>
          <Divider style={styles.divider} />
          <Text style={styles.sectionTitle}>Job Description</Text>
          <Text style={styles.descriptionText}>{item.description}</Text>
          <Divider style={styles.divider} />
          {renderButtons()}
        </View>
        {item.status === 3 && (
          <View style={[styles.cardContainer, {marginTop: 20}]}>
            <Text style={[styles.sectionTitle, {bottom: 20}]}>
              Reason for Rejection
            </Text>
            <Text style={[styles.descriptionText, {bottom: 20}]}>
              {item.reason}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  headerText: {
    fontFamily: fonts.medium,
    fontSize: 16,
  },
  cardContainer: {
    ...appstyle.shadow,
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'white',
    margin: 10,
    marginTop: 20,
  },
  cardTitle: {
    fontFamily: fonts.medium,
    fontSize: 18,
    paddingVertical: 5,
  },
  cardSubtitle: {
    color: colors.primary,
    fontFamily: fonts.medium,
    paddingVertical: 5,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  detailsItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  detailsText: {
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  divider: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: fonts.semibold,
    marginTop: 20,
  },
  descriptionText: {
    fontFamily: fonts.regular,
    lineHeight: 20,
    marginTop: 10,
    fontSize: 12,
    color: '#1E202B',
  },
  description: {
    fontFamily: fonts.regular,
    color: colors.grey2,
    marginTop: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default HelpDetails;
