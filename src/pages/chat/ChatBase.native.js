'use strict';
import { Actions } from 'react-native-router-flux';
import React, { Component } from 'react';
import { ListView, View } from 'react-native';

export default class ChatBase extends Component {
  componentDidMount() {
    console.log('componentDidMount');
    this._scrollToBottom();
  }
  componentDidUpdate() {
    console.log('componentDidUpdate');
        this._scrollToBottom();
  }
  setDataSource(chats) {
    console.log('setDataSource');
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      // const self = this;
      // console.log('before ssssssstaaaatttteeeeeeee======>>>>', this.state);
      this.setState(previousState => {
        console.log('');
        return { ...previousState, lastRowY: 1, messages: chats, dataSource: ds.cloneWithRows(chats) };
      });
      // console.log('after ssssssstaaaatttteeeeeeee======>>>>', this.state);
      if (this.state != null) {
          // console.log('cek ssssssstaaaatttteeeeeeee======>>>>', this.state.lastRowY);
          // this.scrollToBottom();
      }
      // this._scrollToBottom();
      // this.setState({
      //   ...self.state,
      //   dataSource: ds.cloneWithRows(chats)
      // });
      // this.scrollToBottom();
  }
  _componentWillMount() {
  }
  _gotoLoginPage() {
    Actions.login();
  }
  // _scrollToBottom() {
  //   if (!!this.state.lastRowY) {
  //     const scrollResponder = this.refs.commentList.getScrollResponder();
  //     scrollResponder.scrollResponderScrollTo({ x: 0, y: this.state.lastRowY, animated: true });
  //   }
  // }
  _onLayout(event) {
    console.log('_onLayout');
    const layout = event.nativeEvent.layout;
    console.log(layout.height);
    // this.listHeight = layout.height;
  }
  // The magical function! 🎉
  _scrollToBottom(animated = true) {
    console.log('_scrollToBottom');
    // this.refs.listView.scrollToEnd();
    // scrollToEnd
    // if (this.listHeight && this.footerY && this.footerY > this.listHeight) {
    //   // Calculates the y scroll position inside the ListView
    //   const scrollTo = this.footerY - this.listHeight;
    //
    //   // Scroll that sucker!
      // this.refs.listView.scrollTo({
      //   y: scrollTo,
      //   animated,
      // });
    // }
  }
  // Render a fake footer
  _renderFooter() {
    console.log('_renderFooter');
    return (
      <View onLayout={this._onFooterLayout} />
    );
  }
  // When the fake footer is laid out, store the y-position
  _onFooterLayout(event) {
    console.log('_onFooterLayout');
    const layout = event.nativeEvent.layout;
    this.footerY = layout.y;
  }
}
