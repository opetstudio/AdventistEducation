'use strict';

import React from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';

// import Screen from './Screen';

export default function () {
  return (
    <View style={styles.content}>
      <View>
        <Text>Page About Mobile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#61BD8C'
  }
});
