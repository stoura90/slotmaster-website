import {useDispatch, useSelector} from "react-redux";
import {BOTTOM_BAR_TOGGLE} from "lb-core/store/actionTypes";
import _ from 'lodash';

export function useBottomBar(){
    const isOpen = useSelector(store=>store.BottomBar);
    const dispatch = useDispatch();
    function open(callback=null) {
        document.body.style.overflowY="hidden";
        document.getElementsByTagName('html')[0].style.overflow = "hidden";
        if(!isOpen){
            dispatch({
                type:BOTTOM_BAR_TOGGLE,
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
                type:BOTTOM_BAR_TOGGLE,
                payload:false
            })
            if(callback && _.isFunction(callback)){
                console.log("callback")
                callback()
            }
        }
    }
    function toggle(callback=null){
        if(isOpen){
            close(callback)
        }else{
            open(callback)
        }
    }
    return {isOpen,toggle,open,close}
}
