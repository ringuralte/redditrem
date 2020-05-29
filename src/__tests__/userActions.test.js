import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import * as actions from "../store/user/userActions";
import * as types from "../store/user/userTypes";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const mock = new MockAdapter(axios);

describe("async action", () => {
  afterEach(() => {
    mock.restore();
  });

  it("creates FETCH_USER_SUCCESS when fetching user has been done", () => {
    mock.onGet(`https://oauth.reddit.com/api/v1/me`).reply(200, {
      name: "somename",
    });

    const expectedActions = [
      { type: types.FETCH_USER_REQUEST },
      { type: types.FETCH_USER_SUCCESS, payload: "somename" },
    ];

    const store = mockStore();
    return store.dispatch(actions.fetchUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

it("should create an action that adds username", () => {
  const payload = "username";
  const expectedAction = {
    type: types.FETCH_USER_SUCCESS,
    payload,
  };
  expect(actions.fetchUserSuccess(payload)).toEqual(expectedAction);
});

it("should create an action that adds an error message", () => {
  const payload = "error message";
  const expectedAction = {
    type: types.FETCH_USER_FAILURE,
    payload,
  };
  expect(actions.fetchUserFailure(payload)).toEqual(expectedAction);
});
