import {OTP_PHONE, OTP_EMAIL, OTP_ERROR, OTP_CLOSE, OTP_MULTI} from "../actionTypes";

const INITIAL_STATE={
    type:null,
    value:null,
    error:null,
    prefix:null,
    send:null,
    save:null,
    additionalParams:{}
}

export const  OTP = (state=INITIAL_STATE, action)=>{
    switch (action.type){
        case OTP_PHONE:
        case OTP_EMAIL:
        case OTP_MULTI:
            return {...state, ...action.payload};
        case OTP_ERROR:
            return {...state, error:action.payload};
        case OTP_CLOSE:
            return {...state, type:null, value:null, error:null, prefix:null,send:null,save:null };
        default:
            return  state;
    }
}
