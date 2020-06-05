import {
  SHOW_ALL_CONTENT,
  SHOW_ONLY_COMMENTS,
  SHOW_ONLY_NSFW,
  SHOW_ONLY_SUBREDDIT,
  LOADING_MAIN_VIEW,
} from "./mainViewTypes";

export const showAll = () => {
  return (dispatch, getState) => {
    dispatch(loadingMainView());
    const state = getState().savedContent.content.data.children;
    dispatch(showAllContent(state));
  };
};

export const showComments = () => {
  return (dispatch, getState) => {
    dispatch(loadingMainView());
    const state = getState().savedContent.content.data.children;
    const filter = Object.keys(state)
      .filter((key) => state[key].kind === "t1")
      .map((key) => state[key]);
    dispatch(showOnlyComments(filter));
  };
};

export const showNsfw = () => {
  return (dispatch, getState) => {
    dispatch(loadingMainView());
    const state = getState().savedContent.content.data.children;
    const filter = Object.keys(state)
      .filter((key) => state[key].data.over_18 === true)
      .map((key) => state[key]);
    dispatch(showOnlyNsfw(filter));
  };
};

export const showSubreddit = (subName) => {
  return (dispatch, getState) => {
    dispatch(loadingMainView());
    const state = getState().savedContent.content.data.children;
    const filter = Object.keys(state)
      .filter((key) => state[key].data.subreddit === subName)
      .map((key) => state[key]);
    dispatch(showOnlySubreddit(filter))
  };
};

export const loadingMainView = () => {
  return {
    type: LOADING_MAIN_VIEW,
  };
};

export const showAllContent = (data) => {
  return {
    type: SHOW_ALL_CONTENT,
    payload: data,
  };
};

export const showOnlyComments = (data) => {
  return {
    type: SHOW_ONLY_COMMENTS,
    payload: data,
  };
};

export const showOnlyNsfw = (data) => {
  return {
    type: SHOW_ONLY_NSFW,
    payload: data,
  };
};

export const showOnlySubreddit = (data) => {
  return {
    type: SHOW_ONLY_SUBREDDIT,
    payload: data,
  };
};
