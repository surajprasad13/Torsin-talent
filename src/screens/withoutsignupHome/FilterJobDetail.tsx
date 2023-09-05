import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {WithoutSkill} from '../../types/user';
import {colors, fonts, appstyle} from '../../theme';
import {AntDesign, Entypo} from '../../theme/icons';
import moment from 'moment';
import {Divider} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {CustomButton, GridImageView, Title} from '../../components';

const projectType = ['', 'Fixed', 'Hourly'];

const FilterJobDetail = ({route}: any) => {
  const {item} = route.params as {item: WithoutSkill};
  const navigation = useNavigation();

  const [imageVisible, setImageVisible] = useState<boolean>(false);

  const [showApplyModal, setShowApplyModal] = useState(false);

  const handleApplyForJob = () => {
    setShowApplyModal(true);
  };

  const closeModal = () => {
    setShowApplyModal(false);
  };

  const goToLogin = () => {
    setShowApplyModal(false);
    navigation.navigate('LoginScreen'); // Replace 'LoginScreen' with your actual login screen route
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title title="Job Details" />

      <ScrollView>
        <View style={styles.cardContainer}>
          <View style={{width: '80%'}}>
            <Text style={styles.headertext}>{item.jobName}</Text>
            <Text
              style={{fontFamily: fonts.regular, fontSize: 12, marginTop: 5}}>
              Project type : {projectType[item.projectType]}
            </Text>
            <Text
              style={{fontFamily: fonts.regular, fontSize: 12, marginTop: 5}}>
              Cost : {item.priceRate}
            </Text>
            <Text
              style={{fontFamily: fonts.regular, fontSize: 12, marginTop: 5}}>
              Skills Required: {item.adminService?.join(', ')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              margin: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <AntDesign name="clockcircleo" size={10} style={styles.icon} />
              <Text
                style={{fontFamily: fonts.regular, fontSize: 12}}
                numberOfLines={1}>
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
                {item.location},{item.countryName}
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

          <Divider style={{marginTop: 20}} />

          {item.photos !== null && item.photos.length > 0 && (
            <View
              style={{
                ...appstyle.shadow,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: fonts.semibold,
                  color: colors.black,
                  fontSize: 16,
                  padding: 5,
                }}>
                Photos
              </Text>

              <View style={styles.photoContainer}>
                {item.photos?.map((a, b) => (
                  <Pressable
                    onPress={() => {
                      setImageVisible(true);
                    }}
                    key={b.toString()}
                    style={styles.innerPhotos}>
                    <FastImage
                      source={{uri: a}}
                      resizeMode="cover"
                      style={{width: '100%', height: 140, borderRadius: 10}}
                    />
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          <View style={{marginTop: 30}}>
            <CustomButton
              disabled={true}
              title="Apply for job"
              onPress={handleApplyForJob}
              // onPress={() => navigation.navigate('PurposalSent')}
            />
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showApplyModal}
          onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.card}>
              <Text style={styles.modalTitle}>Apply for Job</Text>
              <Text style={styles.modalMessage}>
                You need to log in to apply for the job. Do you want to go to
                the login screen?
              </Text>
              <View style={styles.buttonContainer}>
                <Pressable style={styles.cancelButton} onPress={closeModal}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.loginButton} onPress={goToLogin}>
                  <Text style={styles.buttonText}>Go to Login</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
      {item.photos !== null && item.photos.length > 0 && (
        <GridImageView
          data={item.photos}
          visible={imageVisible}
          onRequestClose={() => {
            setImageVisible(false);
          }}
        />
      )}
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
    margin: 10,
    marginTop: 20,
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
  innerPhotos: {
    borderRadius: 10,
    flex: 1,
    margin: 5,
  },
  photoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 5,
  },
  loginButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default FilterJobDetail;
