

'use strict';

import React from 'react';
import firebase from 'firebase';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions
} from 'react-native';

import { TabViewAnimated, SceneMap } from 'react-native-tab-view';
import TabBarMenu from '../../components/TabBarMenu/TabBarMenu';
import ChatsContainer from '../../containers/ChatsContainer/ChatsContainer';
import ContactsContainer from '../../containers/ContactsContainer/ContactsContainer';
// import LoginComponent from '../../components/Login/Login';
import LoginWithPhoneNumberComponent from '../../components/LoginWithPhoneNumber/LoginWithPhoneNumber';
// import UsersContainer from '../../containers/UsersContainer/UsersContainer';

// import Screen from './Screen';

// const logo = require('../img/rayasem-logo-color.png');

// const Chats = () => <View style={[styles.container, { backgroundColor: '#ff4081' }]} />;
// const Contacts = () => <View style={[styles.container, { backgroundColor: '#673ab7' }]} />;

// const _handleIndexChange = index => this._handleIndexChange({ index });
// const _renderHeader = props => <TabBar {...props} />;
// const _renderHeader = props => <TabBarMenu {...props} />;

const _renderHeader = props => <TabBarMenu {...props} />;

const _renderScene = SceneMap({
    '1': ChatsContainer,
    '2': ContactsContainer
  });

export default function () {
  const { currentUser } = firebase.auth();
  if (currentUser != null) {
    console.log(`user sedang online ${currentUser.email}`);
    return (
      // <View>
      <TabViewAnimated
          style={styles.container}
          navigationState={this.state}
          renderScene={_renderScene}
          renderHeader={_renderHeader}
          onIndexChange={this._handleIndexChange.bind(this)}
      />
    );
  }
  console.log('user sedang tidak online');
  return (
    <LoginWithPhoneNumberComponent />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
