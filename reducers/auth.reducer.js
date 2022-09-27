import { authConstants } from '../actions/constants';

const initState = {
  waiting: false,
  userId: null,
  number: null,
  userName: null,
  authenticate: false,
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
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        waiting: false,
        userId: 'something',
        userName: action.payload,
        authenticate: true,
      };

      break;
    case authConstants.LOGIN_FAILURE:
      state = {
        ...state,
        waiting: false,
      };

      break;
  }
  return state;
};
