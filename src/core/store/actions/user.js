import {Config} from "../../index";
import {PING, SIGN_IN} from "../actionTypes";

const signIn = ({user,pass,sms,captcha}) =>async (dispatch)=>{
  let formData = new FormData();
  formData.append("user",user);
  formData.append("pass",pass)
  const response = await Request.post(Config.User.SIGN_IN,formData);
  dispatch({
    type: SIGN_IN,
    payload: {},
    status:response.status
  })
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
  const response = await Request.post(Config.User.Ping,{})
  dispatch({
    type: PING,
    payload: response.status
  })
}

export default {
  signIn,
  signOut,
  ping
}
