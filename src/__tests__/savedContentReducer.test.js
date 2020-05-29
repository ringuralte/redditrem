import * as types from "../store/savedContents/savedContentTypes";
import reducer from "../store/savedContents/savedContentReducer";

const initialState = {
  loadingContent: false,
  content: {},
  error: "",
};

it("should return the intial state", () => {
  expect(reducer(initialState, {})).toEqual({
    loadingContent: false,
    content: {},
    error: "",
  });
});

it("should hand FETCH_SAVED_SUCCESS", () => {
  expect(
    reducer(initialState, {
      type: types.FETCH_SAVED_REQUEST,
    })
  ).toEqual({
    loadingContent: true,
    content: {},
    error: "",
  });
});

it("should handle FETCH_SAVED_SUCCESS", () => {
  expect(
    reducer(initialState, {
      type: types.FETCH_SAVED_SUCCESS,
      payload: {
        kind: "Listing",
        data: {
          after: "somestring",
          before: "anotherstring",
          children: [],
          dist: 100,
          modhash: null,
        },
      },
    })
  ).toEqual({
    loadingContent: false,
    content: {
      kind: "Listing",
      data: {
        after: "somestring",
        before: "anotherstring",
        children: [],
        dist: 100,
        modhash: null,
      },
    },
    error: "",
  });
});

it("should handle FETCH_SAVED_FAILURE", () => {
  expect(reducer(initialState, {
    type: types.FETCH_SAVED_FAILURE,
    payload: "some Error message"
  })).toEqual({
    loadingContent: false,
    content: {},
    error: "some Error message"
  })
})
