'use strict';
import React, { Component } from 'react';
import firebase from 'firebase';
import { Actions, ActionConst } from 'react-native-router-flux';

import {
  // StyleSheet,
  View,
  Text,
  // Dimensions,
  TouchableHighlight,
  Button,
  ActivityIndicator,
  Image,
  TextInput,
  StatusBar
} from 'react-native';

const logo = require('../../img/walogo.png');

export default class LoginBase extends Component {
  _authUser() {
    const { email, password } = this.props.authenticationReducer;
    this.props.loginUser({ email, password });
  }
  _onPressButton() {
    Actions.about();
  }
  _onPressButtonMember() {
    Actions.member();
  }
  _renderButtonLogin() {
    console.log(`_renderButtonLogin=>${this.props.loadingLogin}`);
    if (this.props.authenticationReducer.loadingLogin) {
      return (
        <ActivityIndicator size="large" />
      );
    }
    return (
      <Button title="Login" color="#115E54" onPress={() => this._authUser()} />
    );
  }
  _renderButtonGoToLogin() {
    return (
        <Button
          title="Login"
          onPress={() => {
            this.setState({
              section: 2
            });
          }}
        />
      );
  }
  _renderLogin() {
    // return this._renderLoginContent();
    // console.log('[LoginBase._renderLogin] cek state: ', this.state);
    // if (this.state.section === 1) {
    //     return this._renderWelcomeContent();
    // }
    return this._renderLoginContent();
  }
  _renderWelcomeContent() {
    return (
      <View style={{ flex: 1, padding: 15 }}>
        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, color: '#ffffff' }}>Selamat Datang</Text>
          <Image source={logo} />
        </View>
        <View style={{ flex: 1 }}>
          {this._renderButtonGoToLogin()}
        </View>
      </View>
    );
  }
  _renderLoginContent() {
    return (
        <View style={{ flex: 1, padding: 10 }}>
          <StatusBar backgroundColor="#114D44" />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 25, color: '#fff' }}>Whatsapp Clone</Text>
          </View>
          <View style={{ flex: 2 }}>
            <TextInput
              value={this.props.authenticationReducer.email}
              style={{ fontSize: 20, height: 45, color: '#fff' }}
              onChangeText={text => this.props.modificationEmail(text)}
              placeholder="E-mail"
              placeholderTextColor='#a9acad'
              onKeyDown={e => { alert('onKeyDown=>', e); }}
              handleChange={e => { alert('handleChange=>', e); }}
            />
            <TextInput
              secureTextEntry
              value={this.props.authenticationReducer.password}
              style={{ fontSize: 20, height: 45, color: '#fff' }}
              onChangeText={text => this.props.modificationPassword(text)}
              placeholder="Password"
              placeholderTextColor='#a9acad'
            />
            <Text
              style={{ color: '#ff0000', fontSize: 18 }}
            >
              {this.props.authenticationReducer.errorLoginMessage}
            </Text>
            <TouchableHighlight onPress={() => Actions.signup()}>
              <Text
                style={{ fontSize: 20, height: 45, color: '#fff' }}
              >
                Belum punya akun? daftar
              </Text>
            </TouchableHighlight>
          </View>
          <View style={{ flex: 2 }}>
              {this._renderButtonLogin()}
          </View>
        </View>
    );
  }
}
