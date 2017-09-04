'use strict';

import { Component } from 'react';
import { ListView } from 'react-native';


export default class ContactsContainerBase extends Component {
  _setDataSource(contacts) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    // this.setState({
    //     dataSource: ds.cloneWithRows(contacts)
    // });
    this.state = {
      dataSource: ds.cloneWithRows(contacts)
    };
  }
  _onPressButton() {
    console.log('_onPressButton invoked');
  }
}
