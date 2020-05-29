import reducer from "../store/user/userReducer";
import * as types from "../store/user/userTypes";

const initialState = {
  loadingUsername: false,
  user: "",
  error: "",
};

it("should return the initial state", () => {
  expect(reducer(initialState, {})).toEqual({
    loadingUsername: false,
    user: "",
    error: "",
  });
});

it("should handle FETCH_USER_REQUEST", () => {
  expect(reducer(initialState, {
      type: types.FETCH_USER_REQUEST,
    })
  ).toEqual({
    loadingUsername: true,
    user: "",
    error: "",
  });
});

it("should handle FETCH_USER_SUCCESS", () => {
  expect(reducer(initialState, {
    type: types.FETCH_USER_SUCCESS,
    payload: 'some name',
  })).toEqual({
    loadingUsername: false,
    user: 'some name',
    error: ''
  })
})

it("should handle FETCH_USER_FAILURE", () => {
  expect(reducer(initialState, {
    type: types.FETCH_USER_FAILURE,
    payload: 'some error',
  })).toEqual({
    loadingUsername: false,
    user: '',
    error: 'some error'
  })
})
