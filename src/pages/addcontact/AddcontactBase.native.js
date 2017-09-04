'use strict';
import { Actions } from 'react-native-router-flux';
import { Component } from 'react';

export default class AddcontactBase extends Component {
  _gotoLoginPage() {
    Actions.login();
  }
}
