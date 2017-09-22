import {
  GURUSTAFF_FETCH_ALL_EXPORT_TO_CSV,
  GURUSTAFF_FETCH_ALL_EXPORT_TO_CSV_SUCCESS,
  GURUSTAFF_FETCH_ALL_EXPORT_TO_CSV_FAILED,
  GURUSTAFF_FETCH_ALL_EXPORT_TO_CSV_ERROR,
} from '../constants';
import { REHYDRATE } from 'redux-persist/constants'; //persist/REHYDRATE

const INITIAL_STATE = {
  exportToCsvInProgress: false,
  exportToCsvInMessage: '',
  openModal: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case REHYDRATE:
    // console.log('===>', REHYDRATE);
    //   return {
    //     ...INITIAL_STATE
    //   };
    case GURUSTAFF_FETCH_ALL_EXPORT_TO_CSV:
      return {
        ...state,
        exportToCsvInProgress: true,
        openModal: true,
        exportToCsvInMessage: action.payload
      };
    case GURUSTAFF_FETCH_ALL_EXPORT_TO_CSV_SUCCESS:
      return {
        ...state,
        exportToCsvInProgress: false,
        openModal: false,
        exportToCsvInMessage: action.payload
      };
    case GURUSTAFF_FETCH_ALL_EXPORT_TO_CSV_FAILED:
      return {
        ...state,
        exportToCsvInProgress: false,
        openModal: false,
        exportToCsvInMessage: action.payload
      };
    case GURUSTAFF_FETCH_ALL_EXPORT_TO_CSV_ERROR:
      return {
        ...state,
        exportToCsvInProgress: false,
        openModal: false,
        exportToCsvInMessage: action.payload
      };

    default:
      return state;
  }
};
