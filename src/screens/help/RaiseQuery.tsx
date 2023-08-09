import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  FlatList,
  LayoutAnimation,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {appstyle, colors, fonts} from '../../theme';
import {CustomButton, Title} from '../../components';
import {createSupport, getHelpSupport} from '../../redux/actions/userAction';
import {useAppDispatch, useAppSelector} from '../../hooks';

import {Formik} from 'formik';
import * as Yup from 'yup';

const RaiseQuery = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const {help, loading} = useAppSelector(state => state.user);

  const [selectedReasonIndex, setSelectedReasonIndex] = useState(-1);
  const [showMoreTopics, setShowMoreTopics] = useState(false);
  const [topic, setTopic] = useState(-1);

  useEffect(() => {
    dispatch(getHelpSupport(''));
  }, []);

  const handleReasonSelection = (index: number, topicId: number) => {
    setSelectedReasonIndex(index);
    setTopic(topicId);
  };

  const filteredHelp = showMoreTopics ? help : help.slice(0, 5);

  const CustomLayoutAnimation = {
    duration: 400,
    create: {
      type: LayoutAnimation.Types.linear,
      property: LayoutAnimation.Properties.scaleXY,
    },
    update: {
      type: LayoutAnimation.Types.linear,
      property: LayoutAnimation.Properties.scaleXY,
    },
  };

  const handleShowMoreTopics = () => {
    setSelectedReasonIndex(-1);
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    setShowMoreTopics(true);
  };

  const handleCloseTopics = () => {
    setSelectedReasonIndex(-1);
    LayoutAnimation.configureNext(CustomLayoutAnimation);
    setShowMoreTopics(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title title="Report a problem" />

      <Formik
        initialValues={{
          problemDescription: '',
        }}
        validationSchema={Yup.object().shape({
          problemDescription: Yup.string()
            .min(20, 'Description can`t be less than 20 words')
            .max(300, 'Description can`t be greater than 300 words')
            .required('Please enter description'),
        })}
        onSubmit={values => {
          dispatch(
            createSupport({
              topicId: topic,
              description: values.problemDescription,
            }),
          );
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <ScrollView>
            <View
              style={{
                margin: 15,
                ...appstyle.shadow,
                padding: 10,
                borderRadius: 15,
                justifyContent: 'center',
              }}>
              <Text style={{fontFamily: fonts.medium, fontSize: 18}}>
                What brings you here?
              </Text>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  fontSize: 14,
                  color: '#52525B',
                  marginTop: 10,
                }}>
                Pick the option that most applies to you.
              </Text>
            </View>

            <FlatList
              data={filteredHelp}
              keyExtractor={item => item.topicId.toString()}
              renderItem={({item, index}) => (
                <Pressable
                  key={index}
                  onPress={() => handleReasonSelection(index, item?.topicId)}
                  style={{
                    ...appstyle.shadow,
                    margin: 10,
                    padding: 15,
                    width: 'auto',
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderWidth: 1,
                    borderColor:
                      topic === item.topicId ? colors.primary : 'white',
                  }}>
                  <Text
                    style={{
                      fontFamily: fonts.regular,
                      textTransform: 'capitalize',
                      width: '90%',
                    }}>
                    {item.topicName}
                  </Text>

                  <MaterialIcons
                    name={
                      topic === item.topicId
                        ? 'check-circle'
                        : 'radio-button-unchecked'
                    }
                    color={topic === item.topicId ? colors.primary : '#D9D9D9'}
                    size={25}
                    style={{position: 'absolute', right: 10}}
                  />
                </Pressable>
              )}
            />

            {help.length > 5 && (
              <View
                style={{
                  marginTop: 10,
                  alignItems: 'center',
                  height: showMoreTopics ? 'auto' : 40,
                  overflow: 'hidden',
                }}>
                {!showMoreTopics ? (
                  <Pressable onPress={handleShowMoreTopics}>
                    <Text style={{color: colors.primary}}>
                      Show More Topics
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable onPress={handleCloseTopics}>
                    <Text style={{color: colors.primary}}>Close Topics</Text>
                  </Pressable>
                )}
              </View>
            )}

            <View
              style={{
                margin: 15,
                ...appstyle.shadow,
                padding: 10,
                borderRadius: 15,
              }}>
              <Text style={{fontFamily: fonts.medium, fontSize: 18}}>
                Problem
              </Text>
              <View
                style={{
                  minHeight: 170,
                  borderWidth: 0.5,
                  borderRadius: 8,
                  borderColor: colors.grey,
                  backgroundColor: colors.white,
                  marginTop: 10,
                }}>
                <TextInput
                  placeholder="Describe the problem here..."
                  multiline={true}
                  placeholderTextColor="#333333"
                  style={{padding: 15}}
                  onChangeText={handleChange('problemDescription')}
                  onBlur={handleBlur('problemDescription')}
                  value={values.problemDescription}
                  maxLength={300}
                />
              </View>
              {touched.problemDescription && errors.problemDescription && (
                <Text style={{color: 'red'}}>{errors.problemDescription}</Text>
              )}
            </View>

            {/* Existing content */}
            {/* ... */}

            <CustomButton
              style={{marginTop: 10, bottom: 10}}
              title="Report Problem"
              loading={loading}
              onPress={handleSubmit}
              disabled
            />
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFF',
  },
});

export default RaiseQuery;
