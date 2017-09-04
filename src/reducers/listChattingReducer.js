import {
  LIST_USER_CHATTING
} from '../constants';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST_USER_CHATTING:
      return action.payload;
    default:
      return state;
  }
};
