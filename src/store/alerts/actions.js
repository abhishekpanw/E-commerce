import * as actionType from "./actionTypes";

export const setLoading = (data) => ({
    type: actionType.LOADING,
    payload: data
});

export const setError = (data) => ({
    type: actionType.ERROR,
    payload: data
});

export const setSuccess = (data) => ({
    type: actionType.SUCCESS,
    payload: data
});

export const clearAlerts = () => ({
    type: actionType.CLEAR,
});