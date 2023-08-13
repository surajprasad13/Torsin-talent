import React, {FC} from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {fonts, appstyle, colors} from '../../../theme';

interface ComplaintCardProp {
  topic: number;
  item: any;
  onPress: () => void;
}

const ComplaintCard: FC<ComplaintCardProp> = ({topic, item, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          borderColor: topic === item.topicId ? colors.primary : 'white',
        },
      ]}>
      <Text style={styles.title}>{item.topicName}</Text>

      <MaterialIcons
        name={
          topic === item.topicId ? 'check-circle' : 'radio-button-unchecked'
        }
        color={topic === item.topicId ? colors.primary : '#D9D9D9'}
        size={25}
        style={{position: 'absolute', right: 10}}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    ...appstyle.shadow,
    margin: 10,
    padding: 15,
    width: 'auto',
    borderRadius: 10,
    borderWidth: 1,
    ...appstyle.rowBetween,
  },
  title: {
    fontFamily: fonts.regular,
    textTransform: 'capitalize',
    width: '90%',
  },
});

export default ComplaintCard;
