import b64 from 'base-64';

import {
  LOADING_DATA_USERS_IN_PROGRESS,
  MODIFY_LOADING_DATA_USERS_IN_PROGRESS,
  LOADING_DATA_USERS_DONE,
  SETTING_SET_NO_PHOTO
} from '../constants';

import {
  openImageApi
} from '../api';

export const modifyLoadingDataUsersInProgress = (status) => {
  console.log('modifyLoadingDataUsersInProgress');
  return dispatch => {
    dispatch({ type: MODIFY_LOADING_DATA_USERS_IN_PROGRESS, payload: status });
  };
};
export const loadingDataUsers = () => {
  console.log('loadingDataUsers');
  return dispatch => {
    dispatch({ type: LOADING_DATA_USERS_IN_PROGRESS });
    const users = [
      { username: 'opetstudio', password: b64.encode('123456') },
      { username: 'root', password: b64.encode('Password123') },
      { username: 'vina', password: b64.encode('123456') }
    ];
    loadingDataUsersDone(dispatch, users);

    // firebase.auth().signInWithEmailAndPassword(email, password)
    //   .then(value => loginUserSuccess(dispatch))
    //   .catch(error => loginUserError(error, dispatch));
  };
};

const loadingDataUsersDone = (dispatch, users) => {
  dispatch({ type: LOADING_DATA_USERS_DONE, payload: users });
};
