'use strict';

import { Component } from 'react';
import { ListView } from 'react-native';


export default class ChatsContainerBase extends Component {
  setDataSource(conversations) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.setState({
        dataSource: ds.cloneWithRows(conversations)
      });
  }
  _onPressButton() {
    console.log('_onPressButton invoked');
  }
}
