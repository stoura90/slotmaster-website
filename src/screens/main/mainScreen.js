import React, {useEffect, useState} from 'react';
import {Footer, Header} from "../../components";
import {useParams} from "react-router-dom";
import {useNavigation} from "../../core/hooks/useNavigation";


const MainScreen = () =>{

    const params = useParams();
    const navigator = useNavigation();


    useEffect(()=>{
        console.log(navigator.params);

    },[]);

    return (
        <>
            <Header/>



            <Footer/>
        </>
    )
}

export default MainScreen
