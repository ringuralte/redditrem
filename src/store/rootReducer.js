import { combineReducers } from "redux"
import userReducer from "./user/userReducer"
import savedContentReducer from "./savedContents/savedContentReducer"
import sidebarReducer from "./sidebar/sidebarReducer"
import mainViewReducer from "./mainView/mainViewReducer"

const rootReducer = combineReducers({
  user: userReducer,
  savedContent: savedContentReducer,
  sidebar: sidebarReducer,
  mainView: mainViewReducer
})

export default rootReducer