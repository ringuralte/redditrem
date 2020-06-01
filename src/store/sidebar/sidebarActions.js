import { EXTRACT_SUBREDDITS } from "./sidebarTypes";

export const extractSubreddits = (subreddits) => {
  const reduceCounter = Object.keys(subreddits.children)
    .map((key) => {
      return subreddits.children[key].data.subreddit;
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

  return {
    type: EXTRACT_SUBREDDITS,
    payload: sorted,
  };
};
