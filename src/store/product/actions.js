import * as actionType from "./actionTypes";
import axios from "axios";
import {
  setError,
  setLoading,
  setSuccess,
  clearAlerts,
} from "../alerts/actions";

const addProductStart = () => ({
  type: actionType.ADD_PRODUCT_START,
});

const addProductSuccess = (data) => ({
  type: actionType.ADD_PRODUCT_SUCCESS,
  payload: data,
});

const addProductFailed = (data) => ({
  type: actionType.ADD_PRODUCT_FAILED,
  payload: data,
});

export const clearProduct = () => ({
  type: actionType.CLEAR_PRODUCT,
});

const setProducts = (data) => ({
  type: actionType.SET_PRODUCTS,
  payload: data,
});

export const setProduct = (data) => ({
  type: actionType.SET_PRODUCT,
  payload: data,
});

export const getProducts = (page,perPage, filterText = '') => {
  return (dispatch) => {

    dispatch(setLoading(true));
    axios
      .get(`api/products?page=${page}&perPage=${perPage}&search=${filterText}`)
      .then((res) => {
        dispatch(setProducts(res.data.body.products));
        dispatch(setLoading(false));

        console.log("RES", res);
      })
      .catch((err) => {
        dispatch(setLoading(false));
        dispatch(setError(err.response.data.message));
      });
  };
};


export const addProduct = (data, clearInputs) => {
  console.log(data);
  return (dispatch) => {
 
    dispatch(addProductStart());

    axios
      .post("api/product", data)
      .then((res) => {
        dispatch(addProductSuccess());
        dispatch(getProducts(1,10));
        dispatch(setSuccess(res.data.message));
        // history.push("users");
      })
      .catch((err) => {
        dispatch(setError(err.response.data.message));
        dispatch(addProductFailed());
        console.log(err);
      });
  };
};

export const updateProduct = (id,data, clearInputs) => {

  return (dispatch) => {

    dispatch(addProductStart());

    axios
      .patch(`api/product/${id}`, data)
      .then((res) => {
        dispatch(addProductSuccess());
        clearInputs()
        dispatch(getProducts(1,10));
        dispatch(setSuccess(res.data.message))
        // history.push("users");
      })
      .catch((err) => {
        dispatch(addProductFailed(err.response.data.message));
        console.log(err);
      });
  };
};


