import { REGISTER_SUUCESS, REGISTER_FAIL } from '../actions/types';
const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUUCESS:
      return { ...state, payload };

    default:
      return state;
  }
};
