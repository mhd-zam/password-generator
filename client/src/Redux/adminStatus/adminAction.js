import { adminLogin, adminLogout } from "./adminType";


export function adminlogin(data) {
    return {
        type: adminLogin,
        payload:data
 }   
}

export function adminlogout() {
    return {
        type: adminLogout
    }
}