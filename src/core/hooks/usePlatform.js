import _ from 'lodash';
import {useNavigation} from "./useNavigation";
import {useEffect, useState} from "react";
export function usePlatform() {
    const navigator = useNavigation();
    const [platform,setPlatform] = useState("web");
   useEffect(()=>{
    if(_.isNull(navigator.get('platform'))){
        setPlatform("web");
        navigator.set("platform","web")
    }else{
        setPlatform(navigator.get("platform"));
    }
   },[navigator.get("platform")])

    return  {platform}
}

