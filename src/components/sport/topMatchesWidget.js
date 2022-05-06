import React, {useEffect, useLayoutEffect, useMemo, useState} from "react";
import {useUser} from "../../core/hooks/useUser";
import {Actions, useTranslation} from "../../core";
import {useHistory} from "react-router-dom";
export const TopMatchesWidget=({lang})=>{
    const {i18n} = useTranslation()
    const {User} = useUser();
    const history = useHistory();
    const [widgetLang,setWidgetLang]=useState(lang)
    const [params]=useState({
        "server":["www.planetaxbet.com","planetaxbet.com"].indexOf(window.location.hostname)>-1?"https://sport.planetaxbet.com/":"https://sport.staging.planetaxbet.com/",
        "containerId":"top-matches-container",
        "defaultLanguage":lang
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
    useEffect( () => {
        i18n.on('languageChanged', (lng)=> {
            setWidgetLang(lng)
        })
        return () =>{
            i18n.off("languageChanged",lng=>{
                setWidgetLang(lng)
            })
        }
    },[])

    useEffect(() => {
        loadWidget()

    }, [widgetLang]);


    const loadWidget=()=>{
        console.log(lang)
        if (User.isLogged) {
            response.then(res=>{
                console.log('asdada',res)
                if(res.status){
                    loadFrame({...params,token:res.data.data.token,defaultLanguage:widgetLang})
                }else {
                    loadFrame({...params,defaultLanguage:widgetLang})
                }
            })
        }else{
            loadFrame({...params,defaultLanguage:widgetLang})
        }
    }

    return <div id="top-matches-container">
        <div className="widget_loader"/>
    </div>
}
