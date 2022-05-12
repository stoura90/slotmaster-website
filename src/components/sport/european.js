import React, {useEffect, useLayoutEffect, useMemo, useState} from "react";
import {useUser} from "../../core/hooks/useUser";
import {Actions, useTranslation} from "../../core";
import _ from 'lodash'
import Listeners from "../../utils/listeners";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {UseEvent} from "../../core/hooks/useEvent";
export const EuropeanView=({view})=>{
    const {i18n} = useTranslation()
    const {User} = useUser();
    const ev = UseEvent()
    const dispatch=useDispatch()
    const [token,setToken]=useState("_")
    const SportLogin=(event)=>{
        ev.emit("signIn",true)
    }
    const SportRegister=(event)=>{
        ev.emit("signUp",true)
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
    const [params,setParams]=useState({
        "server":["www.planetaxbet.com","planetaxbet.com"].indexOf(window.location.hostname)>-1?"https://sport.planetaxbet.com/":"https://sport.staging.planetaxbet.com/",
        "token":"_",
        "currentPage":view,
        "language":i18n.language,
        "timeZone":4,
        "oddsFormat":0,
        "login": SportLogin,
        "registration": SportRegister,
        "sportsBookView":"europeanView",
        "fixedHeight":true,
        "clearSiteStyles":false,
        "balanceChangeCallback":balanceChangeHandler,
        "onNavigateCallback":onNavigateHandler,
        "eventsHandler":eventsHandlerCallback

    })


    useEffect(()=>{
        if (User.isLogged) {
            response.then(res=>{
                if(res.status){
                    setToken(res.data.data.token)
                    loadFrame({...params,token:res.data.data.token})
                }
            })
        }else{
            loadFrame(params)
        }

        i18n.on('languageChanged', function(lng) {
            window.location.reload()
        })
        return () =>{
            i18n.off("languageChanged")
        }
    },[User.isLogged])


    const getToken=()=>{
        return  Actions.Sport.token()
    }
    const response = useMemo(async () => await getToken(), []);
    const loadFrame= (parameters) => {
        window.SportFrame.frame(_.map(parameters, (v, k) => {
            return [k, v]
        }))
    }



    return <div id="sport_div_iframe"/>
}
