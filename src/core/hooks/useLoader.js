
import {useDispatch, useSelector} from "react-redux";

export function useLoader() {
    const loader = useSelector(store=>store.Loader)
    const dispatch = useDispatch();

    const setLoader=(id)=>{
        dispatch({
            type:"LOADER_TOGGLE",
            payload:id
        })
    }

    return  {loader,setLoader}
}