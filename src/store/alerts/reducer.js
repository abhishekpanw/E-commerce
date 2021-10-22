import * as actionType from "./actionTypes";

const initialState = {
  loading: false,
  error: "",
  success: "",
};

export const alertsReducer = (state = initialState, action) => {
    
  switch (action.type) {

    case actionType.LOADING:
      return {
        ...state,
        loading: action.payload,
        // error: '',
        // success: ''
      };

    case actionType.SUCCESS:
      return {
        ...state,
        success: action.payload,
        error: "",
        loading: false
      };

    case actionType.ERROR:
      return {
        ...state,
        error: action.payload,
        success: "",
        loading: false
      };

      case actionType.CLEAR:
      return {
        ...state,
        error: "",
        success: "",
        loading: ""
      };


    default:
      return state;
  }
};
