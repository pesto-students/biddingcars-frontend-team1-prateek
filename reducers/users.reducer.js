import { usersConstants } from '../actions/constants';

const initState = {
waiting: false,
userList:[]
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
  switch (action.type) {
    case usersConstants.GET_USERS_REQUEST:
      state = {
        ...state,
        waiting: true,
      };

      break;
    case usersConstants.GET_USERS_SUCCESS:
      state = {
        ...state,
        waiting: false,
        userList:action.payload,
      };

      break;
    case usersConstants.GET_USERS_FAILURE:
      state = {
        ...state,
        waiting: false,
      };

      break;

    case usersConstants.USERS_NULL:
      state = {
        ...initState
      };

      break;
  }
  return state;
};
