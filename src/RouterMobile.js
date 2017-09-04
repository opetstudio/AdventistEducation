import React, { Component } from 'react';
import { Router, Scene, Stack, ActionConst } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
// import { AsyncStorage } from 'react-native';
import {
  AsyncStorage,
  Alert,
  BackAndroid
} from 'react-native';

import firebase from 'firebase';
import PushNotification from 'react-native-push-notification';
// import { createStore } from 'redux';
// import reducer from './reducers';
import { configureStore } from './store/configureStore';


import Home from './pages/home/Home';
import Homev2 from './pages/homev2/Homev2';
import About from './pages/about/About';

import SignupPage from './pages/signup/Signup';
// import CounterPage from './pages/counter/Counter';
import MemberPage from './pages/member/Member';
import WelcomePage from './pages/welcome/Welcome';
import MainPage from './pages/main/Main';
import AddcontactPage from './pages/addcontact/Addcontact';
import ChatPage from './pages/chat/Chat';

const store = configureStore();
persistStore(store, { storage: AsyncStorage }, () => {
  console.log('restored');
});
// const store = createStore(reducer);


export default class RouterMobile extends Component {
  componentWillMount() {
    // Initialize Firebase
    if (!firebase.apps.length) {
      // firebase.initializeApp({});
      firebase.initializeApp({
        apiKey: 'AIzaSyBRfY8G4OSOapqJPOGzs4j7MaNskvl_CQc',
        authDomain: 'whatsapp-clone-dd7f3.firebaseapp.com',
        databaseURL: 'https://whatsapp-clone-dd7f3.firebaseio.com',
        projectId: 'whatsapp-clone-dd7f3',
        storageBucket: 'whatsapp-clone-dd7f3.appspot.com',
        messagingSenderId: '583288508388'
      });
    }
    PushNotification.configure({
      onNotification: notification => {
        console.log('notification', notification);
      }
    });
  }
  render() {
    const onExitApp = () => {
      Alert.alert(
        'Exit',
        'Are you sure you want to exit this app',
        [
          { text: 'Cancel', onPress: () => {} },
          { text: 'YES', onPress: () => BackAndroid.exitApp() },
        ]
      );
      return true;
    };
    return (
      <Provider store={store}>
        <Router
          onExitApp={onExitApp}
          sceneStyle={{ paddingTop: 0 }}
          navigationBarStyle={{ backgroundColor: '#115E54' }}
          titleStyle={{ color: '#fff' }}
        >
          <Stack key="root">
            <Scene
              key="main"
              component={MainPage}
              title="Main"
              hideNavBar
              initial
            />
            <Scene
              key="welcome"
              component={WelcomePage}
              title="Welcome"
              hideNavBar
            />
            <Scene
              key="signup"
              component={SignupPage}
              title="Signup"
            />
            <Scene
              key="homev2"
              component={Homev2}
              title="Homev2"
              hideNavBar
            />
            <Scene
              key="home"
              component={Home}
              title="Home"
            />
            <Scene
              key="about"
              component={About}
              title="About"
            />
            <Scene
              key="member"
              component={MemberPage}
              title="Member"
            />
            <Scene
              key="addcontact"
              component={AddcontactPage}
              title="Add Contact"
            />
            <Scene
              key="chat"
              component={ChatPage}
              title="Chat"
            />
          </Stack>
        </Router>
      </Provider>
    );
  }
}

// AppRegistry.registerComponent('app6', () => App);
