import { saveUser } from '../api';

export const saveData = (data) => {
  console.log('');
  return (dispatch) => {
    dispatch({ type: 'saveDataInProgress', payload: data });
    saveUser(data).then((saveUserResponse) => {
        dispatch({ type: 'saveDataSuccess', payload: saveUserResponse.status });
    }).catch((err) => console.log('err:', err));
  };
};
