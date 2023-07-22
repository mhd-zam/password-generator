import { Add, Clear } from "./formType";

export function insertFormData(data) {
    return {
        type:Add,payload:data
    }
}

export function clearFormData() {
    return {
        type:Clear
    }
}