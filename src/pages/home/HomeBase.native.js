'use strict';

import { Component } from 'react';
import { Actions } from 'react-native-router-flux';


export default class HomeBase extends Component {
  _onPressButton() {
    Actions.about();
  }
  _onPressButtonMember() {
    Actions.member();
  }
}
