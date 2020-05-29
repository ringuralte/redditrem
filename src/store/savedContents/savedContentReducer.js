import {
  FETCH_SAVED_REQUEST,
  FETCH_SAVED_SUCCESS,
  FETCH_SAVED_FAILURE,
  FETCH_MORE_REQUEST,
  FETCH_MORE_SUCCESS,
  FETCH_MORE_FAILURE,
} from "./savedContentTypes";

const initialState = {
  loadingContent: false,
  loadingMore: false,
  content: {
    listing: "",
    data: {
      after: "",
      before: "",
      children: [],
      dist: "",
      modhash: "",
    },
  },
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SAVED_REQUEST:
      return {
        ...state,
        loadingContent: true,
      };
    case FETCH_SAVED_SUCCESS:
      return {
        loadingContent: false,
        content: action.payload,
        error: "",
      };
    case FETCH_SAVED_FAILURE:
      return {
        loadingContent: false,
        content: {},
        error: action.payload,
      };
    case FETCH_MORE_REQUEST:
      return {
        ...state,
        loadingMore: true,
      }
    case FETCH_MORE_SUCCESS:
      return {
        ...state,
        loadingMore: false,
        content: {
          ...state.content,
          data: {
            ...state.content.data,
            after: action.payload.data.after,
            children: [
              ...state.content.data.children,
              ...action.payload.data.children,
            ],
          },
        },
      };
    case FETCH_MORE_FAILURE:
      return {
        ...state,
        loadingMore: false,
        error: action.payload
      }

    default:
      return state;
  }
};

export default reducer;
