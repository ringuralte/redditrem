import { combineReducers } from "redux"
import userReducer from "./user/userReducer"
import savedContentReducer from "./savedContents/savedContentReducer"

const rootReducer = combineReducers({
  user: userReducer,
  savedContent: savedContentReducer
})

export default rootReducer