import {
  FETCH_ALL_DATA_ABSEN_SISWA_SUCCESS,
  FETCH_ALL_DATA_ABSEN_GURU_SUCCESS
} from '../constants';

const INITIAL_STATE = {
  ListAbsen: [],
  ListAbsenTeachers: [],
  saveDataInProgress: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_DATA_ABSEN_SISWA_SUCCESS:
      return {
        ...state,
        saveDataInProgress: false,
        ListAbsen: action.payload
      };
    case FETCH_ALL_DATA_ABSEN_GURU_SUCCESS:
      return {
        ...state,
        saveDataInProgress: false,
        ListAbsenTeachers: action.payload
      };
    default:
      return state;
  }
};
