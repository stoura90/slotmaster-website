
import {Actions, useTranslation} from "../index";
import {useUser} from "./useUser";
import {useLoader} from "./useLoader";
import EventEmitter from "../utils/eventEmitter";
import {UseEvent} from "./useEvent";

export function useSLot() {
    const User = useUser();
    const {setLoader} = useLoader()
    const {t,i18n} = useTranslation()
    const ev =UseEvent()
    const play=(slot)=>{
        if(!User.User.isLogged){
            ev.emit("signIn",true)
            return;
        }
        setLoader(slot.gameId);
        Actions.Slot.play({...slot,lang:i18n.language}).then(response=>{
            console.log(response)
            if(response.status && response.data?.resultCode===0){
                let win;
                if(response.data.data?.type ===null){
                    response.data.data.type = "url";
                }
                switch (response.data?.data?.type.toLowerCase()){
                    case "html":
                            window.document.write(response.data.data.url.concat(`
                            <style>
                             html,body {
                                padding: 0 !important;
                                margin:0 !important;
                             }
                             </style>
                        `))

                        return ;
                    case 'sg_auth':
                       let data = response.data.data.url;
                        window.document.write(data.concat(`
                            <style>
                             html,body {
                                padding: 0 !important;
                                margin:0 !important;
                             }
                             </style>
                         `).concat(`<script>${data}</script>`))
                        break;
                    case 'sg_html':
                        window.document.write(response.data.data.html.concat(`
                            <style>
                             html,body {
                                padding: 0 !important;
                                margin:0 !important;
                             }
                             </style>
                         `).concat(`<script>${response.data.data.script}</script>`))



                        break;
                    default:
                        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                        console.log(slot,isMobile)
                        if(isMobile && slot?.gameType==="casino" ) {
                            setTimeout(()=>{
                                window.location.href=response.data.data.url
                            },10)
                            return;
                        }

                        //console.log(response.data.data.url)
                        document.getElementById("stickFooter").style.display="none"
                       document.getElementById("slot-frame").setAttribute("src",(response.data.data.url))
                        //window.open(`/${i18n.language}/playSlot?uri=${encodeURIComponent(response.data.data.url)}`,"_blank","toolbar=yes,scrollbars=yes,resizable=yes,width=1070,height=630")
                    break
                }
            }else{
                alert("Error")
            }
        })
        .finally(()=>setLoader(null))
    }

    return  {play}
}
