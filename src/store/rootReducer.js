import { combineReducers } from "redux"
import userReducer from "./user/userReducer"
import savedContentReducer from "./savedContents/savedContentReducer"
import sidebarReducer from "./sidebar/sidebarReducer"

const rootReducer = combineReducers({
  user: userReducer,
  savedContent: savedContentReducer,
  sidebar: sidebarReducer
})

export default rootReducer