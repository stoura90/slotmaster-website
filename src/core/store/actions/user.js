import {Actions, Config} from "../../index";
import {PING, SIGN_IN} from "../actionTypes";
import Request from "../../http/http";
import moment from 'moment'
import Http from "../../http/http2";
import http from "../../http/http3";
import {query_string} from "../../utils";
import _ from "lodash";

const signIn = ({data,loader}) =>async (dispatch)=>{
    const response = await http.post({
        url:Config.User.SIGN_IN
        ,data:query_string({
        "username":data.username,
        "password":data.password
        }),
        loader:loader
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
const signUp = async ({data,loader}) => {
    const response = await http.post({url:Config.User.SIGN_UP, data:query_string(data),permitAll:true,loader:loader});
    if (!response.status) {
        //window.pushEvent("Invalid Credentials","error")
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
const  resendOtp = ({send,type,prefix,value,additionalParams={},loader,permitAll=false}) =>{
    //{type}&prefix={prefix}&value={value}
    return http.get({
        url:send.replace("{type}",type).replace("{prefix}",prefix).replace("{value}",value).concat('&',_.map(additionalParams,(v, k)=>{
            return k.concat('=',v)
        }).join('&')),
        loader:loader,
        permitAll:permitAll
    })
}
const  verifyOtp = ({verify,type,prefix,value,otp,additionalParams={},loader,permitAll=false}) =>{
    //{type}&prefix={prefix}&value={value}
    return http.get({
        url:verify.replace("{type}",type).replace("{prefix}",prefix).replace("{value}",value).replace('{otp}',otp).concat('&',_.map(additionalParams,(v, k)=>{
        return k.concat('=',v)
    }).join('&')),
        loader:loader,
        permitAll:permitAll
    })

}
const  recoverUserName = ({channel,prefix,data,token}) =>{
    //{type}&prefix={prefix}&value={value}
    return new Http().permitAll().post(Config.Guest.RECOVER.USERNAME.replace("{channel}",channel).replace("{prefix}",prefix).replace("{data}",data).replace('{token}',token))
}
const  recoverPassword = ({channel,prefix,data,token,username,otp}) =>{
    //{type}&prefix={prefix}&value={value}
    return new Http().permitAll().post(Config.Guest.RECOVER.PASSWORD.replace("{channel}",channel).replace("{prefix}",prefix).replace("{data}",data).replace('{token}',token).replace('{username}',username).replace('{otp}',otp))
}
const verification=(data)=>{
   return  (new Http()).post(Config.User.VERIFICATION,{
       "mail":data?.email,
       "firstName":data?.firstName,
       "lastName":data?.lastName,
       "mobilePrefix":data?.mobilePrefix,
       "mobile":data?.mobile,
       "dob":moment(data?.dob).format("YYYY-MM-DD"),
       "gender":data?.gender,
       "passportType":data?.passportType,
       "docNumber":data?.docNumber,
       "country": data?.country,
       "doc_expire_date":moment(data?.doc_expire_date).format("YYYY-MM-DD"),
       "front":data?.front,
       "back":data?.back,
       "otp":data.otp
   },{
       'Content-Type' : 'text/plain'
   });
}
export default {
  signIn,
  signOut,
  ping,
  signUp,
  info,
  updateInfo,
    resendOtp,
    verifyOtp,
    verification,
    recoverUserName,
    recoverPassword
}
