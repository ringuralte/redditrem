import { ERROR_MESSAGE_FOR_HOMEPAGE } from "./errorTypes";

const initialState = {
  errorMessage: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR_MESSAGE_FOR_HOMEPAGE:
      return {
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
