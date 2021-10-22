import * as actionType from "./actionTypes";

const initialState = {
  loading: false,
  success: false,
  failed: false,
  categories: [],
  category: '',
  modalType: "",
  isModalOpen: false
};

export const categoryReducer = (state = initialState, action) => {

  switch (action.type) {
    case actionType.ADD_CATEGORY_START:
      return {
        ...state,
        loading: true,
        success: false,
        failed: false,
      };

    case actionType.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
        failed: false,
      };

    case actionType.ADD_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        failed: action.payload,
      };

    case actionType.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

      case actionType.SET_CATEGORY:
        return {
          ...state,
          category: action.payload,
        };

    case actionType.CLEAR_CATEGORY:
      return {
        ...state,
        loading: false,
        success: false,
        failed: false,
      };

    case actionType.SET_MODAL_TYPE:
      return {
        ...state,
        modalType: action.payload,
      };

    case actionType.TOGGLE_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };

    default:
      return state;
  }
};