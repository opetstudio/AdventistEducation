
import { Component } from 'react';
import { Actions, ActionConst } from 'react-native-router-flux';
import {
  BackHandler,
  ToastAndroid
} from 'react-native';

export default class BackbuttonHandler extends Component {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
  }
  componentWillUnmount() {
      // alert('login componentWillUnmount');
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
      // BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
        // BackHandler.removeEventListener('hardwareBackPress');
        // DeviceEventEmitter.removeAllListeners();
    }
  onBackAndroid() {
    alert(`backButton ${this.props.name} ${Actions.state.index}`);
    // BackHandler.exitApp();
    // return false;
    if (this.backButtonPressedOnceToExit) {
        // Actions.welcome({ type: ActionConst.REPLACE, doExit: 1 });
        // setTimeout(() => {
          BackHandler.exitApp();
        // }, 3000);
    } else {
      // alert(this.props.routeName);
      // alert(`backButton ${this.props.name} ${Actions.state.index}`);
      if (Actions.state.index === 1) {
          // alert('loginpage');
          //login page
          this._exitApp();
          return true;
      }
      // alert('bukan loginpage');
      if (Actions.state.index > 0) {
        Actions.pop();
        return true;
      }

        this._exitApp();
        return true;
    }
  }
  _exitApp() {
    const self = this;
    this.backButtonPressedOnceToExit = true;
    ToastAndroid.show('Press again to exit APP', ToastAndroid.SHORT);
    setTimeout(() => {
      self.backButtonPressedOnceToExit = false;
    }, 2000);
  }
}
