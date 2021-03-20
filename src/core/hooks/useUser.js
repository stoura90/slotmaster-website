import {useDispatch, useSelector} from "react-redux";
import {SIGN_IN} from "../store/actionTypes";

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
    const signOut = ()=> dispatch({
        type:SIGN_IN,
        payload:{
            isLogged:false,
            data: {}
        }
    })

    return  {User, signIn, signOut}
}
