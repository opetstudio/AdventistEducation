import {
  SAVE_DATA_SISWA
} from '../constants';

const INITIAL_STATE = {
  ListDataSiswa: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_DATA_SISWA:
      state.ListDataSiswa[action.payload.nis] = action.payload;
      return {
        ...state
      };
    default:
      return state;
  }
};
