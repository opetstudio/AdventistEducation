'use strict';
import firebase from 'firebase';
import { Actions, ActionConst } from 'react-native-router-flux';
import {
  BackHandler,
  AppState,
  ToastAndroid,
  Alert,
  DeviceEventEmitter
} from 'react-native';

import Base from './LoginBase.native';
import BackbuttonHandler from '../../BackbuttonHandler';

export default class LoginBase extends Base {
  // const backButtonPressedOnceToExit = false;
  _componentWillMount() {
    // Actions.refresh();
    // this.backButtonPressedOnceToExit = false;
    // alert('LoginBase.componentWillMount invoked');
    // this.setState({
    //   section: 1
    // });
    // this.props.loginProgressStop();
    // this.props.resetAuthenticationReducer();

    // BackAndroid.addEventListener('hardwareBackPress', () => {
    //   ToastAndroid.show('Back again to exit', ToastAndroid.SHORT);
    //   // if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
    //   //   alert('cek');
    //   //   return true;
    //   // }
    //   // alert('cok ');
    //   console.log(AppState.currentState);
    //   return BackAndroid.exitApp();
    //   // return Actions.pop();
    //   // return false;
    // });
    // const that = this;
    // let self = this;
    // alert(Actions.state.index);
    // alert('aviaca');
    // alert(this.props.routeName);
    // console.log('prooooopsss=>', this.props);
    // BackbuttonHandler.componentWillMount();
    // BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));

    // // BackHandler.addEventListener('hardwareBackPress', this.backHandler);
    // BackHandler.addEventListener('hardwareBackPress', () => {
    //   // alert('back press');
    //   // Actions.pop();
    //   BackHandler.exitApp();
    //   return true;
    // });
    // BackHandler.removeEventListener('hardwareBackPress');
    // BackHandler.addEventListener('hardwareBackPress', this.backHandler);
    // BackHandler.addEventListener('hardwareBackPress', () => {
    //   // if (self.props.nav.index > 0) {
    //   //   this.props.dispatch({ type:"Navigation/BACK" });
    //   //   return true;
    //   // }
    //   Alert.alert(
    //     'Exit App',
    //     'Exiting the application?',
    //     [
    //       { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
    //       {
    //         text: 'OK',
    //         onPress: () => BackHandler.exitApp()
    //         // onPress: () => DeviceEventManager.invokeDefaultBackPressHandler()
    //       }
    //     ],
    //     {
    //       cancelable: false
    //     }
    //   );
    //   return true;
    // });

    // BackHandler.addEventListener('hardwareBackPress', () => {
    //   BackHandler.exitApp();
    //   BackHandler.removeEventListener('hardwareBackPress', () => true);
    //   return true;
    // });
    // BackHandler.addEventListener('hardwareBackPress', function () {
    //   // this.onMainScreen and this.goBack are just examples,
    //   //you need to use your own implementation here
    //  // Typically you would use the navigator here to go to the last state.
    //
    //  if (!that.onMainScreen()) {
    //   //  alert('[LoginBase.componentWillMount] onMainScreen');
    //   //  this.goBack();
    //   //  return true;
    //  }
    //  alert('[LoginBase.componentWillMount] not onMainScreen');
    //
    //  BackHandler.exitApp();
    //
    //  return true;
    // });
  }
  backHandler() {
      // alert('backHandler');
      Alert.alert(
        'Exit App',
        'Exiting the application?',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          {
            text: 'OK',
            // onPress: () => BackHandler.exitApp()
            onPress: () => Actions.pop()
            // onPress: () => true
            // onPress: () => DeviceEventManager.invokeDefaultBackPressHandler()
          }
        ],
        {
          cancelable: false
        }
      );
      return false;
  }
  _componentWillUnmount() {
    // BackbuttonHandler.componentWillUnmount();
      // alert('login componentWillUnmount');
      // BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
      // BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
        // BackHandler.removeEventListener('hardwareBackPress');
        // DeviceEventEmitter.removeAllListeners();
    }

  onBackAndroid() {
    // alert(`backButton ${this.props.name} ${Actions.state.index}`);
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
