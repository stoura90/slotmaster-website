import {Config} from "../../config";
import Request from "../../http/http3";
import http from "../../http/http3";

const token =()=>{
    return http.get({url:Config.Config.SPORT_TOKEN})
}

export default {
    token,
}
