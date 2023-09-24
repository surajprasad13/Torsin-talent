import React, {FC} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {colors, fonts} from '../theme';

interface TextareaProp {
  title: string;
  value: string;
}

const Textarea: FC<TextareaProp> = ({title, value, ...rest}) => {
  return (
    <View style={{marginTop: 0, margin: 15}}>
      <Text
        style={{
          fontFamily: fonts.regular,
          color: '#4F4F4F',
          fontSize: 16,
        }}>
        {title}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Message"
          value={value}
          multiline={true}
          placeholderTextColor="#4F4F4F"
          editable={false}
          style={{
            padding: 15,
            top: 10,
          }}
          {...rest}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    height: 170,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: colors.light,
    marginTop: 10,
    backgroundColor: colors.white,
  },
});

export default Textarea;
