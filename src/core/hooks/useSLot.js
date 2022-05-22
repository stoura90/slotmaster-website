
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
            console.log('response',response)
            if(response.status && response.data?.resultCode===0){
                let win;
                if(response.data.data?.type ===null){
                    response.data.data.type = "url";
                }



                switch (response.data?.data?.type.toLowerCase()){
                    case "html":
                        win = window.open(`/${i18n.language}/play`, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,width=1070,height=630")
                        win.onload=function (){
                            win.document.write(response.data.data.url.concat(`
                            <style>
                             html,body {
                                padding: 0 !important;
                                margin:0 !important;
                             }
                             </style>
                        `))
                        }


                        return ;
                    case 'sg_auth':
                        win = window.open(`/${i18n.language}/play`, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,width=1070,height=630",'planetaxbet.com')
                        win.onload=function (){
                            win.document.write(
                                (`
                                <html>
                                    <head>
                                    <style>
                                    html,body {
                                        padding: 0 !important;
                                        margin:0 !important;
                                    }
                                    </style>
                                </head>
                                <body>
                                    ${response?.data?.data?.url}
                                </body>
                                </html>
                            `)
                            )
                        }
                        break;
                    case 'sg_html':

                        win = window.open(`/${i18n.language}/play`,"_blank", "toolbar=yes,scrollbars=yes,resizable=yes,width=1070,height=630")
                        win.onload=function (){
                            win.document.write(response.data.data.html.concat(`
                            <style>
                             html,body {
                                padding: 0 !important;
                                margin:0 !important;
                             }
                             </style>
                         `).concat(`<script>${response.data.data.script}</script>`))
                        }


                        break;
                    default:
                        //console.log(response.data.data.url)
                        window.open(`https://planetaxbet.com/${i18n.language}/playSlot?uri=${encodeURIComponent(response.data.data.url)}`,"_blank","toolbar=yes,scrollbars=yes,resizable=yes,width=1070,height=630")
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
