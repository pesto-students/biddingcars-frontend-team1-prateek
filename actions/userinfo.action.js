import axios from '../helpers/axios';
import { userinfoConstants } from './constants';
import { toast } from 'react-toastify';

export const getUserinfo = (email) => async (dispatch) => {
  try {
    dispatch({ type: userinfoConstants.GET_USERINFO_REQUEST });
    const res = await axios.get(`/users/${email}`);
    // console.log(res.data)
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

export const postUserinfo = (form) => async (dispatch) => {
  try {
    console.log('updating',form)
    dispatch({ type: userinfoConstants.POST_USERINFO_REQUEST });
    const res = await axios.post(`/users/update`,form);
    if (res.status === 200) {
      dispatch({ type: userinfoConstants.POST_USERINFO_SUCCESS, payload: res.data });
      toast('User Updated Successfully !', { type: 'success' })
    } else {
      dispatch({ type: userinfoConstants.POST_USERINFO_FAILURE });
      toast('Error Updating User', { type: 'error' })
    }
  } catch (err) {
    dispatch({ type: userinfoConstants.POST_USERINFO_FAILURE });
    toast('Error Updating User', { type: 'error' })
  }
};
