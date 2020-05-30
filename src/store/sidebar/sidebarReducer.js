import { EXTRACT_SUBREDDITS } from "./sidebarTypes";

const initialState = {
  subreddits: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case EXTRACT_SUBREDDITS:
      const reduceCounter = Object.keys(action.payload.children)
        .map((key) => {
          return action.payload.children[key].data.subreddit;
        })
        .reduce((allSubreddits, subreddit) => {
          if (subreddit in allSubreddits) {
            allSubreddits[subreddit]++;
          } else {
            allSubreddits[subreddit] = 1;
          }
          return allSubreddits;
        }, {});

      const sorted = Object.keys(reduceCounter)
        .sort(Intl.Collator().compare)
        .reduce((Obj, key) => {
          Obj[key] = reduceCounter[key];
          return Obj;
        }, {});

      return sorted;

    default:
      return state;
  }
};

export default reducer;
