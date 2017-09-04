import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from '../constants';

const initialState = {
  data: [],
  dataFetched: false,
  isFetching: false,
  error: false
};

// type actionType = {
//   type: string,
//   data: []
// };

const usersReducer = (state = initialState, action: {type: string, data: []}) => {
  // console.log('[reducers/dataReducer.dataReducer] invoked');
  // console.log('[reducers/dataReducer.dataReducer] state=', state);
  // console.log('[reducers/dataReducer.dataReducer] action=', action);
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        data: [],
        isFetching: true
      };
    case FETCHING_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data
      };
    case FETCHING_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    default:
      return state;
  }
};
export default usersReducer;
