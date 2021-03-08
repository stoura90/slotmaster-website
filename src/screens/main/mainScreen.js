import React, {useEffect, useState} from 'react';
import {Footer, Header} from "../../components";
import {useParams} from "react-router-dom";


const MainScreen = () =>{

    const params = useParams();

    useEffect(()=>{
        console.log(params);
    },[]);

    return (
        <div>
            <Header/>



            <Footer/>
        </div>
    )
}

export default MainScreen
