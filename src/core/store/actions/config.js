import {Config} from "../../index";
import {PING, SIGN_IN} from "../actionTypes";
import Request from "../../http/http";
import {query_string} from "../../utils";


const Currencies =  () =>{
    return Request.get(Config.Config.Currency);
}
const UserStatusList = () =>{
    return   Request.get(Config.Config.VerifyStatusList)
}
const CountryList = () =>{
    return   Request.setEvents(true).get(Config.Config.CountryList)
}

export default {
    Currencies,
    UserStatusList,
    CountryList
}
