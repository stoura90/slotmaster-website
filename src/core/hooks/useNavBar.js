import {useDispatch, useSelector} from "react-redux";
import {NAVBAR_TOGGLE} from "lb-core/store/actionTypes";
import _ from "lodash";


export function useNavBar(){
    const isOpen = useSelector(store=>store.NavBar);
    const dispatch = useDispatch();
    function open(callback=null) {
        if(!isOpen){
            document.body.style.overflowY="hidden";
            document.getElementsByTagName('html')[0].style.overflow = "hidden";
            dispatch({
                type:NAVBAR_TOGGLE,
                payload:true
            })
            if(callback && _.isFunction(callback)){
                callback()
            }
        }
    }
    function close(callback=null){
        if(isOpen){
            document.body.style.overflowY="scroll";
            document.getElementsByTagName('html')[0].style.overflow = "auto";

            dispatch({
                type:NAVBAR_TOGGLE,
                payload:false
            })
            if(callback && _.isFunction(callback)){
                callback()
            }
        }
    }
    function toggle(callback){
        if(isOpen){
            close(callback)
        }else{
            open(callback)
        }
    }
    return {isOpen,toggle,open,close}
}
