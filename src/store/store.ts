// import { createStore, applyMiddleware } from "redux"
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userReducer";
// import { composeWithDevTools } from "redux-devtools-extension"
// import thunk from "redux-thunk"
//
// import rootReducer from "./rootReducer"
//
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// )
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
