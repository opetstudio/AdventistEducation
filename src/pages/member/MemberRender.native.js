'use strict';

import React from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import UsersContainer from '../../containers/UsersContainer/UsersContainer';

export default function () {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Redux Examples</Text>
      <UsersContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100
  },
  text: {
    textAlign: 'center'
  },
  button: {
    height: 60,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b7eff'
  },
  buttonText: {
    color: 'white'
  },
  mainContent: {
    margin: 10,
  }
});
