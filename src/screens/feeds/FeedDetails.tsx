import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';

import FastImage from 'react-native-fast-image';

//helpers
import {Title} from '../../components';
import {colors, fonts} from '../../theme';

const FeedDetails = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Title title="View Blogs" />
      <ScrollView>
        <View style={styles.innerContainer}>
          <FastImage
            source={{uri: 'https://source.unsplash.com/400x400?stone'}}
            resizeMode="cover"
            style={styles.image}
          />
          <View style={{marginTop: 20, width: '90%'}}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: fonts.semibold,
                color: colors.grey,
              }}>
              Here is the heading of your blog/news
            </Text>
            <Text
              style={{
                fontFamily: fonts.regular,
                fontSize: 16,
                color: colors.grey,
                width: 'auto',
                marginTop: 10,
              }}>
              Lorem ipsum dolor sit amet consectetur. Condimentum faucibus
              blandit sed adipiscing pharetra. A leo pellentesque tincidunt
              dictumst netus. Viverra fames amet ullamcorper mi vestibulum sit
              lacus. Quis non nullam tellus ornare diam morbi condimentum lorem.
              Viverra justo sit fringilla ipsum magna. Mattis vitae faucibus
              metus nunc tincidunt. Vitae in a commodo venenatis. Adipiscing
              bibendum eget mi quis adipiscing massa etiam tortor. Pharetra
              condimentum tellus volutpat non urna. Gravida sit neque ut non
              tellus. Lorem feugiat blandit amet suscipit diam. Magna risus
              sollicitudin in integer tortor cursus leo. Pellentesque a sed
              facilisis diam aliquam. Vestibulum eu vitae elementum ut augue
              amet. Sit in tristique ultrices ornare suscipit nisl elementum.
              Nascetur donec morbi placerat morbi. Dui venenatis lectus amet
              quis. Eget adipiscing sodales at suspendisse a eget in pretium
              sit. Mattis massa in ultrices scelerisque elit sed dolor
              hendrerit. Quis purus sollicitudin eu consectetur dolor. Tristique
              suspendisse pulvinar faucibus nunc tristique sed facilisi. Leo
              integer diam lorem quam enim. Arcu sit sem dui amet ultricies
              morbi euismod urna. Feugiat et ac ante vel nunc quis tempor
              dignissim. Id dis morbi diam tellus ullamcorper diam felis ornare
              tortor. Imperdiet viverra id duis suspendisse massa. Erat integer
              eleifend nunc lectus. Nunc augue nullam adipiscing vel dignissim
              est nibh felis dui. Aenean viverra adipiscing tristique proin
              risus. Fermentum laoreet mollis turpis neque in. Ut lorem sit
              volutpat turpis quis etiam. Aliquam rhoncus nulla nisi nisi.
              Dictum tellus consectetur enim sit. Massa posuere varius risus
              tristique curabitur condimentum ornare. Lacus sem elit viverra
              velit diam elit nunc feugiat. Porta rhoncus.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  innerContainer: {
    margin: 10,
    justifyContent: 'center',
  },
});

export default FeedDetails;
