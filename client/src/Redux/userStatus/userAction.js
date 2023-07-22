import { Insert, Remove } from "./userType";

export function InsertUserStatus(data) {
  return {
    type: Insert,
    payload: data,
  };
}

export function RemoveUserStatus() {
  return {
    type: Remove,
  };
}
