'use strict';
//MainBase.native.js
import { Actions, ActionConst } from 'react-native-router-flux';
import React, { Component } from 'react';
import {
  Button
} from 'react-native';
import firebase from 'firebase';

export default class MainBase extends Component {
  _componentWillMount() {
    // const self = this;
    setTimeout(() => {
      console.log('setTimeout');
      Actions.homev2();
    }, 400);
  }
  _gotoHomePage() {
    console.log('MainBase._gotoHomePage invoked');
    // Actions.homev2({ type: ActionConst.RESET });
  }
  _gotoLoginPage() {
    Actions.welcome();
  }
  _renderButtonLogin() {
    const { currentUser } = firebase.auth();
    if (currentUser == null) {
      return (
        <Button title="Login" onPress={() => this._gotoLoginPage()} />
      );
    }
  }
}
