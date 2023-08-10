import React, {FC, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Divider} from 'react-native-paper';
import {CustomButton, Title} from '../../components';

import {appstyle, colors, fonts} from '../../theme';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {TicketList} from '../../redux/actions/userAction';

interface ProposalDetailProp {
  route: any;
}

const HelpDetails: FC<ProposalDetailProp> = ({route}) => {
  const {id} = route.params;
  const dispatch = useAppDispatch();

  const {ticket: item, loading} = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(TicketList(Number(id)));
  }, []);

  

  const renderButtons = () => {
    if (item.status === 2) {
      return (
        <View style={styles.button}>
          <CustomButton title="Chat Now" onPress={() => {}} />
        </View>
      );
    } else if (item.status === 4) {
      return (
        <View style={styles.button}>
          <CustomButton title="Old Chat" onPress={() => {}} />
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title title="Job Details" />
      <ScrollView>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Ticket No : #0035</Text>
          <Text style={styles.cardSubtitle}>
            Name: <Text style={styles.description}>Talent Name</Text>
          </Text>
          <Text style={styles.cardSubtitle}>
            User: <Text style={styles.description}>Talent User</Text>
          </Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailsItem}>
              <AntDesign name="clockcircleo" size={20} style={styles.icon} />
              <Text style={styles.detailsText}>06/06/2006</Text>
            </View>
            <View style={styles.detailsItem}>
              <Entypo name="location-pin" size={20} style={styles.icon} />
              <Text style={styles.detailsText}>Noida, India</Text>
            </View>
          </View>
          <Divider style={styles.divider} />
          <Text style={styles.sectionTitle}>Job Description</Text>
          <Text style={styles.descriptionText}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit
            magni error facilis placeat necessitatibus dolores debitis,
            laboriosam, voluptate porro quibusdam tempore vero. Quas alias esse
            explicabo odit debitis, non obcaecati.
          </Text>
          <Divider style={styles.divider} />
          {renderButtons()}
        </View>
        {/* {status === 2 && (
          <View style={[styles.cardContainer, {marginTop: 20}]}>
            <Text style={[styles.sectionTitle, {bottom: 20}]}>
              Reason for Rejection
            </Text>
            <Text style={[styles.descriptionText, {bottom: 20}]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              perspiciatis labore ab commodi, ut ducimus id accusamus similique
              corrupti voluptas possimus necessitatibus culpa quibusdam
              voluptatem quia. Odio molestias aut rerum.
            </Text>
          </View>
        )} */}
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
