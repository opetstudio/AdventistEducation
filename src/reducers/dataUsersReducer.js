import {
  LOADING_DATA_USERS_IN_PROGRESS,
  LOADING_DATA_USERS_DONE,
  MODIFY_LOADING_DATA_USERS_IN_PROGRESS
} from '../constants';

const INITIAL_STATE = {
  loadingDataUsersInProgress: true,
  dataUsers: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODIFY_LOADING_DATA_USERS_IN_PROGRESS:
      return {
        ...state,
        loadingDataUsersInProgress: action.payload
      };
    case LOADING_DATA_USERS_IN_PROGRESS:
      return {
        ...state,
        loadingDataUsersInProgress: true
      };
    case LOADING_DATA_USERS_DONE:
      return {
        ...state,
        loadingDataUsersInProgress: false,
        dataUsers: action.payload
      };
    default:
      return state;
  }
};
