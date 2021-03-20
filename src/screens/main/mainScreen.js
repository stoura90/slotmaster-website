import React, {useEffect} from 'react';
import {useNavigation} from "../../core/hooks/useNavigation";


const MainScreen = () =>{

    const nav  = useNavigation();
    useEffect(()=>{
        console.log(nav)
    },[]);

    return (
        <div className="str-height">
            <div className="width">
                dsadasd
            </div>
        </div>
    )
}

export default MainScreen
