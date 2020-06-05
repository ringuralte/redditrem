import {
  LOADING_MAIN_VIEW,
  SHOW_ALL_CONTENT,
  SHOW_ONLY_COMMENTS,
  SHOW_ONLY_NSFW,
  SHOW_ONLY_SUBREDDIT,
} from "./mainViewTypes";

const initialState = {
  loading: false,
  content: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_MAIN_VIEW:
      return {
        ...state,
        loading: true,
      };
    case SHOW_ALL_CONTENT:
      return {
        loading: false,
        content: { 
          ...state.content,
          ...action.payload },
      };
    case SHOW_ONLY_COMMENTS:
      return {
        loading: false,
        content: { ...action.payload },
      };
    case SHOW_ONLY_NSFW:
      return {
        loading: false,
        content: { ...action.payload },
      }
    case SHOW_ONLY_SUBREDDIT:
      return {
        loading: false,
        content: { ...action.payload }
      }
    default:
      return state;
  }
};

export default reducer;
