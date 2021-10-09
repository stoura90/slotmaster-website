import {useDispatch, useSelector} from "react-redux";
import {SIGN_IN} from "../store/actionTypes";
import {Actions} from "../index";
import {useUser} from "./useUser";
import {useLoader} from "./useLoader";

export function useSLot() {
    const User = useUser();
    const {setLoader} = useLoader()
    const play=(slot)=>{
 
        if(!User.User.isLogged){
            document.getElementById("signIn-btn").click();
            return;
        }
        setLoader(slot.gameId)
        Actions.Slot.play(slot).then(response=>{
            console.log(response)
            if(response.status && response.data.data.result===0){
                if(response.data.data.type ==="HTML"){
                   // window.open("https://www.w3schools.com", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
                    let win = window.open("", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,width=1070,height=630")
                    win.document.write(response.data.data.url)
                }else{
                    window.open(response.data.data.url,"_blank","toolbar=yes,scrollbars=yes,resizable=yes,width=1070,height=630")
                }
            }else{
                alert("Error")
            }
            setLoader(null)
        }).catch(reason => setLoader(null))

    }

    return  {play}
}
