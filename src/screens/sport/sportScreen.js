import {useNavigation} from "../../core/hooks/useNavigation";
import {useEffect} from "react";
import {Footer, Header} from "../../components";
import {Sport} from "../../components";
const SportScreen=()=>{
    const nav  = useNavigation();

    useEffect(()=>{

    },[])

    return  <>
        <Header/>

        <main>
            <Sport.EuropeanView/>
        </main>

        {/*<Footer/>*/}

    </>
}

export default SportScreen;
