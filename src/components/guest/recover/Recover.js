import {PLXModal} from "../../index";
import {useEffect, useState} from "react";
import EventEmitter from "../../../core/utils/eventEmitter";
import {useTranslation} from "../../../core";

const Recover = () =>{
    const {t} = useTranslation()
    const [type,setType] = useState(null)
    const eventEmitter = new EventEmitter()
    useEffect(()=>{
        eventEmitter.on("recover",setType)
        return ()=>eventEmitter.removeListener("recover",e=>setType(null))
    },[])

    return type !==null && (
        <PLXModal
            title={t(`Forgot ${type}`)}
            onClickBackDrop={e=>setType(null)}
            onClose={e=>setType(null)}
        >

        </PLXModal>
    )
}
export default Recover;
