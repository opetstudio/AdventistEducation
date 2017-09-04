import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import firebase from 'firebase';
import PushNotification from 'react-native-push-notification';
import { View, Text, StyleSheet, Picker, AppState, Platform } from 'react-native';
import reactContacs from 'react-native-contacts';

import * as authenticationAction from '../../actions/AuthenticationActions';
import * as AppActions from '../../actions/AppActions';
import Render from './Homev2Render';
import Base from './Homev2Base';


class Homev2 extends Base {
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Chats' },
      { key: '2', title: 'Contacts' },
    ],
  };
  constructor(props) {
    console.log('[Homev2.constructor]');
    super(props);
    this._handleAppStateChange = this._handleAppStateChange.bind(this);
    this._handleIndexChange = this._handleIndexChange.bind(this);
    // this.state = {
    //   seconds: 5,
    // };
  }
  componentDidMount() {
    console.log('[Homev2.componentDidMount]');
    // reactContacs.getAll((err, contacts) => {
    //   if (err === 'denied') {
    //     // error
    //     alert(err);
    //     console.log('[Homev2.componentDidMount] error, tidak bisa baca contacts');
    //   } else {
    //     // contacts returned in []
    //     alert(`success daftar contacts ${JSON.stringify(contacts)}`);
    //     console.log('[Homev2.componentDidMount] success daftar contacts ');
    //   }
    // });
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  componentWillUnmount() {
    console.log('[Homev2.componentWillUnmount]');
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  componentWillMount() {
    console.log('[Homev2.componentWillMount]');
    // this.props.AppActions.userChatsFetch(nextProps.contactEmail);
    // this.props.resetAuthenticationReducer();
    // this._setListenToChat();
    this._componentWillMount();
    this.props.listenToNotification();
  }
  componentWillReceiveProps(nextProps) {
    console.log('[Homev2.componentWillReceiveProps] ==>', nextProps);
    // alert('propssssss');
    // this._setListenToChat();
    // this.props.listenToNotification();
  }
  _handleAppStateChange(appState) {
      // console.log(`_handleAppStateChange ${appState}`);
      // const { currentUser } = firebase.auth();
      // if (currentUser !== null) {
      //   const message = {
      //     title: 'app change state',
      //     content: `${currentUser.email}  change state to ${appState}`
      //   };
      //   this.props.pushNotification(message);
      // }
    if (appState === 'background') {
      let date = new Date(Date.now() + (1 * 1000));

      // if (Platform.OS === 'ios') {
      //   date = date.toISOString();
      // }

      // PushNotification.localNotificationSchedule({
      //   message: "My Notification Message",
      //   date,
      // });
    } else {
      //push notif
    }
  }
  // _setListenToChat() {
  //   console.log('daftar contacts ', this.props.contacts);
  //   const self = this;
  //   if (firebase.auth().currentUser != null) {
  //     this.props.contacts.forEach((v) => {
  //       self.props.userChatsFetch(v.email);
  //     });
  //   }
  // }
  _handleIndexChange(index) {
    this.setState({ index });
  }
  render() {
    return Render.call(this, this.props, this.state);
  }
}

function mapStateToProps(state) {
  // const contacts = _.map(state.listContactsReducer, (val, uid) => {
  //   console.log('');
  //   return { ...val, uid };
  // });
  // const chats = _.map(state.listChattingReducer, (val, uid) => {
  //   console.log('');
  //   // console.log('val ===> ', val);
  //   return { ...val, uid };
  // });
  const notifications = _.map(state.listNotificationsReducer, (val, uid) => {
    console.log('');
    // console.log('val ===> ', val);
    return { ...val, uid };
  });
  return {
    notifications,
    authenticationReducer: state.authenticationReducer,
    appReducer: state.appReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...authenticationAction, ...AppActions }, dispatch);

  // return {
  //   fetchData: () => dispatch(fetchData())
  // };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homev2);
