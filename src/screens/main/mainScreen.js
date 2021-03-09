import React, {useEffect} from 'react';
import {useNavigation} from "../../core/hooks/useNavigation";


const MainScreen = () =>{

    const nav  = useNavigation();
    useEffect(()=>{
        console.log(nav)
    },[]);

    return (
        <div>
           dsadasd
        </div>
    )
}

export default MainScreen
