import React from 'react';
import {
  View,
  Text,
  ListView,
  TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';

function renderRow(data) {
  return (
    <TouchableHighlight
      onPress={() => Actions.chat({
        title: data.name, contactName: data.name, contactEmail: data.email
      })}
    >
      <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: '#cccccc' }} >
        <Text style={{ fontSize: 25 }}>{data.name}</Text>
      </View>
    </TouchableHighlight>
  );
}
export default function () {
    return (
      <ListView
        enableEmptySections
        dataSource={this.state.dataSource}
        renderRow={renderRow}
      />
    );
}
