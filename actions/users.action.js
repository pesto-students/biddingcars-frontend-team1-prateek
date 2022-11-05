import axios from "../helpers/axios";
import { usersConstants } from "./constants";
import { toast } from "react-toastify";

export const getUsers = ( token) => async (dispatch) => {
  try {
    dispatch({ type: usersConstants.GET_USERS_REQUEST });
    // const res = await axios.get(`/users/${email}`);
    const res = await axios.get(`/users/unverified`
    , { headers: { Authorization: "Bearer " + token }
    }
    );
    if (res.status === 200) {
      dispatch({
        type: usersConstants.GET_USERS_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({ type: usersConstants.GET_USERS_FAILURE });
      toast("Something went wrong.", { type: "error" });
    }
  } catch (err) {
    dispatch({ type: usersConstants.GET_USERS_FAILURE });
    toast("Something went wrong.", { type: "error" });
  }
};


export const verifyUser = (id,token,userinfo) => async (dispatch) => {
  try {
    const res = await axios.post(`/users/verify/${id}`
    ,{ headers: { Authorization: "Bearer " + token ,user:JSON.stringify(userinfo)}});
    if (res.status === 200) {
      toast('User Approved successfully !', { type: 'success' })
    } else {
      toast('User approval unsuccessfull', { type: 'error' })
    }
  } catch (err) {
    toast('User approval unsuccessfull', { type: 'error' })
  }
};
