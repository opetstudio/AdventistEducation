'use strict';
import React from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableHighlight
} from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

const addContact = require('../../img/android-add-contact.png');

export default function () {
  return (
      <View style={{ backgroundColor: '#115E54', elevation: 4, marginBottom: 6 }}>
          <StatusBar backgroundColor="#114D44" />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
            <View style={{ height: 50, justifyContent: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 20, marginLeft: 20 }} >Whatsapp Clone</Text>
            </View>
            <View style={{ flexDirection: 'row', marginRight: 20 }} >
              <View style={{ justifyContent: 'center', width: 50, alignItems: 'center' }}>
                <TouchableHighlight
                  onPress={() => { Actions.addcontact(); this.props.habilitaIncludeContact(); }}
                  underlayColor="#114D44"
                >
                  <Image
                    source={addContact}
                    style={{ alignSelf: 'stretch', height: 20, width: 20 }}
                  />
                </TouchableHighlight>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <TouchableHighlight
                  onPress={() => { this.props.logoutUser(); }}
                  underlayColor="#114D44"
                >
                  <Text style={{ fontSize: 20, color: '#fff' }}>Logout</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
          <TabBar {...this.props} style={{ backgroundColor: '#115E54', elevation: 0 }} />
      </View>
  );
}
