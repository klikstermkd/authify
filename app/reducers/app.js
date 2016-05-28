import * as actions from '../actions';

const initialState = {
  register: {
    errorMessage: '',
    isLoading: false,
    success: false
  },
  login: {
    errorMessage: '',
    isLoading: false,
    success: false
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_FIREBASE_REF:
      return {
        ...state,
        firebaseRef: action.ref
      };
    case actions.REGISTER_REQUEST:
      return {
        ...state,
        register: { 
          errorMessage: '', 
          isLoading: true,
          success: false 
        }
      };
    case actions.REGISTER_SUCCESS:
      return {
        ...state,
        register: { 
          errorMessage: '', 
          isLoading: false,
          success: true 
        }
      };
    case actions.REGISTER_ERROR:
      return {
        ...state,
        register: { 
          errorMessage: action.error, 
          isLoading: false,
          success: false 
        }
      };
      case actions.RESET_REGISTER_ERROR:
        return {
          ...state,
          register: { 
            ...state.register,
            errorMessage: ''
          }
        };
      case actions.LOGIN_REQUEST:
        return {
          ...state,
          login: { 
            errorMessage: '', 
            isLoading: true,
            success: false 
          }
        };
      case actions.LOGIN_SUCCESS:
        return {
          ...state,
          login: { 
            errorMessage: '', 
            isLoading: false,
            success: true 
          }
        };
      case actions.LOGIN_ERROR:
        return {
          ...state,
          login: { 
            errorMessage: action.error, 
            isLoading: false,
            success: false 
          }
        };
        case actions.RESET_LOGIN_ERROR:
          return {
            ...state,
            login: { 
              ...state.login,
              errorMessage: ''
            }
          };
    default:
      return state;
  }
};