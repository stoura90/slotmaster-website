import {Actions, Config} from "../../index";
import {PING, SIGN_IN} from "../actionTypes";
import Request from "../../http/http";
import moment from 'moment'
import http from "../../http/http3";
import {query_string} from "../../utils";
import _ from "lodash";

import JWT from "../../models/JWT";
let jwt  = new JWT()
const signIn = ({data,loader}) =>async (dispatch)=>{

    const response = await http.post({
        url:Config.User.SIGN_IN
        ,data:query_string({
        "username":data.username,
        "password":data.password
        }),
        loader:loader,
        permitAll:true
    });
    if(response.status){
        jwt.setData(response.data)
        setTimeout(()=>{
            dispatch(ping())
        },100)


        dispatch({
            type: SIGN_IN,
            payload: {},
            status:response.status
        })

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
    return new Promise(resolve => {
        http.get({url:Config.User.PING}).then(response=>{
            console.log("ping",response)
            dispatch({
                type: PING,
                payload: response.status?response.data.data:{},
                status:response.status
            })
            resolve(true)
        }).catch(()=>{
            resolve(true)
        })
    })
}
const info = ()=>{
    return http.get({url:Config.User.INFO})
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

    return await http.post({url:Config.User.UPDATE_INFO,data:formData} )
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
    return http.post({
        url:verify.replace("{type}",type).replace("{prefix}",prefix).replace("{value}",value).replace('{otp}',otp).concat('&',_.map(additionalParams,(v, k)=>{
        return k.concat('=',v)
    }).join('&')),
        loader:loader,
        permitAll:permitAll
    })

}
const  recoverUserName = ({channel,prefix,data,token}) =>{
    //{type}&prefix={prefix}&value={value}url
    return http.post({
        url:Config.Guest.RECOVER.USERNAME.replace("{channel}",channel).replace("{prefix}",prefix).replace("{data}",data).replace('{token}',token),
        permitAll:true
    })
}
const  recoverPassword = ({channel,prefix,data,token,username,otp}) =>{
    //{type}&prefix={prefix}&value={value}
    return http.post({
        url:Config.Guest.RECOVER.PASSWORD.replace("{channel}",channel).replace("{prefix}",prefix).replace("{data}",data).replace('{token}',token).replace('{username}',username).replace('{otp}',otp)
    })
}
const verification=({data,loader})=>{
   return  http.post({
                url:Config.User.VERIFICATION,
                data:{
                   "mail":data?.email,
                   "sourceId":data?.sourceId,
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
               },
                headers:{  'Content-Type' : 'text/plain' },
                loader:loader
        });
}

const verification_email=({data,loader})=>{
   return  http.post({
                url:Config.User.VERIFICATION_EMAIL,
                data:query_string({
                    "sourceId":data?.sourceId,
                    "email":data?.email,
                    "otp":data.otp
               }),
                headers:{  'Content-Type' : 'text/plain' },
                loader:loader
        });
}
const verification_phone=({data,loader})=>{
    return  http.post({
        url:Config.User.VERIFICATION_PHONE,
        data:query_string({
            "sourceId":data?.sourceId,
            "otp":data.otp,
            "mobile":data?.mobile,
            "mobilePrefix":data.mobilePrefix
        }),
        headers:{  'Content-Type' : 'text/plain' },
        loader:loader
    });
}

const change_password=({data,loader})=>{
    return  http.post({
        url:Config.User.CHANGE_PASSWORD,
        data:query_string({
            "otp":data.otp,
            "sourceId":data?.sourceId,
            "oldPassword":data?.oldPassword,
            "newPassword":data?.newPassword,
            "newPassword2":data?.newPassword2
        }),
        headers:{  'Content-Type' : 'text/plain' },
        loader:loader
    });
}

const withdraw_coinsPaid=({data,loader})=>{
    return  http.post({
        url:Config.User.WITHDRAW_COINSPAID,
        data:query_string({
            "otp":data.otp,
            "sourceId":data?.sourceId,
            "amount":data?.amount,
            "address":data?.address,
            "currency":data?.currency
        }),
        headers:{  'Content-Type' : 'text/plain' },
        loader:loader
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
    recoverPassword,
    verification_email,
    verification_phone,
    change_password,
    withdraw_coinsPaid
}
