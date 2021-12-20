import {useEffect, useLayoutEffect, useState} from "react";
import {Actions, useTranslation} from "../../core";
import {useDispatch} from "react-redux";
import {useUser} from "../../core/hooks/useUser";
import {Guest} from "../../components";
import {useNavigation} from "../../core/hooks/useNavigation";

const PlaySlot= () => {
    const {t} = useTranslation()
    const dispatch = useDispatch();
    const {User} = useUser()
    const navigation  = useNavigation()
    const [loaded,setLoaded]=useState(false)
    useLayoutEffect(()=>{
        if(!navigation.get("uri")){
            window.close()
        }
        document.body.style.height="100vh"
        document.getElementById("root").style.height="100vh"
        ping().then(setLoaded)
    },[])
    useEffect(()=>{
        if(!User.isLogged){
            document.getElementById("signIn-btn").click();
        }
    },[loaded])

    const ping = () => {
      return dispatch(Actions.User.ping())
    }

    return <div style={{width:'100%', height:'100%'}}>
        <Guest/>
        <button className="btn-text text-capitalize" data-bs-toggle="modal" data-bs-target="#LoginModal"
                id="signIn-btn" style={{display:"none"}}>{t("Log In")}
        </button>


        {
            User.isLogged? <iframe src={navigation.get("uri")} frameBorder="0" width={"100%"} height={"100%"}/>:<div className="modal-backdrop fade "/>
        }

    </div>
}

export default PlaySlot;
