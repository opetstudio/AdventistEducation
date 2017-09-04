'use strict';

import { Actions, ActionConst } from 'react-native-router-flux';
import React, { Component } from 'react';
import {
  Button
} from 'react-native';
import firebase from 'firebase';

export default class WelcomeBase extends Component {
  componentWillMount() {
    console.log('WelcomeBase.render invoked');
    this.setState({
      section: 1
    });
    console.log('WelcomeBase.componentWillMount invoked');

    const that = this;
    this.props.resetAuthenticationReducer();
    setTimeout(() => {
      console.log('setTimeout');
      that._gotoLoginPage();
    }, 2000);
  }
  _gotoHomePage() {
    console.log('WelcomeBase._gotoHomePage invoked');
    Actions.homev2({ type: ActionConst.RESET });
  }
  _gotoLoginPage() {
    Actions.login();
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
