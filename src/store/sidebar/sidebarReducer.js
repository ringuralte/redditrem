import { EXTRACT_SUBREDDITS } from "./sidebarTypes";

const initialState = {
  subreddits: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case EXTRACT_SUBREDDITS:
      return action.payload;

    default:
      return state;
  }
};

export default reducer;
