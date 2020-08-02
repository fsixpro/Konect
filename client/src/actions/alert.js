import { v4 as uuid } from 'uuid';
import { SET_ALERT, CLEAR_ALERT } from './types';
const id = uuid();
export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: CLEAR_ALERT, payload: id }), 3500);
};

export const clearAlert = (msg, alertType) => dispatch => {
  dispatch({
    type: CLEAR_ALERT,
    payload: id,
  });
};
