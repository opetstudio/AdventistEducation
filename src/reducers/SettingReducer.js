import {
  SAVE_SETTING
} from '../constants';

const INITIAL_STATE = {
  neDBDataPath: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_SETTING:
      return {
        ...state,
        neDBDataPath: action.data.neDBDataPath
      };
    default:
      return state;
  }
};
