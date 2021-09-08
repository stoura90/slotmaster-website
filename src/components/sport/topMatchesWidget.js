import React, {useEffect, useLayoutEffect, useMemo, useState} from "react";
import {useUser} from "../../core/hooks/useUser";
import {Actions} from "../../core";
import _ from 'lodash'
export const TopMatchesWidget=()=>{
    const {User} = useUser();
    const [params]=useState({
        "server":"https://sport.staging.planetaxbet.com/",
        "target":"#top-matches-container",
        "defaultLanguage": "en"
    })
    const getToken=()=>{
        return  Actions.Sport.token()
    }
    const response = useMemo(async () => await getToken(), []);
    const loadFrame=(parameters)=>{
        window.Bootstrapper.boot(parameters, { name: "TopMatches" });
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
    return <div id="top-matches-container"/>
}
