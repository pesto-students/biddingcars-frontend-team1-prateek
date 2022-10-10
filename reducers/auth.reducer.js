import { authConstants } from '../actions/constants';

const initState = {
  waiting: false,
  userId: null,
  number: null,
  userName: null,
  authenticate: false,
  message:null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        waiting: true,
      };

      break;
    case authConstants.SIGNIN_SUCCESS:
      state = {
        ...state,
        waiting: false,
        userId: 'something',
        message: action.payload,
        authenticate: true,
      };

      break;
    case authConstants.SIGNIN_ERROR:
      state = {
        ...state,
        message: action.payload,
      };

      break;
      case authConstants.SIGNUP_SUCCESS:
        state = {
          ...state,
          waiting: false,
          userId: 'something',
          message: action.payload,
          authenticate: false,
        };
  
        break;
      case authConstants.SIGNUP_ERROR:
        state = {
          ...state,
          message: action.payload,
        };
  
      break;
    
      case authConstants.SIGNOUT_SUCCESS:
        state = {
          ...initState
        };
  
        break;
  }
  return state;
};
