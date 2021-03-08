import {CHANGE_THEME} from "../actionTypes";

export const Theme = (state="dark",action )=>{
    switch (action.type){
        case CHANGE_THEME:
            return action.payload;
        default:
            return  state;
    }
}
