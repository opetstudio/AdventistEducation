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
  router
});
export default rootReducer;
