import {useNavigation} from "../../core/hooks/useNavigation";
import {useEffect} from "react";
import { Header} from "../../components";
import {isMobile} from "react-device-detect";
import {Sport} from "../../components";

import load from '../../assets/img/load.gif';
import {useParams} from "react-router-dom";
const SportScreen=(props)=>{
   /* const nav  = useNavigation();
    const params = useParams()*/
   /* useEffect(()=>{
        console.log(props)
        console.log(params)
        console.log(isMobile)
    },[])*/

    return  <>
        <Header page={"sport"}/>
        <main className='sp_cont' style={{background:`url(${load})`}}>
            {
                isMobile? <Sport.SportMobileView/>:<Sport.EuropeanView view={"Home"}/>
            }
        </main>
        {/*<Footer/>*/}
    </>
}

export default SportScreen;
