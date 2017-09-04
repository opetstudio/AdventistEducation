'use strict';

import {
  ToastAndroid
} from 'react-native';

import Base from './AddcontactBase.native';

export default class AddcontactBase extends Base {
  handleBackButton() {
        ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }
}
