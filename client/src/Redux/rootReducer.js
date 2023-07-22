import { combineReducers } from "redux";
import userStatusReducer from "./userStatus/userStatusReducer";
import formDataReducer from "./formData/formReducer";
import adminReducer from "./adminStatus/adminReducer";

const rootReducer = combineReducers({
  userStatus: userStatusReducer,
  formData: formDataReducer,
  adminStatus: adminReducer
});

export default rootReducer;
