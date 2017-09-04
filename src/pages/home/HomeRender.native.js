

'use strict';

import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions
} from 'react-native';

// import Screen from './Screen';

// const logo = require('../img/rayasem-logo-color.png');

const { height, width } = Dimensions.get('window');

const box_count = 3;

const box_height = (height / box_count) - 70;
const box_width = width - 50;

export default function () {
  return (
    <View style={styles.container}>
        <TouchableHighlight onPress={() => { this._onPressButton(); }}>
          <View style={[styles.box, styles.box1]}>
              <Text style={styles.menuText}>About</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => { this._onPressButtonMember(); }}>
          <View style={[styles.box, styles.box2]}>
            <Text style={styles.menuText}>Member</Text>
          </View>
        </TouchableHighlight>
        <View style={[styles.box, styles.box3]}>
          <Text style={styles.menuText}>RP</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuText: {
    color: '#FFFFFF',
    fontSize: 48
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: box_width,
    height: box_height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box1: {
    backgroundColor: '#2196F3'
  },
  box2: {
    backgroundColor: '#8BC34A',
    marginTop: 30,
    marginBottom: 30
  },
  box3: {
    backgroundColor: '#e3aa1a'
  }
});
