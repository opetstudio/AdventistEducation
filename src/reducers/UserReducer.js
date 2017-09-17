import {
  USER_SAVE_DATA_IN_PROGRESS,
  USER_SAVE_DATA_SUCCESS,
  USER_SAVE_DATA_ERROR,
  USER_SAVE_DATA_INTERNAL_ERROR,
  USER_FETCH_ALL,
  USER_FETCH_ALL_STATIC_DATA,
  USER_UPDATE_DATA_IN_PROGRESS,
  USER_UPDATE_DATA_SUCCESS,
  USER_UPDATE_DATA_ERROR,
  USER_UPDATE_DATA_INTERNAL_ERROR,
  USER_DELETE_DATA_IN_PROGRESS,
  USER_DELETE_DATA_SUCCESS,
  USER_DELETE_DATA_ERROR,
  USER_DELETE_DATA_INTERNAL_ERROR,
  USER_FETCH_ONE,
  USER_OPEN_MODAL_FORM_UPDATE,
  USER_SET_MODAL_FORM_PHOTO,
  USER_CLOSE_MODAL_FORM,
  USER_OPEN_MODAL_FORM,
  USER_OPEN_FORM_UPDATE,
  USER_REDUCER_RESET
} from '../constants';

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
    case USER_REDUCER_RESET:
      return {
        ...INITIAL_STATE
      };
    case USER_SAVE_DATA_IN_PROGRESS:
      return {
        ...state,
        saveDataInProgress: true
      };
    case USER_UPDATE_DATA_IN_PROGRESS:
      return {
        ...state,
        updateDataInProgress: true
      };
    case USER_FETCH_ALL:
      return {
        ...state,
        saveDataInProgress: false,
        listData: action.payload
      };
    case USER_FETCH_ALL_STATIC_DATA:
      return {
        ...state,
        saveDataInProgress: false,
        listData: action.payload
      };
    case USER_FETCH_ONE:
      return {
        ...state,
        dataDetail: action.payload
      };
    case USER_OPEN_MODAL_FORM_UPDATE:
      return {
        ...state,
        dataDetail: action.payload,
        formModalOpen: true,
        formMessage: 'Masukan data dengan baik dan benar.',
        isFormModalError: false
      };
    case USER_OPEN_FORM_UPDATE:
      return {
        ...state,
        dataDetail: action.payload,
        formMessage: 'Masukan data dengan baik dan benar.',
        isFormModalError: false,
        isFormModalSuccess: false
      };
    case USER_CLOSE_MODAL_FORM:
      return {
        ...state,
        dataDetail: {},
        formModalOpen: false,
        formMessage: '',
        isFormModalError: false,
        isFormModalSuccess: false
      };
    case USER_OPEN_MODAL_FORM:
      return {
        ...state,
        dataDetail: {},
        detailPhotoBuffer: '',
        formModalOpen: true,
        formMessage: 'Input data siswa dengan baik dan benar.',
        isFormModalError: false
      };
    case USER_SET_MODAL_FORM_PHOTO:
      return {
        ...state,
        detailPhotoBuffer: `data:image/png;base64, ${action.payload}`
      };
    case USER_SAVE_DATA_SUCCESS:
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
    case USER_SAVE_DATA_ERROR:
      return {
        ...state,
        dataDetail: action.payload.newDoc,
        saveDataInProgress: false,
        isFormModalError: !action.payload.status,
        isFormModalSuccess: action.payload.status,
        formMessage: action.payload.message
      };
    case USER_SAVE_DATA_INTERNAL_ERROR:
      return {
        ...state,
        dataDetail: action.payload.newDoc,
        saveDataInProgress: false,
        isFormModalError: !action.payload.status,
        isFormModalSuccess: action.payload.status,
        formMessage: action.payload.message
      };
    case USER_UPDATE_DATA_SUCCESS:
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
    case USER_UPDATE_DATA_ERROR:
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
    case USER_UPDATE_DATA_INTERNAL_ERROR:
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
    case USER_DELETE_DATA_IN_PROGRESS:
      return {
        ...state,
        deleteDataInProgress: true
      };
    case USER_DELETE_DATA_SUCCESS:
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
    case USER_DELETE_DATA_ERROR:
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
    case USER_DELETE_DATA_INTERNAL_ERROR:
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
