import axios from "axios";
import { setError, setLoading, setSuccess,clearAlerts } from "../alerts/actions";
import * as actionType from "./actionTypes";

const setCMS = (data) => ({
  type: actionType.SET_CMS,
  payload: data,
});

export const getCMS = (type) => {

  return (dispatch) => {
    dispatch(clearAlerts())
    axios
      .get(`api/cms/${type}`)
      .then((res) => {
        dispatch(setCMS(res.data.body.content));
      })
      .catch((err) => {
          dispatch(setError(err.response.data.message));
        console.log(err);
      });
  };
  
};

export const updateCMS = (type,data) => {

  return (dispatch) => {

    dispatch(setLoading(true))    
    axios
      .put(`api/cms/${type}`,{content: data})
      .then((res) => {
        dispatch(setCMS(res.data.body.content));
        dispatch(setSuccess(res.data.message))
      })
      .catch((err) => {
        console.log(err);
        dispatch(setSuccess(err.response.data.message))
      });
  };
  
};
