import React from 'react';
import {View, Text, StyleSheet, Pressable, Dimensions} from 'react-native';
import moment from 'moment';
import Pdf from 'react-native-pdf';

// helpers
import {colors, fonts} from '../../../theme';
import {useNavigation} from '@react-navigation/native';

enum TextPosition {
  left = 'left',
  right = 'right',
}

const {width} = Dimensions.get('window');

const DocumentComponent = ({
  item,
  position,
}: {
  item: any;
  position: TextPosition;
}) => {
  const navigation = useNavigation();

  return (
    <View style={{width: '100%', minWidth: width * 0.6}}>
      <Pressable
        onPress={() => navigation.navigate('PdfScreen', {item: item?.document})}
        style={{
          backgroundColor:
            position == TextPosition.left ? '#E8E9EB' : colors.primary,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 15,
          height: 230,
          borderBottomLeftRadius: TextPosition.left ? 15 : 0,
          borderBottomRightRadius: TextPosition.left ? 0 : 15,
        }}>
        <Pdf
          source={{uri: item?.document}}
          style={styles.pdf}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          enablePaging={false}
        />
      </Pressable>
      <Text
        style={{
          textAlign: position,
          fontFamily: fonts.medium,
          color: '#8A9099',
          fontSize: 10,
        }}>
        {moment(item.createdAt).fromNow()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: '100%',
    padding: 10,
    backgroundColor: 'transparent',
  },
});

export default DocumentComponent;
