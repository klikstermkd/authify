import * as actions from './actions';

export const initApp = () => ({ type: actions.INIT_APP });
export const register = (email, password) => (event) => {
  event.preventDefault();
  return { type: actions.REGISTER_REQUEST, email, password };
};
export const login = (email, password) => (event) => {
  event.preventDefault();
  return { type: actions.LOGIN_REQUEST, email, password };
};
export const registerError = (error) => ({ type: actions.REGISTER_ERROR, error });
export const loginError = (error) => ({ type: actions.LOGIN_ERROR, error });