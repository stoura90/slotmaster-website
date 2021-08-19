import {useDispatch, useSelector} from "react-redux";
import {SIGN_IN} from "../store/actionTypes";
import _ from 'lodash'
export function useUser() {
    const User = useSelector(store=>store.User);
    const dispatch = useDispatch();
    const signIn = (data)=>{
        dispatch({
            type:SIGN_IN,
            payload:{
                isLogged:true,
                data:data
            }
        })
    }
    const signOut = (callback=null)=>{
        dispatch({
            type:SIGN_IN,
            payload:{
                isLogged:false,
                data: {}
            }
        })
        if(callback && _.isFunction(callback)){
            callback()
        }
    }

    return  {User, signIn, signOut}
}
