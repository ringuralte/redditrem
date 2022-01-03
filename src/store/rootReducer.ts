import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
// import savedContentReducer from "./savedContents/savedContentReducer";
// import sidebarReducer from "./sidebar/sidebarReducer";
// import mainViewReducer from "./mainView/mainViewReducer";
// import errorReducer from "./error/errorReducer";
// 
const rootReducer = combineReducers({
	user: userReducer,
	// savedContent: savedContentReducer,
// 	sidebar: sidebarReducer,
// 	mainView: mainViewReducer,
// 	error: errorReducer,
});

export default rootReducer;
