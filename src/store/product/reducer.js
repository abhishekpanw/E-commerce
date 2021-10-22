import * as actionType from "./actionTypes";

const initialState = {
  loading: false,
  success: false,
  failed: false,
  products : [],
  product : '',
  modalType: "",
  isModalOpen: false
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_PRODUCT_START:
      return {
        ...state,
        loading: true,
        success: false,
        failed: false,
      };

    case actionType.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
        failed: false,
      };

    case actionType.ADD_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        failed: action.payload,
      };

    case actionType.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

      case actionType.SET_PRODUCT:
        return {
          ...state,
          product: action.payload,
        };

    case actionType.CLEAR_PRODUCT:
      return {
        ...state,
        loading: false,
        success: false,
        failed: false,
      };

    default:
      return state;
  }
};