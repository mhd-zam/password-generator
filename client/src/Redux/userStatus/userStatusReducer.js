import { Insert, Remove } from "./userType";

const userInitialState = {
  accessToken: "",
  logged: "",
};

export default function userStatusReducer(state = userInitialState, action) {
  switch (action.type) {
    case Insert:
      return {
        ...action.payload
      };
    case Remove:return userInitialState;
    default:return state;
  }
}
