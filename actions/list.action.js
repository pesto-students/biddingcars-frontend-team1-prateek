import { listConstants } from "./constants";
import axios from "../helpers/axios";


export const listCar = (form) => async (dispatch) => {
    try {
      dispatch({ type: listConstants.POST_LIST_REQUEST });
      const res = await axios.post(`/cars/add`,form);
      if (res.status === 200) {
        dispatch({ type: listConstants.POST_LIST_SUCCESS, payload: res.data });
      } else {
        dispatch({ type: listConstants.POST_LIST_FAILURE });
      }
    } catch (err) {
      dispatch({ type: listConstants.POST_LIST_FAILURE });
    }
  };