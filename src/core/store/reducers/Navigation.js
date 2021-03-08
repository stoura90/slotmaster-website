import {ROUTER_PARAMS} from "../actionTypes";

const INITIAL_STATE={
    UserNav: null
}

export const  Navigation = (state=INITIAL_STATE, action)=>{
    switch (action.type){
        case ROUTER_PARAMS:
            return {...state,UserNav: action.payload};
        default:
            return  state;
    }
}
