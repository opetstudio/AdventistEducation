
'use strict';

import React from 'react';

import {
  // StyleSheet,
  View,
  // Dimensions,
  Image,
  Text,
  Button,
  TextInput
} from 'react-native';

// import Screen from './Screen';

// const logo = require('../../img/walogo.png');
// const bg = require('../../img/bg3.jpg');

// const { height, width } = Dimensions.get('window');

// const box_count = 3;

// const box_height = (height / box_count) - 70;
// const box_width = width - 50;

export default function () {
  if (!this.props.appReducer.account_result_include) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          {/* <TextInput
            placeholder='Name'
            style={{ fontSize: 20, height: 45 }}
            onChangeText={(text) => this.props.modificationContactName(text)}
            value={this.props.appReducer.add_contact_name}
          /> */}
          <TextInput
            placeholder='E-mail'
            style={{ fontSize: 20, height: 45 }}
            onChangeText={(text) => this.props.modificationContactEmail(text)}
            value={this.props.appReducer.add_contact_email}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            title="Add"
            color="#115E54"
            onPress={
              () => this.props.addContact(
                this.props.appReducer.add_contact_email
              )
            }
          />
          <Text
            style={{ color: '#ff0000', fontSize: 20 }}
          >
            {this.props.appReducer.account_result_error_message}
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20 }}>
        Add Contact success
      </Text>
    </View>
  );
}

// const styles = StyleSheet.create({
//   menuText: {
//     color: '#FFFFFF',
//     fontSize: 48
//   },
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   box: {
//     width: box_width,
//     height: box_height,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   box1: {
//     backgroundColor: '#2196F3'
//   },
//   box2: {
//     backgroundColor: '#8BC34A',
//     marginTop: 30,
//     marginBottom: 30
//   },
//   box3: {
//     backgroundColor: '#e3aa1a'
//   }
// });
