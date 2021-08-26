import React, {useEffect, useLayoutEffect, useMemo, useState} from "react";
import {useUser} from "../../core/hooks/useUser";
import {Actions} from "../../core";
import _ from 'lodash'
export const EuropeanView=()=>{
    const {User} = useUser();
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
    }

    const [params]=useState({
        "server":"https://sport.staging.planetaxbet.com/",
        "token":"_",
        "currentPage":"Home",
        "language":"en",
        "timeZone":4,
        "oddsFormat":0,
        "login": SportLogin,
        "sportsBookView":"europeanView",
        "fixedHeight":true,
        "clearSiteStyles":true,
        "balanceChangeCallback":balanceChangeHandler,
        "onNavigateCallback":onNavigateHandler,
        "eventsHandler":eventsHandlerCallback

    })




    const getToken=()=>{
        return  Actions.Sport.token()
    }
    const response = useMemo(async () => await getToken(), []);

    const loadFrame=(parameters)=>{
        console.log(_.map(parameters,(v,k)=>{
            return [k,v]
        }))
        window.SportFrame.frame(_.map(parameters,(v,k)=>{
            return [k,v]
        }))
    }
    useLayoutEffect( () => {

        if (User.isLogged) {
            response.then(res=>{
                if(res.status){
                    loadFrame({...params,token:res.data.data.token})
                }else {
                   loadFrame(params)
                }
            })
        }else{
            loadFrame(params)
        }
    },[])



    return <div id="sport_div_iframe"/>
}
