import axios from "axios";
import {
  FETCH_SAVED_REQUEST,
  FETCH_SAVED_SUCCESS,
  FETCH_SAVED_FAILURE,
  FETCH_MORE_REQUEST,
  FETCH_MORE_SUCCESS,
  FETCH_MORE_FAILURE
} from "./savedContentTypes";

export const fetchSavedContent = (username) => {
  return (dispatch) => {
    dispatch(fetchSavedRequest());
    return axios
      .get(`https://oauth.reddit.com/user/${username}/saved?limit=100`, {
        headers: {
          Authorization: `bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        dispatch(fetchSavedSuccess(res.data));
      })
      .catch((error) => {
        dispatch(fetchSavedFailure(error));
      });
  };
};

export const fetchMore = (username, after) => {
  return (dispatch) => {
    dispatch(fetchMoreRequest())
    return axios
      .get(
        `https://oauth.reddit.com/user/${username}/saved?limit=100&after=${after}`,
        {
          headers: {
            Authorization: `bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        dispatch(fetchMoreSuccess(res.data));
      })
      .catch((error) => {
        dispatch(fetchSavedFailure(error));
      });
  };
};

export const fetchSavedRequest = () => {
  return {
    type: FETCH_SAVED_REQUEST,
  };
};

export const fetchSavedSuccess = (content) => {
  return {
    type: FETCH_SAVED_SUCCESS,
    payload: content,
  };
};

export const fetchSavedFailure = (error) => {
  return {
    type: FETCH_SAVED_FAILURE,
    payload: error,
  };
};

export const fetchMoreRequest = () => {
  return {
    type: FETCH_MORE_REQUEST,
  }
}

export const fetchMoreSuccess = (content) => {
  return {
    type: FETCH_MORE_SUCCESS,
    payload: content,
  };
};

export const fetchMoreFailure = (error) => {
  return {
    type: FETCH_MORE_FAILURE,
    payload: error
  }
}