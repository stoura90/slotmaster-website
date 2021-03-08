import {SIGN_IN_MODAL} from "../actionTypes";
import {combineReducers} from "redux";

export const  SignIn = (state=false, action)=>{
    switch (action.type){
        case SIGN_IN_MODAL:
            return action.payload;
        default:
            return  state;
    }
}

export default combineReducers({
    SignIn
})
