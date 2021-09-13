import {Suspense, useEffect, useLayoutEffect, useState} from 'react'

import {Actions, Provider} from "./core";
import {Footer, Guest, Header, MainNavigator, Modal} from "./components";
import EventEmitter from "./core/utils/eventEmitter";
import {useDispatch} from "react-redux";
import {useUser} from "./core/hooks/useUser";

const eventEmitter = new EventEmitter();
const  App=()=> {
    const dispatch = useDispatch();
    const {signOut} = useUser()
    const [loaded,setLoaded]=useState(false)
    useEffect( () => {
       // ping()
        eventEmitter.on("httpError", errorHandler)

        return () => {
            eventEmitter.removeListener("httpError")
        }

    },[])

    const errorHandler=(event)=>{
        switch (event.type){
            case 'signOut': signOut();break;
            case 'signIn': signOut(()=>{
                setTimeout(()=>{
                    document.getElementById("signIn-btn").click();
                },200)


            });break;
            default: break;
        }
    }
    const ping = () => {
          dispatch(Actions.User.ping()).then(setLoaded)
    }
  return loaded && (<>
          <MainNavigator/>
          <Guest/>
        </>
  )
}

export default App;
