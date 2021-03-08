import {BOTTOM_BAR_TOGGLE} from "../actionTypes";
export const  BottomBar = (state=false, action)=>{
    switch (action.type){
        case BOTTOM_BAR_TOGGLE:
            return action.payload;
        default:
            return  state;
    }
}
