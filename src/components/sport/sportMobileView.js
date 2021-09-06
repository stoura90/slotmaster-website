import React, {useEffect, useLayoutEffect, useMemo, useState} from "react";
import {useUser} from "../../core/hooks/useUser";
import {Actions} from "../../core";
import _ from 'lodash'
export const SportMobileView=()=>{
    const {User} = useUser();
    const SportLogin=(event)=>{
        document.getElementById("signIn-btn").click()
    }
    const balanceChangeHandler=(event)=>{
        console.log("balanceChangeHandler",event)
    }
    const [params]=useState({
        "server":"https://sport.staging.planetaxbet.com/",
        "containerId":"mobile_sport_div_iframe",
        "token":"_",
        "currentPage":"Home",
        "defaultLanguage":"en",
        "view": "default",
        "language":"en",
        "timeZone":4,
        "oddsFormat":0,
        "hasRouterDisabled":false,
        "bottomNavBar":false,
        "loginTrigger": SportLogin,
        "sportsBookView":"europeanView",
        "fixedHeight":true,
        "clearSiteStyles":false,
        "onUniqueIdChange":(uuid)=>console.log(uuid),
        "onBalanceChange":balanceChangeHandler,
        "events":{
            onAppMount:()=>console.log("app Mount"),
            onAppUnmount:()=>console.log("app unmount"),
        }

    })
    const getToken=()=>{
        return  Actions.Sport.token()
    }
    const response = useMemo(async () => await getToken(), []);
    const loadFrame=(parameters)=>{
        console.log(parameters)
        window.Bootstrapper.boot(parameters, { name: "Mobile" });
        }
    useLayoutEffect( () => {
        console.log("mobile_view_load")
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
    return <div id="mobile_sport_div_iframe"/>
}
