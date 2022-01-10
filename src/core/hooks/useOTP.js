import {useDispatch, useSelector} from "react-redux";
import {OTP_CLOSE, OTP_EMAIL, OTP_ERROR, OTP_PHONE} from "../store/actionTypes";

export function useOTP() {
    const dispatch = useDispatch();
    const otp = useSelector(state => state.OTP);
    const PHONE= ({prefix,number,send,save,verify=null})=>{
        dispatch({
            type:OTP_PHONE,
            payload:{
                type:"phone",
                value:prefix,
                error:'',
                prefix:number,
                send:send,
                save:save,
                verify:verify
            }
        })
    }
    const EMAIL = ({email,send,save,verify=null}) => {
        dispatch({
            type:OTP_EMAIL,
            payload:{
                type:"email",
                value:email,
                error:'',
                prefix:null,
                send:send,
                save:save,
                verify:verify
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

   return {otp, PHONE,EMAIL,ERROR,CLOSE }
}
