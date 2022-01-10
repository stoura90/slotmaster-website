import {Actions, Config} from "../../index";
import {PING, SIGN_IN} from "../actionTypes";
import Request from "../../http/http";
import Http from "../../http/http2";
import {query_string} from "../../utils";
const signIn = (data) =>async (dispatch)=>{
    const response = await Request.post(Config.User.SIGN_IN,query_string({
        "username":data.username,
        "password":data.password
    }),{
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    if(response.status){
        console.log(response)
        localStorage.setItem('GRD_access_token',response.data.access_token);
        localStorage.setItem('GRD_refresh_token',response.data.refresh_token);
        dispatch(ping())
        dispatch({
            type: SIGN_IN,
            payload: {},
            status:response.status
        })
    }else{
        Request.event({
            name:"httpError",
            type:'error',
            details:"invalid credentials"
        })
        localStorage.removeItem('GRD_access_token');
    }
 return response;
}
const signOut = () => async (dispatch)=>{
  console.log("sign out")
  const response = await Request.get(Config.User.SIGN_OUT);
  if(response.status){
    dispatch({
      type: SIGN_IN,
      payload: {},
      status:false
    })
  }else {
    console.log("error")
  }
}
const ping = () =>async (dispatch)=>{
    return new Promise((resolve => {
        (new Http()).get(Config.User.PING).then(response=>{

            dispatch({
                type: PING,
                payload: response.status?response.data.data:{},
                status:response.status
            })
        }).finally(()=>resolve(true))
    }))

}
const info = ()=>{
    return (new Http()).get(Config.User.INFO)
}
const signUp = async (data) => {
    const response = await Request.post(Config.User.SIGN_UP, query_string(data), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    if (!response.status) {
        Request.event({
            name: "httpError",
            type: 'error',
            details: "invalid credentials"
        })

       // alert(`An error occurred while registering`)
    }
    return response;
}
const updateInfo = async ({data}) => {
    let formData = new FormData();

    formData.append("firstName", data.firstName)
    formData.append("lastName", data.lastName)
    formData.append("dob", data.dob)
    formData.append("mobile", data.mobile)
    formData.append("username", data.username)
    formData.append("email", data.email)
    formData.append("countryCode", data?.country?.iso3)
    formData.append("currencyCode", data?.currency?.iso)

    return await (new Http()).post(Config.User.UPDATE_INFO, formData)
}

const  resendOtp = ({send,type,prefix,value}) =>{
    //{type}&prefix={prefix}&value={value}
    return new Http().get(send.replace("{type}",type).replace("{prefix}",prefix).replace("{value}",value))
}
const  verifyOtp = ({verify,type,prefix,value,otp}) =>{
    //{type}&prefix={prefix}&value={value}
    return new Http().get(verify.replace("{type}",type).replace("{prefix}",prefix).replace("{value}",value).replace('{otp}',otp))
}
export default {
  signIn,
  signOut,
  ping,
  signUp,
  info,
  updateInfo,
    resendOtp,
    verifyOtp
}
