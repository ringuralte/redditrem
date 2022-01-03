import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from "./userTypes";

const initialState = {
  loadingUsername: false,
  user: "",
  error: ""
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loadingUsername: true
      }
    
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loadingUsername: false,
        user: action.payload,
        error: ''
      }
    
    case FETCH_USER_FAILURE:
      return {
        loadingUsername: false,
        user: "",
        error: action.payload
      }
    
    default: return state
  }
}

export default reducer
