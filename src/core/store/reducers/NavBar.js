import {NAVBAR_TOGGLE} from "../actionTypes";
export const  NavBar = (state=false, action)=>{
    switch (action.type){
        case NAVBAR_TOGGLE:
            return action.payload;
        default:
            return  state;
    }
}
