import { adminLogin } from "./adminType";


export function adminlogin(data) {
    return {
        type: adminLogin,
        payload:data
 }   
}

export function adminLogout() {
    return {
        type: adminLogout
    }
}