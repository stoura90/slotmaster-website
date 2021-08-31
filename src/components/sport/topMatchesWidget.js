import React, {useEffect, useLayoutEffect, useMemo, useState} from "react";
import {useUser} from "../../core/hooks/useUser";
import {Actions} from "../../core";
import _ from 'lodash'
export const TopMatchesWidget=()=>{
    const {User} = useUser();
    const [params]=useState({
        "server":"https://sport.staging.planetaxbet.com/",
        "target":"#sport_top_match_iframe",
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
        console.log("load top matches view")
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
    return <div id="sport_top_match_iframe"/>
}
