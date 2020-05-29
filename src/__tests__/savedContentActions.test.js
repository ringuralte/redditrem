import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import * as actions from "../store/savedContents/savedContentActions";
import * as types from "../store/savedContents/savedContentTypes";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const mock = new MockAdapter(axios);

afterEach(() => mock.restore());

it("creates FETCH_SAVED_SUCCESS when successfully fetching data from api", () => {
  mock
    .onGet(`https://oauth.reddit.com/user/username/saved?limit=100`)
    .reply(200, {
      kind: "Listing",
      data: {
        after: "randomstring",
        before: null,
        children: [],
        dist: 100,
        modhash: null,
      },
    });

  const expectedActions = [
    { type: types.FETCH_SAVED_REQUEST },
    {
      type: types.FETCH_SAVED_SUCCESS,
      payload: {
        kind: "Listing",
        data: {
          after: "randomstring",
          before: null,
          children: [],
          dist: 100,
          modhash: null,
        },
      },
    },
  ];

  const store = mockStore();
  return store.dispatch(actions.fetchSavedContent("username")).then(() => {
    expect(store.getActions()).toEqual(expectedActions)
  })
});

it("should create an action that adds list of saved data", () => {
  const payload = {};
  const expectedAction = {
    type: types.FETCH_SAVED_SUCCESS,
    payload,
  };

  expect(actions.fetchSavedSuccess(payload)).toEqual(expectedAction);
});

it("should create an action that adds an error message", () => {
  const payload = "error";
  const expectedAction = {
    type: types.FETCH_SAVED_FAILURE,
    payload,
  };

  expect(actions.fetchSavedFailure(payload)).toEqual(expectedAction);
});
