import {useEffect, useLayoutEffect, useState} from "react";
import {Actions, useTranslation} from "../../core";
import {useDispatch} from "react-redux";
import {useUser} from "../../core/hooks/useUser";
import {Guest} from "../../components";
import {useNavigation} from "../../core/hooks/useNavigation";
import EventEmitter from "../../core/utils/eventEmitter";
import {useSLot} from "../../core/hooks/useSLot";

const PlaySlot= () => {
    const {t} = useTranslation()
    const dispatch = useDispatch();
    const {User} = useUser()
    const slot = useSLot()
    const navigation  = useNavigation()
    const [loaded,setLoaded]=useState(false)
    const ev  = new EventEmitter()
    useLayoutEffect(()=>{
        if(navigation.get("id")){
            slot.play({id:navigation.get("id"),gameId:navigation.get("gameId")});
        }else{
            window.close();
        }
        document.body.style.height="100vh"
        document.getElementById("root").style.height="100vh"
       // ping().then((e)=>setLoaded(e))
    },[])


    return <div style={{width:'100%', height:'100%'}}>
        <Guest/>
        {
            User.isLogged? <iframe id="slot-frame"  frameBorder="0" width={"100%"} height={"100%"} />:<div className="modal-backdrop fade "/>
        }

    </div>
}

export default PlaySlot;

