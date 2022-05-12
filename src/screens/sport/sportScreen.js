import {useNavigation} from "../../core/hooks/useNavigation";
import {useEffect} from "react";
import { Header} from "../../components";
import {isMobile} from "react-device-detect";
import {Sport} from "../../components";

import load from '../../assets/img/load.gif';
const SportScreen=(props)=>{
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
