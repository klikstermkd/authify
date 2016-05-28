import * as actions from '../actions';

const initialState = {
  auth: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return { auth: true };
    case actions.REGISTER_SUCCESS:
      return { auth: true };
    case actions.LOGOUT:
      return { auth: false };
    default:
      return state;
  }
};