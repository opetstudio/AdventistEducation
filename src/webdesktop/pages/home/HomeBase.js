'use strict';

import { Component } from 'react';

export default class HomeBase extends Component {
  _onPressButton() {
    console.log('_onPressButton invoked');
  }
  _onPressButtonMember() {
    console.log('_onPressButtonCounter invoked');
  }
}
