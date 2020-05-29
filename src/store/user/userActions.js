import axios from "axios";
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from "./userTypes";

export const fetchUser = () => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    return axios
      .get(`https://oauth.reddit.com/api/v1/me`, {
        headers: {
          Authorization: `bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        dispatch(fetchUserSuccess(res.data.name));
      })
      .catch((error) => dispatch(fetchUserFailure(error)));
  };
};

export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

export const fetchUserSuccess = (user) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: user,
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};
