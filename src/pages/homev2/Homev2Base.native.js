'use strict';

import { Component } from 'react';

import firebase from 'firebase';
import { Actions, ActionConst } from 'react-native-router-flux';

//native
export default class Homev2Base extends Component {
  // componentWillMount() {
  //   this.props.resetAuthenticationReducer();
  //
  //   const { currentUser } = firebase.auth();
  //   if (currentUser != null) {
  //     console.log(`user sedang online ${currentUser.email}`);
  //   } else {
  //     console.log('user sedang tidak online');
  //     Actions.welcome({ type: ActionConst.RESET });
  //   }
  // }
  // constructor(props) {
  //   super(props);
  //   console.log('Homev2PR===>', props);
  //    this.state = {
  //        index: 0,
  //        routes: [
  //          { key: '1', title: 'Chats' },
  //          { key: '2', title: 'Contacts' },
  //        ]
  //    };
  // }
  // _handleIndexChange(index) {
  //   // this.setState({ index });
  //   // this.state.index = index;
  //   console.log('indexxxx=?', this.state);
  // }
}
