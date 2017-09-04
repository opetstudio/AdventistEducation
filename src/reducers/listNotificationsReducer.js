import {
  LIST_NOTIFICATIONS
} from '../constants';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_NOTIFICATIONS:
      
      return action.payload;
    default:
      return state;
  }
};
