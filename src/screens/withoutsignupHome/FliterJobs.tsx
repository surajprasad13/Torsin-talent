import React, {FC, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';

// helpers
import {RootStackParamList} from '../../routes/RouteType';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {withoutSignupSkill} from '../../redux/actions/userAction';
import {colors} from '../../theme';
import {Title} from '../../components';

const FliterJobs: FC = ({}) => {
  const {params} = useRoute<RouteProp<RootStackParamList, 'FilterJobs'>>();

  const dispatch = useAppDispatch();
  const {loading, without} = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(withoutSignupSkill(params?.item));
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <Title title="Job List" />
      <FlatList
        data={without}
        renderItem={({item, index}) => {
          return (
            <View>
              <Text>{index}</Text>
              <Text>{item.jobName}</Text>
              <Text>{item.jobDescription}</Text>
            </View>
          );
        }}
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default FliterJobs;
