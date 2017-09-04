'use strict';

import {
  ToastAndroid,
  BackHandler
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Base from './Homev2Base.native';

export default class Homev2Base extends Base {
  _componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid.bind(this));
  }
  _onBackAndroid() {
    // alert(`backButton ${this.props.name} ${Actions.state.index}`);
    // BackHandler.exitApp();
    // return false;
    if (this.backButtonPressedOnceToExit) {
        // Actions.Main({ type: ActionConst.REPLACE, doExit: 1 });
        // setTimeout(() => {
          BackHandler.exitApp();
        // }, 3000);
    } else {
      // alert(this.props.routeName);
      // alert(`backButton ${this.props.name} ${Actions.state.index}`);
      if (Actions.state.index > 1) {
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
  _componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid.bind(this));
  }
  handleBackButton() {
        ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
  }
}
