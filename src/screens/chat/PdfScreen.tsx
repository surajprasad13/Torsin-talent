import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Pressable,
  Platform,
} from 'react-native';
import Pdf from 'react-native-pdf';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Share from 'react-native-share';

// icons
import Feather from 'react-native-vector-icons/Feather';

// helpers
import {colors, fonts} from '../../theme';
import {useNavigation} from '@react-navigation/native';

const PdfScreen = ({route}: any) => {
  const navigation = useNavigation();
  const {item}: {item: string} = route.params;

  const downloadFile = () => {
    let dirs = ReactNativeBlobUtil.fs.dirs;
    ReactNativeBlobUtil.config({
      fileCache: true,
      appendExt: 'pdf',
      path: `${dirs.DocumentDir}/sample`,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: 'sample pdf',
        description: 'File downloaded by download manager.',
        mime: 'application/pdf',
      },
    })
      .fetch('GET', item)
      .then(res => {
        if (Platform.OS === 'ios') {
          const filePath = res.path();
          console.log('Sadfads', filePath);
          let options = {
            type: 'application/pdf',
            url: filePath,
            saveToFiles: true,
          };
          Share.open(options)
            .then(resp => console.log(resp))
            .catch(err => console.log(err));
        }
      })
      .catch(err => {
        console.log('BLOB ERROR -> ', err);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          borderBottomWidth: 0.5,
          borderBottomColor: colors.grey2,
        }}>
        <Pressable
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}>
          <Feather name="arrow-left" size={20} color={colors.primary} />
        </Pressable>
        <Text style={{fontFamily: fonts.medium}}>Pdf</Text>
        <Pressable onPress={downloadFile}>
          <Feather name="download" size={20} color={colors.primary} />
        </Pressable>
      </View>
      <Pdf
        source={{uri: item}}
        style={styles.pdf}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        enablePaging={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: '100%',
  },
});

export default PdfScreen;
