import React, {useEffect, useState} from 'react'
import {useTranslation} from "../../core";
import {useParams} from "react-router-dom";
import "./changeLagunge.scss"
 const ChangeLagunge = () =>{
    const {i18n} = useTranslation();
    const [activeLang,setActiveLang] = useState(i18n.language)

     const changeLang =(lang)=>{
         window.history.pushState(null,null,window.location.pathname.replace(i18n.language,lang))
         i18n.changeLanguage(lang);
         setActiveLang(lang);
     }

    return  <div className={"changeLagunge"}>
        <div className="lang" data-lang={activeLang}>
            <div className="active-lang">&nbsp;</div>
            <div className="lang-wrapper">
                <div className="items">
                    <div className="item" data-lang="ru" onClick={()=>changeLang('ru')}>RUS</div>
                    <div className="item" data-lang="en" onClick={()=>changeLang('en')}>ENG</div>
                </div>
            </div>
        </div>
    </div>
}
export default ChangeLagunge;
