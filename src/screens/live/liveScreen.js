
import { Header} from "../../components";
import {isMobile} from "react-device-detect";
import {Sport} from "../../components";

import load from '../../assets/img/load.gif';
const LiveScreen=(props)=>{

    return  <>
        <Header page={"live"}/>
        <main className='sp_cont' style={{background:`url(${load})`}}>
            {
                isMobile? <Sport.SportMobileView/>:<Sport.EuropeanView view={"EventView"}/>
            }
        </main>
        {/*<Footer/>*/}
    </>
}

export default LiveScreen;
