import {
  ABSEN_SAVE_DATA_IN_PROGRESS,
  ABSEN_SAVE_DATA_SUCCESS,
  ABSEN_SAVE_DATA_ERROR,
  ABSEN_SAVE_DATA_INTERNAL_ERROR,
  ABSEN_FETCH_ALL,
  ABSEN_FETCH_ALL_GURUSTAFF,
  ABSEN_FETCH_ALL_SISWA,
  ABSEN_UPDATE_DATA_IN_PROGRESS,
  ABSEN_UPDATE_DATA_SUCCESS,
  ABSEN_UPDATE_DATA_ERROR,
  ABSEN_UPDATE_DATA_INTERNAL_ERROR,
  ABSEN_DELETE_DATA_IN_PROGRESS,
  ABSEN_DELETE_DATA_SUCCESS,
  ABSEN_DELETE_DATA_ERROR,
  ABSEN_DELETE_DATA_INTERNAL_ERROR,
  ABSEN_FETCH_ONE,
  ABSEN_OPEN_MODAL_FORM_UPDATE,
  ABSEN_SET_MODAL_FORM_PHOTO,
  ABSEN_CLOSE_MODAL_FORM,
  ABSEN_OPEN_MODAL_FORM,
  ABSEN_INPUT_SCANNER_ID_ON_CHANGE,
  ABSEN_SET_DATA_DETAIL,
  ABSEN_CLEAR_DATA_DETAIL,
  ABSEN_SET_INPUT_TEXT_FROM_EMPTY
} from '../constants';
import { REHYDRATE } from 'redux-persist/constants'; //persist/REHYDRATE

const INITIAL_STATE = {
  listData: [],
  listDataGurustaff: [],
  listDataSiswa: [],
  saveDataInProgress: false,
  updateDataInProgress: false,
  deleteDataInProgress: false,
  formMessage: '',
  submitDataStatus: false,
  dataDetail: {},
  formModalOpen: false,
  isFormModalError: false,
  isFormModalSuccess: false,
  detailPhotoBuffer: '',
  inputScannerId: '',
  isInputTextFromEmpty: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case REHYDRATE:
    //   console.log('===>', REHYDRATE);
    //   return {
    //     ...INITIAL_STATE
    //   };
    case ABSEN_SAVE_DATA_IN_PROGRESS:
      return {
        ...state,
        saveDataInProgress: true
      };
    case ABSEN_UPDATE_DATA_IN_PROGRESS:
      return {
        ...state,
        updateDataInProgress: true
      };
    case ABSEN_SET_INPUT_TEXT_FROM_EMPTY:
      return {
        ...state,
        isInputTextFromEmpty: action.payload
      };
    case ABSEN_FETCH_ALL:
      return {
        ...state,
        saveDataInProgress: false,
        listData: action.payload,
      };
    case ABSEN_FETCH_ALL_GURUSTAFF:
      console.log('ABSEN_FETCH_ALL_GURUSTAFF ==>', action.payload);
      return {
        ...state,
        saveDataInProgress: false,
        listDataGurustaff: action.payload,
      };
    case ABSEN_FETCH_ALL_SISWA:
    console.log('ABSEN_FETCH_ALL_SISWA ==>', action.payload);
      return {
        ...state,
        saveDataInProgress: false,
        listDataSiswa: action.payload,
      };
    case ABSEN_FETCH_ONE:
      return {
        ...state,
        dataDetail: action.payload
      };
    case ABSEN_OPEN_MODAL_FORM_UPDATE:
      return {
        ...state,
        dataDetail: action.payload,
        formModalOpen: true,
        formMessage: 'Masukan data dengan baik dan benar.',
        isFormModalError: false
      };
    case ABSEN_CLOSE_MODAL_FORM:
      return {
        ...state,
        dataDetail: {},
        formModalOpen: false,
        formMessage: '',
        isFormModalError: false,
        isFormModalSuccess: false
      };
    case ABSEN_OPEN_MODAL_FORM:
      return {
        ...state,
        dataDetail: {},
        detailPhotoBuffer: '',
        formModalOpen: true,
        formMessage: 'Masukan data dengan baik dan benar.',
        isFormModalError: false
      };
    case ABSEN_SET_MODAL_FORM_PHOTO:
      return {
        ...state,
        detailPhotoBuffer: `data:image/png;base64, ${action.payload}`
      };
    case ABSEN_SAVE_DATA_SUCCESS:
      state.listData.push(action.payload.newDoc);
      return {
        ...state,
        dataDetail: action.payload.newDoc,
        saveDataInProgress: false,
        // isFormModalError: !action.payload.status,
        // isFormModalSuccess: action.payload.status,
        formMessage: action.payload.message,
        formModalOpen: false,
        isFormModalError: false,
        isFormModalSuccess: false
      };
    case ABSEN_CLEAR_DATA_DETAIL:
      return {
        ...state,
        dataDetail: {},
        saveDataInProgress: false,
        inputScannerId:'',
        // isFormModalError: !action.payload.status,
        // isFormModalSuccess: action.payload.status,
        formMessage: '',
        formModalOpen: false,
        isFormModalError: false,
        isFormModalSuccess: false,
        detailPhotoBuffer:''
      };
    case ABSEN_SAVE_DATA_ERROR:
      return {
        ...state,
        dataDetail: action.payload.newDoc,
        saveDataInProgress: false,
        isFormModalError: !action.payload.status,
        isFormModalSuccess: action.payload.status,
        formMessage: action.payload.message
      };
    case ABSEN_SAVE_DATA_INTERNAL_ERROR:
      return {
        ...state,
        dataDetail: action.payload.newDoc,
        saveDataInProgress: false,
        isFormModalError: !action.payload.status,
        isFormModalSuccess: action.payload.status,
        formMessage: action.payload.message
      };
    case ABSEN_UPDATE_DATA_SUCCESS:
      // state.listData.push(action.payload);
      // console.log('current state data==>', state.listData);
      // console.log('old data==>', action.oldData);
      // console.log('new data==>', action.payload.updatedData);
      // console.log('indexOf data==>', state.listData.indexOf(action.oldData));
      // state.listData.slice(state.listData.indexOf(action.oldData) + 1);
      state.listData.splice(state.listData.indexOf(action.oldData), 1);
      state.listData.push(action.payload.updatedData);

      return {
        ...state,
        updateDataInProgress: false,
        formMessage: action.payload.message,
        submitDataStatus: action.payload.status,
        dataDetail: action.payload.updatedData,
        isFormModalError: !action.payload.status,
        isFormModalSuccess: action.payload.status
      };
    case ABSEN_UPDATE_DATA_ERROR:
      // state.listData.push(action.payload);
      return {
        ...state,
        updateDataInProgress: false,
        dataDetail: action.payload.updatedData,
        formMessage: action.payload.message,
        submitDataStatus: action.payload.status,
        isFormModalError: !action.payload.status,
        isFormModalSuccess: action.payload.status
      };
    case ABSEN_UPDATE_DATA_INTERNAL_ERROR:
      // state.listData.push(action.payload);
      return {
        ...state,
        updateDataInProgress: false,
        dataDetail: action.payload.updatedData,
        formMessage: action.payload.message,
        submitDataStatus: action.payload.status,
        isFormModalError: !action.payload.status,
        isFormModalSuccess: action.payload.status
      };
    case ABSEN_DELETE_DATA_IN_PROGRESS:
      return {
        ...state,
        deleteDataInProgress: true
      };
    case ABSEN_DELETE_DATA_SUCCESS:
      // state.listData.push(action.payload);
      // console.log('current state data==>', state.listData);
      // console.log('old data==>', action.oldData);
      // console.log('new data==>', action.payload.updatedData);
      console.log('indexOf data==>', state.listData.indexOf(action.oldData));
      // state.listData.slice(state.listData.indexOf(action.oldData) + 1);
      state.listData.splice(state.listData.indexOf(action.oldData), 1);
      // state.listData.push(action.payload.updatedData);

      return {
        ...state,
        deleteDataInProgress: false,
        formMessage: action.payload.message,
        submitDataStatus: action.payload.status,
        dataDetail: {},
        formModalOpen: false,
        isFormModalError: false,
        isFormModalSuccess: false
      };
    case ABSEN_DELETE_DATA_ERROR:
      // state.listData.push(action.payload);
      return {
        ...state,
        deleteDataInProgress: false,
        // dataDetail: action.payload.updatedData,
        formMessage: action.payload.message,
        submitDataStatus: action.payload.status,
        isFormModalError: !action.payload.status,
        isFormModalSuccess: action.payload.status
      };
    case ABSEN_DELETE_DATA_INTERNAL_ERROR:
      // state.listData.push(action.payload);
      return {
        ...state,
        deleteDataInProgress: false,
        // dataDetail: action.payload.updatedData,
        formMessage: action.payload.message,
        submitDataStatus: action.payload.status,
        isFormModalError: !action.payload.status,
        isFormModalSuccess: action.payload.status
      };
      //OTHERS action
    case ABSEN_INPUT_SCANNER_ID_ON_CHANGE:
      return {
        ...state,
        inputScannerId: action.payload
      };
    case ABSEN_SET_DATA_DETAIL:
      return {
        ...state,
        dataDetail: action.payload,
        detailPhotoBuffer: action.photoBuffer
      };
    default:
      return state;
  }
};
