import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shadow: {
    elevation: 1,
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowColor: 'rgb(60, 60, 60)',
    shadowOpacity: 0.2,
    backgroundColor: 'white',
  },
});
