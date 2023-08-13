import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// icons
import Feather from 'react-native-vector-icons/Feather';

// helpers
import {colors, fonts} from '../theme';
import {useNavigation} from '@react-navigation/native';

interface TitleProp {
  title: string;
}

const Title: FC<TitleProp> = ({title}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Feather
        name="arrow-left"
        size={20}
        color={colors.almostBlack}
        style={{
          left: 10,
          position: 'absolute',
        }}
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        }}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontFamily: fonts.medium,
    color: colors.almostBlack,
  },
});

export default Title;
