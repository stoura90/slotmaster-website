import React, {useEffect} from 'react'
import {useTranslation} from "../../core";
import {useParams} from "react-router-dom";
import "./changeLagunge.scss"
 const ChangeLagunge = () =>{
    const {i18n} = useTranslation()

    return  <div className={"changeLagunge"}>
        <select name="ChangeLanguage" id="" value={i18n.language} onChange={e=>{
            window.history.pushState(null,null,window.location.pathname.replace(i18n.language,e.target.value))
            i18n.changeLanguage(e.target.value)
        }}>
            <option value="ru">RU</option>
            <option value="en">EN</option>
        </select>
    </div>
}
export default ChangeLagunge;
