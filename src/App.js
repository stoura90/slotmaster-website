import {Suspense, useEffect} from 'react'

import {store as Store} from './core/store/store'
import {Actions, Provider} from "./core";
import {Footer, Guest, Header, MainNavigator, Modal} from "./components";
import {close} from "./assets/img/icons/icons";
import EventEmitter from "./core/utils/eventEmitter";
import {useDispatch} from "react-redux";

const eventEmitter = new EventEmitter();
const  App=()=> {
    const dispatch = useDispatch()
    useEffect(()=>{
        ping();
        eventEmitter.on("httpError",(event)=>console.log(event))

        return ()=>{
            eventEmitter.removeListener("httpError")
        }
    },[])

    const ping = ()=>{
        dispatch(Actions.User.ping())
    }
  return (<>
          <MainNavigator/>
          <Guest/>
        </>






  )
}

export default App;
