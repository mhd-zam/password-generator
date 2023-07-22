import { adminLogin, adminLogout } from "./adminType";

const adminInitailstate = {
  loggedin: false,
  akn: "",
};

export default function adminReducer(state = adminInitailstate, action) {
  switch (action.type) {
    case adminLogin:
      return { ...action.payload };
    case adminLogout:
      return adminInitailstate;
    default:
      return state;
  }
}
