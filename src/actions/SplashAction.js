import b64 from 'base-64';

import {
  LOADING_DATA_USERS_IN_PROGRESS,
  MODIFY_LOADING_DATA_USERS_IN_PROGRESS,
  LOADING_DATA_USERS_DONE
} from '../constants';

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
    setTimeout(() => {
      const users = [
        { username: 'opetstudio', password: b64.encode('123456') },
        { username: 'vina', password: b64.encode('123456') }
      ];
      loadingDataUsersDone(dispatch, users);
    }, 5000);
    // firebase.auth().signInWithEmailAndPassword(email, password)
    //   .then(value => loginUserSuccess(dispatch))
    //   .catch(error => loginUserError(error, dispatch));
  };
};

const loadingDataUsersDone = (dispatch, users) => {
  dispatch({ type: LOADING_DATA_USERS_DONE, payload: users });
};
