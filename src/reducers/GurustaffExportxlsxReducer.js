import {
  GURUSTAFF_FETCH_ALL_EXPORT_TO_XLSX,
  GURUSTAFF_FETCH_ALL_EXPORT_TO_XLSX_SUCCESS,
  GURUSTAFF_FETCH_ALL_EXPORT_TO_XLSX_FAILED,
  GURUSTAFF_FETCH_ALL_EXPORT_TO_XLSX_ERROR,
} from '../constants';
import { REHYDRATE } from 'redux-persist/constants'; //persist/REHYDRATE

const INITIAL_STATE = {
  exportToXlsxInProgress: false,
  exportToXlsxInMessage: '',
  openModal: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case REHYDRATE:
    // console.log('===>', REHYDRATE);
    //   return {
    //     ...INITIAL_STATE
    //   };
    case GURUSTAFF_FETCH_ALL_EXPORT_TO_XLSX:
      return {
        ...state,
        exportToXlsxInProgress: true,
        openModal: true,
        exportToXlsxInMessage: action.payload
      };
    case GURUSTAFF_FETCH_ALL_EXPORT_TO_XLSX_SUCCESS:
      return {
        ...state,
        exportToXlsxInProgress: false,
        openModal: false,
        exportToXlsxInMessage: action.payload
      };
    case GURUSTAFF_FETCH_ALL_EXPORT_TO_XLSX_FAILED:
      return {
        ...state,
        exportToXlsxInProgress: false,
        openModal: false,
        exportToXlsxInMessage: action.payload
      };
    case GURUSTAFF_FETCH_ALL_EXPORT_TO_XLSX_ERROR:
      return {
        ...state,
        exportToXlsxInProgress: false,
        openModal: false,
        exportToXlsxInMessage: action.payload
      };

    default:
      return state;
  }
};
