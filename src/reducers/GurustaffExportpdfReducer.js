import {
  GURUSTAFF_FETCH_ALL_EXPORT_TO_PDF,
  GURUSTAFF_FETCH_ALL_EXPORT_TO_PDF_SUCCESS,
  GURUSTAFF_FETCH_ALL_EXPORT_TO_PDF_FAILED,
  GURUSTAFF_FETCH_ALL_EXPORT_TO_PDF_ERROR,
} from '../constants';
import { REHYDRATE } from 'redux-persist/constants'; //persist/REHYDRATE

const INITIAL_STATE = {
  exportToPdfInProgress: false,
  exportToPdfInMessage: '',
  openModal: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case REHYDRATE:
    // console.log('===>', REHYDRATE);
    //   return {
    //     ...INITIAL_STATE
    //   };
    case GURUSTAFF_FETCH_ALL_EXPORT_TO_PDF:
      return {
        ...state,
        exportToPdfInProgress: true,
        openModal: true,
        exportToPdfInMessage: action.payload
      };
    case GURUSTAFF_FETCH_ALL_EXPORT_TO_PDF_SUCCESS:
      return {
        ...state,
        exportToPdfInProgress: false,
        openModal: false,
        exportToPdfInMessage: action.payload
      };
    case GURUSTAFF_FETCH_ALL_EXPORT_TO_PDF_FAILED:
      return {
        ...state,
        exportToPdfInProgress: false,
        openModal: false,
        exportToPdfInMessage: action.payload
      };
    case GURUSTAFF_FETCH_ALL_EXPORT_TO_PDF_ERROR:
      return {
        ...state,
        exportToPdfInProgress: false,
        openModal: false,
        exportToPdfInMessage: action.payload
      };

    default:
      return state;
  }
};
