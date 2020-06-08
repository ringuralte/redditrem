import { EXTRACT_SUBREDDITS } from "./sidebarTypes";

export const extractSubreddits = () => {
  return (dispatch, getState) => {
    const sidebar = getState().savedContent.content.data.children;
    const reduceCounter = Object.keys(sidebar)
      .map((key) => {
        return sidebar[key].data.subreddit;
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

    dispatch(extractSubs(sorted));
  };
};

export const extractSubs = (data) => {
  return {
    type: EXTRACT_SUBREDDITS,
    payload: data,
  };
};
