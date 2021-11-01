import {Config} from "../../index";
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
        alert("An error occurred while registering")
    }
    return response;
}

export default {
  signIn,
  signOut,
  ping, signUp
}
