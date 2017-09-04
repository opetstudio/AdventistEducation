
'use strict';

import React from 'react';

import {
  // StyleSheet,
  View,
  // Dimensions,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  ListView
} from 'react-native';

// import Screen from './Screen';


// const bg = require('../../img/bg3.jpg');
const sendMsgIcon = require('../../img/send-msg.png');

// const { height, width } = Dimensions.get('window');

// const box_count = 3;

// const box_height = (height / box_count) - 70;
// const box_width = width - 50;

function renderRow(data) {
  if (data.type === 's') {
    return (
      <View
        style={{ alignItems: 'flex-end', marginTop: 5, marginBottom: 5, marginLeft: 40 }}
      >
        <Text
          style={{
            fontSize: 18,
            color: '#000',
            padding: 10,
            backgroundColor: '#dbf5b4',
            elevation: 1
          }}
        >
          {data.message}
        </Text>
      </View>
    );
  }
  return (
    <View style={{ alignItems: 'flex-start', marginTop: 5, marginBottom: 5, marginRight: 40 }}>
      <Text
        style={{
          fontSize: 18,
          color: '#000',
          padding: 10,
          backgroundColor: '#f7f7f7',
          elevation: 1
        }}
      >
        {data.message}
      </Text>
    </View>
  );
}
function setupListMessages(chats) {
  const result = [];
  chats.forEach((row) => {
    result.push(renderRow(row));
  });
  return result;
}
export default function () {
let _scrollView: ScrollView;
let _scrollToBottomY;
  console.log('theProps=>', this.props);

  return (
    // <Image style={{ flex: 1, width: null }} source={bg}>
    <View style={{ flex: 1, marginTop: 0, backgroundColor: '#eee4dc', padding: 10 }}>
      <View style={{ flex: 1, paddingBottom: 20 }}>
        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          onScroll={() => { console.log('onScroll!'); }}
          style={{ flex: 1 }}
          onContentSizeChange={(contentWidth, contentHeight) => {
            _scrollToBottomY = contentHeight;
            _scrollView.scrollTo(_scrollToBottomY);
          }}
        >
          {
              this.props.chats.map((item) => renderRow(item))
          }
          {/* {setupListMessages(this.props.chats)} */}
          {/* <ListView
            ref='listView'
            enableEmptySections
            dataSource={this.state.dataSource}
            onLayout={this._onLayout}
            renderFooter={this._renderFooter}
            renderRow={renderRow}
          /> */}
          </ScrollView>
      </View>
      <View style={{ flexDirection: 'row', height: 60 }}>
        <TextInput
          value={this.props.appReducer.message}
          onChangeText={text => this.props.modificationMessage(text)}
          onFocus={() => {}}
          onBlur={() => {}}
          style={{ flex: 4, backgroundColor: '#fff', fontSize: 18 }}
        />
        <TouchableHighlight onPress={this._sendMessage.bind(this)} underlayColor='#eee4dc'>
          <View style={{ flex: 1, backgroundColor: '#fff', padding: 10 }}>
            <Image
              source={sendMsgIcon}
              style={{ flex: 1, alignSelf: 'stretch', height: 60, width: 50, backgroundColor: '#fff' }}
            />
          </View>
        </TouchableHighlight>
      </View>
    </View>
    // </Image>
  );
}

// const styles = StyleSheet.create({
//   menuText: {
//     color: '#FFFFFF',
//     fontSize: 48
//   },
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   box: {
//     width: box_width,
//     height: box_height,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   box1: {
//     backgroundColor: '#2196F3'
//   },
//   box2: {
//     backgroundColor: '#8BC34A',
//     marginTop: 30,
//     marginBottom: 30
//   },
//   box3: {
//     backgroundColor: '#e3aa1a'
//   }
// });
