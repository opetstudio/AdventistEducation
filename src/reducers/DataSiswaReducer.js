import {
  SAVE_DATA_SISWA_IN_PROGRESS,
  SAVE_DATA_SISWA,
  FETCH_ALL_DATA_SISWA
} from '../constants';

const INITIAL_STATE = {
  ListDataSiswa: [],
  saveDataInProgress: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_DATA_SISWA_IN_PROGRESS:
      console.log('SAVE_DATA_SISWA_IN_PROGRESS');
      return {
        ...state,
        saveDataInProgress: true
      };
    case FETCH_ALL_DATA_SISWA:
      console.log('SAVE_DATA_SISWA_IN_PROGRESS');
      return {
        ...state,
        saveDataInProgress: false,
        ListDataSiswa: action.payload
      };
    case SAVE_DATA_SISWA:
    console.log('SAVE_DATA_SISWA');
      state.ListDataSiswa.push(action.payload);
      return {
        ...state,
        saveDataInProgress: false
      };
    default:
      return state;
  }
};
