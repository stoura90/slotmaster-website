import {useDispatch, useSelector} from "react-redux";
import {OTP_CLOSE, OTP_EMAIL, OTP_ERROR, OTP_MULTI, OTP_PHONE} from "../store/actionTypes";

export function useOTP() {
    const dispatch = useDispatch();
    const otp = useSelector(state => state.OTP);
    const PHONE= ({prefix,number,send,save,additionalParams,verify=null,title,permitAll=false})=>{
        dispatch({
            type:OTP_PHONE,
            payload:{
                title:title,
                type:"phone",
                value:number,
                error:'',
                prefix:prefix,
                send:send,
                save:save,
                verify:verify,
                additionalParams:additionalParams,
                permitAll:permitAll
            }
        })
    }
    const EMAIL = ({email,send,save,additionalParams,verify=null,title,permitAll=false}) => {
        dispatch({
            type:OTP_EMAIL,
            payload:{
                title:title,
                type:"email",
                value:email,
                error:'',
                prefix:null,
                send:send,
                save:save,
                verify:verify,
                additionalParams:additionalParams,
                permitAll:permitAll
            }
        })
    }
    const MULTI = ({send,save,additionalParams,verify=null,title}) => {
        dispatch({
            type:OTP_MULTI,
            payload:{
                title:title,
                type:"multi",
                error:'',
                send:send,
                save:save,
                verify:verify,
                additionalParams:additionalParams
            }
        })
    }
    const ERROR = ({error})=>{
        dispatch({
            type:OTP_ERROR,
            payload:error
        })
    }
    const CLOSE = () =>{
        dispatch({
            type:OTP_CLOSE
        })
    }

   return {otp, PHONE,EMAIL,ERROR,CLOSE,MULTI }
}
