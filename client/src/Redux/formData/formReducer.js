import { Add, Clear } from "./formType";

let initialFormState = {
  platform: "",
  username: "",
  password: "",
  _id: "",
};

export default function formDataReducer(state = initialFormState,action){
    switch (action.type) {
        case Add: return { ...action.payload }
        case Clear: return initialFormState
        default: return state
    }
}
