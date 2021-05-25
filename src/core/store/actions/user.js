import {Config} from "../../index";
import {PING, SIGN_IN} from "../actionTypes";
import Request from "../../http/http";
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
        localStorage.setItem('access_token',response.data.access_token);
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
        localStorage.removeItem('access_token');
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
  const response = await Request.setEvents(false).get(Config.User.PING)
  dispatch({
    type: PING,
      payload: response.status?response.data.data:{},
      status:response.status
  })
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
        alert("დაფიქსირდა შეცდომა")
    }
    return response;
}

export default {
  signIn,
  signOut,
  ping, signUp
}
