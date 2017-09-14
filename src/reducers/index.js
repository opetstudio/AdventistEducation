import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import dataReducer from './dataReducer';
import usersReducer from './usersReducer';
import authenticationReducer from './authenticationReducer';
import appReducer from './appReducer';
import sessionReducer from './sessionReducer';

import listContactsReducer from './listContactsReducer';
import listChattingReducer from './listChattingReducer';
import listChatsReducer from './listChatsReducer';

import listNotificationsReducer from './listNotificationsReducer';
import dataUsersReducer from './dataUsersReducer';
import SettingReducer from './SettingReducer';
import DataSiswaReducer from './DataSiswaReducer';
import GurustaffReducer from './GurustaffReducer';
import DataAbsenReducer from './DataAbsenReducer';

const rootReducer = combineReducers({
  appReducer,
  dataReducer,
  usersReducer,
  sessionReducer,
  authenticationReducer,
  listContactsReducer,
  listChattingReducer,
  listChatsReducer,
  listNotificationsReducer,
  dataUsersReducer,
  SettingReducer,
  DataSiswaReducer,
  DataAbsenReducer,
  GurustaffReducer,
  router
});
export default rootReducer;
