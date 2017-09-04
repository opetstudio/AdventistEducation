'use strict';

import { Component } from 'react';

//for web/desktop
export default class Homev2Base extends Component {
  _componentWillMount() {
  }
  _onPressButton() {
    console.log('_onPressButton invoked');
  }
  _onPressButtonMember() {
    console.log('_onPressButtonCounter invoked');
  }
}
