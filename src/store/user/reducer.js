import * as actionType from "./actionTypes";

const initialState = {
  loading: false,
  success: false,
  failed: false,
  users: [],
  user: '',
  modalType: "",
  isModalOpen: false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_USER_START:
      return {
        ...state,
        loading: true,
        success: false,
        failed: false,
      };

    case actionType.ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
        failed: false,
      };

    case actionType.ADD_USER_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        failed: action.payload,
      };

    case actionType.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };

      case actionType.SET_USER:
        return {
          ...state,
          user: action.payload,
        };

    case actionType.CLEAR_USER:
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