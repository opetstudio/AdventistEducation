import { saveAbsen } from '../api';

export const saveData = (data, neDBDataPath) => {
  console.log('');
  return (dispatch) => {
    dispatch({ type: 'saveDataInProgress', payload: data });
    saveAbsen(data, neDBDataPath).then((saveDataResponse) => {
        dispatch({ type: 'saveDataSuccess', payload: saveDataResponse.status });
    }).catch((err) => console.log('err:', err));
  };
};
