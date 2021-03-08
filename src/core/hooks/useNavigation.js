import { useParams} from "react-router-dom";
export function useNavigation() {
    let params  = useParams();
    const url = new URL(window.location);
    const set=(key,value)=>{
        if(key && value){
            url.searchParams.set(key, value);
            window.history.pushState({}, '', url);
        }
    }
    const remove=(key)=>{
        if(key ){
            url.searchParams.delete(key);
            window.history.pushState({}, '', url);
        }
    }
    const get=(key)=>{
        if(key ){
            return url.searchParams.get(key);
        }
    }

    return {params,set,remove,get}
}
