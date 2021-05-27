import {LOADER_TOGGLE} from "../actionTypes";
export const  Loader = (state=null, action)=>{
    switch (action.type){
        case LOADER_TOGGLE:
            return action.payload;
        default:
            return  state;
    }
}