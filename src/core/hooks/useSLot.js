import {useDispatch, useSelector} from "react-redux";
import {SIGN_IN} from "../store/actionTypes";
import {Actions, useTranslation} from "../index";
import {useUser} from "./useUser";
import {useLoader} from "./useLoader";

export function useSLot() {
    const User = useUser();
    const {setLoader} = useLoader()
    const {t,i18n} = useTranslation()
    const play=(slot)=>{

        if(!User.User.isLogged){
            document.getElementById("signIn-btn").click();
            return;
        }
        setLoader(slot.gameId)
        Actions.Slot.play(slot).then(response=>{
            if(response.status && response.data.data.result===0){
                if(response.data.data.type ==="HTML"){
                   // window.open("https://www.w3schools.com", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
                    let win = window.open(`/${i18n.language}/playSlot`, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,width=1070,height=630")

                   console.log(response.data.data.url)
                    win.document.write(response.data.data.url.concat(`
                        <style>
                         html,body {
                            padding: 0 !important;
                            margin:0 !important;
                         }
                         </style>
                    `))
                    win.document.append()
                }else{
                    window.open(`/${i18n.language}/playSlot?uri=${response.data.data.url}`,"_blank","toolbar=yes,scrollbars=yes,resizable=yes,width=1070,height=630")
                }
            }else{
                alert("Error")
            }
            setLoader(null)
        }).catch(reason => setLoader(null))

    }

    return  {play}
}
