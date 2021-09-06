import {useNavigation} from "../../core/hooks/useNavigation";
import {useEffect} from "react";
import {Footer, Header} from "../../components";
import {isMobile} from "react-device-detect";
import {Sport} from "../../components";
import {SportMobileView} from "../../components/sport/sportMobileView";
const SportScreen=()=>{
    const nav  = useNavigation();

    useEffect(()=>{
        console.log(isMobile)
    },[])

    return  <>
        <Header page={"sport"}/>
        <main>
            {
                isMobile? <Sport.SportMobileView/>:<Sport.EuropeanView/>
            }
        </main>
        {/*<Footer/>*/}
    </>
}

export default SportScreen;
