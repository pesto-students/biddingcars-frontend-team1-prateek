import axios from '../helpers/axios';
import { userinfoConstants } from './constants';
import { toast } from 'react-toastify';

export const getUserinfo = (email) => async (dispatch) => {
  try {
    dispatch({ type: userinfoConstants.GET_USERINFO_REQUEST });
    const res = await axios.get(`/users/${email}`);
    console.log(res.data)
    if (res.status === 200) {
      dispatch({ type: userinfoConstants.GET_USERINFO_SUCCESS, payload: res.data });

    } else {
      dispatch({ type: userinfoConstants.GET_USERINFO_FAILURE });
      toast('Something went wrong.', { type: 'error' })
    }
  } catch (err) {
    dispatch({ type: userinfoConstants.GET_USERINFO_FAILURE });
    toast('Something went wrong.', { type: 'error' })
  }
};
