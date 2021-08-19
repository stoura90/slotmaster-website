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
            <div className="container">
                <Sport.EuropeanView/>
            </div>
        </main>

        <Footer/>

    </>
}

export default SportScreen;
