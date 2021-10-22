import * as actionType from "./actionTypes";

const initialState = {
  content: ''
};

export const cmsReducer = (state = initialState, action) => {

  switch (action.type) {

    case actionType.SET_CMS:
      return {
        ...state,
        content: action.payload,
      };


    default:
      return state;
  }
};