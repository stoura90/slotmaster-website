import React, {useEffect, useLayoutEffect, useMemo, useState} from "react";
import {useUser} from "../../core/hooks/useUser";
import {Actions} from "../../core";
import _ from 'lodash'
import Listeners from "../../utils/listeners";
import {useDispatch} from "react-redux";
export const EuropeanView=({view})=>{
    const {User} = useUser();
    const dispatch=useDispatch()
    const [token,setToken]=useState("-")
    const SportLogin=(event)=>{
        document.getElementById("signIn-btn").click()
    }
    const balanceChangeHandler=(event)=>{
        console.log("balanceChangeHandler",event)

    }
    const onNavigateHandler=(event)=>{
        console.log("onNavigateHandler",event)
    }
    const eventsHandlerCallback=(event)=>{
        console.log("eventsHandlerCallback",event)
        dispatch(Actions.User.ping())
    }
    const [params]=useState({
        "server":"https://sport.staging.planetaxbet.com/",
        "token":"_",
        "currentPage":view,
        "language":"en",
        "timeZone":4,
        "oddsFormat":0,
        "login": SportLogin,
        "sportsBookView":"europeanView",
        "fixedHeight":true,
        "clearSiteStyles":false,
        "balanceChangeCallback":balanceChangeHandler,
        "onNavigateCallback":onNavigateHandler,
        "eventsHandler":eventsHandlerCallback

    })
    const getToken=()=>{
        return  Actions.Sport.token()
    }
    const response = useMemo(async () => await getToken(), []);
    const listeners=Listeners();
    const loadFrame= (parameters) => {
        window.SportFrame.frame(_.map(parameters, (v, k) => {
            return [k, v]
        }))
    }
    useLayoutEffect( () => {
        if (User.isLogged) {
            response.then(res=>{
                if(res.status){
                    setToken(res.data.data.token)
                    loadFrame({...params,token:res.data.data.token})
                }else {
                   loadFrame(params)
                }
            })
        }else{
            loadFrame(params)
        }
       /* listeners.onWindowResizeListener((window)=>{
            if(Timeout.timeout){
                Timeout.clear()
            }
            Timeout.set(()=>{
                loadFrame({...params,token:token})
            },200)
        })*/
       /* return ()=>{
            listeners.onRemoveWindowResizeListener(e=>{
                console.log("removeListener")
            })
        }*/
    },[])
    return <div id="sport_div_iframe"/>
}
