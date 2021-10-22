import * as actionType from "./actionTypes";

const initialState = {
    loading : false,
    success: false,
    error: false,
    user: ''
}

export const authReducer = (state = initialState,action) => {

    switch (action.type) {
        
        case actionType.LOGIN_REQUEST:            
          return {
              ...state,
              loading: true,
              error: false,
              success: false
          }
    
          case actionType.LOGIN_SUCCESS:            
          return {
              ...state,
              loading: false,
              user: action.payload,
              error: false,
              success: true
          }

          case actionType.LOGIN_FAILURE:            
          return {
              ...state,
              loading: false,
              success: false,
              failed: action.payload
          }
    
        default:
            return state
    }

}