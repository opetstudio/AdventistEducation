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
import GurustaffExportcsvReducer from './GurustaffExportcsvReducer';
import GurustaffExportxlsxReducer from './GurustaffExportxlsxReducer';
import AbsenReducer from './AbsenReducer';
import DataAbsenReducer from './DataAbsenReducer';
import UserReducer from './UserReducer';

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
  GurustaffExportcsvReducer,
  GurustaffExportxlsxReducer,
  AbsenReducer,
  UserReducer,
  router
});
export default rootReducer;
