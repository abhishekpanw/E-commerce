import * as actionType from "./actionTypes";
import axios from "axios";
import {
  setError,
  setLoading,
  setSuccess,
  clearAlerts,
} from "../alerts/actions";

const addCategoryStart = () => ({
  type: actionType.ADD_CATEGORY_START,
});

const addCategorySuccess = (data) => ({
  type: actionType.ADD_CATEGORY_SUCCESS,
  payload: data,
});

const addCategoryFailed = (data) => ({
  type: actionType.ADD_CATEGORY_FAILED,
  payload: data,
});

export const clearCategory = () => ({
  type: actionType.CLEAR_CATEGORY,
});

const setCategories = (data) => ({
  type: actionType.SET_CATEGORIES,
  payload: data,
});

export const setCategory = (data) => ({
  type: actionType.SET_CATEGORY,
  payload: data,
});

export const setModalType = (data) => ({
  type: actionType.SET_MODAL_TYPE,
  payload: data
})

export const toggleModal = () => ({
  type: actionType.TOGGLE_MODAL,
})

export const getCategories = (page,perPage, filterText = '') => {

  return (dispatch) => {
    // dispatch(clearAlerts());
    dispatch(setLoading(true));
  
    axios
      // .get(`api/users?page=${page}&perPage=${perPage}&search=${filterText}`)
      .get(`api/category`)
      .then((res) => {
        console.log("CATEGORIES_______________",res.data)
        dispatch(setCategories(res.data.body.categories));
        dispatch(setLoading(false));


        console.log("RES", res);
      })
      .catch((err) => {
        dispatch(setLoading(false));
        dispatch(setError(err.response.data.message));
        console.log(err);
      });
  };
};

export const addCategory = (data, clearInputs, toggle) => {
  console.log(data);
  return (dispatch) => {

    // dispatch(clearAlerts());
    dispatch(addCategoryStart());

    axios
      .post("api/category", data)
      .then((res) => {
        dispatch(addCategorySuccess());
        clearInputs()
        dispatch(toggleModal());        
        dispatch(getCategories());
        dispatch(setSuccess(res.data.message));
        // history.push("users");
      })
      .catch((err) => {
        dispatch(addCategoryFailed(err.response.data.message));
        console.log(err);
      });
  };
};

export const updateCategory = (id,data, clearInputs) => {

  console.log(data);
  return (dispatch) => {

    // dispatch(clearAlerts());
    dispatch(addCategoryStart());

    axios
      .patch(`api/category/${id}`, data)
      .then((res) => {
        dispatch(addCategorySuccess());
        dispatch(toggleModal());        
        dispatch(getCategories());
        dispatch(setSuccess(res.data.message));

        // history.push("users");
      })
      .catch((err) => {

        dispatch(setError(err.response.data.message))
        console.log(err);
      });

  };
};





