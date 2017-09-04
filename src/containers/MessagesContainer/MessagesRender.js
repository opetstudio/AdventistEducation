import React from 'react';
import {
  // StyleSheet,
  View,
  // Dimensions,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  ListView
} from 'react-native';

import MessageListComponent from '../../components/MessageList/MessageList';

export default function () {
  return (
    <View>
      <MessageListComponent messages={this.props.chats} />
    </View>
  );
}
