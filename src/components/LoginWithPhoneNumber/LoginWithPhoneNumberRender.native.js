import React from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  ActivityIndicator,
  Button
} from 'react-native';

const bg = require('../../img/bg3.jpg');

export default function () {
  // console.log('=======>>>>', this.props);
  const {
    phoneNumber,
    submitPhoneNumberErrorMessage,
    submitVerificationCodeErrorMessage,
    verifyCode,
    submitPhoneNumberInProgress,
    submitVerificationCodeInProgress,
    sessionPhoneNumber,
    reSmsVerificationCodeInProgress
  } = this.props.sessionReducer;

  const _renderButtonSubmitPhoneNumber = () => {
    if (submitPhoneNumberInProgress) {
      return (
        <ActivityIndicator size="large" />
      );
    }
    return (
      <Button
        title="Submit Phone Number"
        color="#115E54"
        onPress={() => this.props.submitPhoneNumber(phoneNumber)}
      />
    );
  };
  const _renderButtonSubmitReEnterPhoneNumber = () => {
    if (submitPhoneNumberInProgress) {
      return (
        <ActivityIndicator size="large" />
      );
    }
    return (
      <Button
        title="Re-Enter Phone Number"
        color="#115E54"
        onPress={() => this.props.reEnterPhoneNumber()}
      />
    );
  };
  const _renderButtonReSendVerificationCode = () => {
    if (reSmsVerificationCodeInProgress) {
      return (
        <ActivityIndicator size="large" />
      );
    }
    return (
      <Button
        title="Re-Send Verification Code"
        color="#115E54"
        onPress={() => this.props.reSmsVerificationCode(phoneNumber)}
      />
    );
  };

  const _renderButtonSubmitVerifyCode = () => {
    if (submitVerificationCodeInProgress) {
      return (
        <ActivityIndicator size="large" />
      );
    }
    return (
      <Button
        title="Verify"
        color="#115E54"
        onPress={() => {}}
      />
    );
  };
  const _renderInputPhoneNumber = () => (
      <View style={{ flex: 1, padding: 10 }}>
        <StatusBar backgroundColor="#114D44" />
        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 25, color: '#fff' }}>Whatsapp Clone</Text>
          <Text style={{ fontSize: 25, color: '#fff' }}>Please submit your phone number</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            value={phoneNumber}
            style={{ fontSize: 20, height: 45, color: '#fff', textAlign: 'center' }}
            onChangeText={text => this.props.modificationPhoneNumber(text)}
            placeholder="Phone Number"
            keyboardType='numeric'
            placeholderTextColor='#a9acad'
          />
          <Text
            style={{ color: '#ff0000', fontSize: 18 }}
          >
            {submitPhoneNumberErrorMessage}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
            {_renderButtonSubmitPhoneNumber()}
        </View>
      </View>
    );
  const _renderInputVerifyCode = () => (
    <View style={{ flex: 1, padding: 10 }}>
      <StatusBar backgroundColor="#114D44" />
      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 25, color: '#fff' }}>Please check your sms inbox then</Text>
        <Text style={{ fontSize: 25, color: '#fff' }}>submit the verification code</Text>
      </View>
      <View style={{ flex: 1 }}>
        <TextInput
          value={verifyCode}
          style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}
          onChangeText={text => this.props.modificationVerifyCode(text)}
          placeholder="Verification Code"
          keyboardType='numeric'
          placeholderTextColor='#a9acad'
        />
        <Text
          style={{ color: '#ff0000', fontSize: 18 }}
        >
          {submitVerificationCodeErrorMessage}
        </Text>
      </View>
      <View style={{ flex: 2, marginBottom: 50 }}>
        <View style={{ flex: 1, height: 50 }}>
          {_renderButtonSubmitVerifyCode()}
        </View>
        <View style={{ flex: 1, height: 50 }}>
          {_renderButtonReSendVerificationCode()}
        </View>
        <View style={{ flex: 1, height: 50 }}>
          {_renderButtonSubmitReEnterPhoneNumber()}
        </View>
      </View>
    </View>
    );
  const _renderLoginPage = () => {
    if (sessionPhoneNumber === '') {
      return _renderInputPhoneNumber();
    }
    return _renderInputVerifyCode();
  };

  return (
    <Image style={{ flex: 1, width: null }} source={bg}>
      {_renderLoginPage()}
    </Image>
  );
}
