import {
  GURUSTAFF_SAVE_DATA_IN_PROGRESS,
  GURUSTAFF_SAVE_DATA_SUCCESS,
  GURUSTAFF_SAVE_DATA_ERROR,
  GURUSTAFF_SAVE_DATA_INTERNAL_ERROR,
  GURUSTAFF_FETCH_ALL,
  GURUSTAFF_UPDATE_DATA_IN_PROGRESS,
  GURUSTAFF_UPDATE_DATA_SUCCESS,
  GURUSTAFF_UPDATE_DATA_ERROR,
  GURUSTAFF_UPDATE_DATA_INTERNAL_ERROR,
  GURUSTAFF_DELETE_DATA_IN_PROGRESS,
  GURUSTAFF_DELETE_DATA_SUCCESS,
  GURUSTAFF_DELETE_DATA_ERROR,
  GURUSTAFF_DELETE_DATA_INTERNAL_ERROR,
  GURUSTAFF_FETCH_ONE,
  GURUSTAFF_OPEN_MODAL_FORM_UPDATE,
  GURUSTAFF_SET_MODAL_FORM_PHOTO,
  GURUSTAFF_CLOSE_MODAL_FORM,
  GURUSTAFF_OPEN_MODAL_FORM
} from '../constants';
import { REHYDRATE } from 'redux-persist/constants'; //persist/REHYDRATE

const INITIAL_STATE = {
  listData: [],
  saveDataInProgress: false,
  updateDataInProgress: false,
  deleteDataInProgress: false,
  formMessage: '',
  submitDataStatus: false,
  dataDetail: {},
  formModalOpen: false,
  isFormModalError: false,
  isFormModalSuccess: false,
  detailPhotoBuffer: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case REHYDRATE:
    // console.log('===>', REHYDRATE);
    //   return {
    //     ...INITIAL_STATE
    //   };
    case GURUSTAFF_SAVE_DATA_IN_PROGRESS:
      return {
        ...state,
        saveDataInProgress: true
      };
    case GURUSTAFF_UPDATE_DATA_IN_PROGRESS:
      return {
        ...state,
        updateDataInProgress: true
      };
    case GURUSTAFF_FETCH_ALL:
      return {
        ...state,
        saveDataInProgress: false,
        listData: action.payload
      };
    case GURUSTAFF_FETCH_ONE:
      return {
        ...state,
        dataDetail: action.payload
      };
    case GURUSTAFF_OPEN_MODAL_FORM_UPDATE:
      return {
        ...state,
        dataDetail: action.payload,
        formModalOpen: true,
        formMessage: 'Masukan data dengan baik dan benar.',
        isFormModalError: false
      };
    case GURUSTAFF_CLOSE_MODAL_FORM:
      return {
        ...state,
        dataDetail: {},
        formModalOpen: false,
        formMessage: '',
        isFormModalError: false,
        isFormModalSuccess: false
      };
    case GURUSTAFF_OPEN_MODAL_FORM:
      return {
        ...state,
        dataDetail: {},
        detailPhotoBuffer: '',
        formModalOpen: true,
        formMessage: 'Input data siswa dengan baik dan benar.',
        isFormModalError: false
      };
    case GURUSTAFF_SET_MODAL_FORM_PHOTO:
      return {
        ...state,
        detailPhotoBuffer: `data:image/png;base64, ${action.payload}`
      };
    case GURUSTAFF_SAVE_DATA_SUCCESS:
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
    case GURUSTAFF_SAVE_DATA_ERROR:
      return {
        ...state,
        dataDetail: action.payload.newDoc,
        saveDataInProgress: false,
        isFormModalError: !action.payload.status,
        isFormModalSuccess: action.payload.status,
        formMessage: action.payload.message
      };
    case GURUSTAFF_SAVE_DATA_INTERNAL_ERROR:
      return {
        ...state,
        dataDetail: action.payload.newDoc,
        saveDataInProgress: false,
        isFormModalError: !action.payload.status,
        isFormModalSuccess: action.payload.status,
        formMessage: action.payload.message
      };
    case GURUSTAFF_UPDATE_DATA_SUCCESS:
      // state.listData.push(action.payload);
      console.log('current state data==>', state.listData);
      console.log('old data==>', action.oldData);
      console.log('new data==>', action.payload.updatedData);
      console.log('indexOf data==>', state.listData.indexOf(action.oldData));
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
    case GURUSTAFF_UPDATE_DATA_ERROR:
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
    case GURUSTAFF_UPDATE_DATA_INTERNAL_ERROR:
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
    case GURUSTAFF_DELETE_DATA_IN_PROGRESS:
      return {
        ...state,
        deleteDataInProgress: true
      };
    case GURUSTAFF_DELETE_DATA_SUCCESS:
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
    case GURUSTAFF_DELETE_DATA_ERROR:
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
    case GURUSTAFF_DELETE_DATA_INTERNAL_ERROR:
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
    default:
      return state;
  }
};
