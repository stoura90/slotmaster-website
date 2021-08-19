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
                setTimeout(()=>window.open(response.data.data.url,"_blank"),10)
            }else{
                alert("Error")
            }
            setLoader(null)
        }).catch(reason => setLoader(null))

    }

    return  {play}
}
