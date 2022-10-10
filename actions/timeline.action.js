import axios from '../helpers/axios';
import { timelineConstants } from './constants';

export const getTimeline = () => async (dispatch) => {
  try {
    dispatch({ type: timelineConstants.GET_TIMELINE_REQUEST });
    const res = await axios.get(`/cars`);
    if (res.status === 200) {
      dispatch({ type: timelineConstants.GET_TIMELINE_SUCCESS, payload: res.data });
    } else {
      dispatch({ type: timelineConstants.GET_TIMELINE_FAILURE });
    }
  } catch (err) {
    dispatch({ type: timelineConstants.GET_TIMELINE_FAILURE });
  }
};
