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
        "containerId":"application-container",
        "token":"-",
        "defaultLanguage":"en",
        "timeZone":4,
        "hasRouterDisabled":false,
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
        window.Bootstrapper.boot(parameters, { name: "Mobile" });
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
    return <div id="application-container"/>
}
