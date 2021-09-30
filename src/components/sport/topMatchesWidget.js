import React, {useEffect, useLayoutEffect, useMemo, useState} from "react";
import {useUser} from "../../core/hooks/useUser";
import {Actions} from "../../core";
import _ from 'lodash'
import {useHistory} from "react-router-dom";
export const TopMatchesWidget=({lang})=>{
    const {User} = useUser();
    const history = useHistory();

    const [params]=useState({
        "server":["www.planetaxbet.com","planetaxbet.com"].indexOf(window.location.hostname)>-1?"https://sport.planetaxbet.com/":"https://sport.staging.planetaxbet.com/",
        "target":"#top-matches-container",
        "defaultLanguage": "en"
    })
    const getToken=()=>{
        return  Actions.Sport.token()
    }
    const response = useMemo(async () => await getToken(), []);
    const loadFrame=(parameters)=>{
        window.Bootstrapper.boot(parameters, { name: "TopMatches" })
        .then(addTopMatchesEventsListeners)

    }
    function addTopMatchesEventsListeners(topMatches){

        topMatches.addEventListener('navigateToEvent', function (messageEvent) {
            console.log("navigate",messageEvent)
            history.push(`/${lang}/sport`)

        }); // console.log(messageEvent.data.Id);
        topMatches.addEventListener('navigateToChampionship', function (messageEvent) {
            console.log("navigateToChampionship",messageEvent)
        }); // console.log(messageEvent.data.Id);
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
