import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

// icons

// components

// helpers
import {useAppSelector} from '../../hooks';

const Chat = ({}) => {
  const {} = useAppSelector(state => state.auth);

  return (
    <SafeAreaView>
      <View>
        <Text>Chat</Text>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
