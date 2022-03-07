import http from "../../http/http3";
import {Config} from "../../index";

const sources  = async () => {
    const response = await http.get({url:Config.OTP.SOURCES})
    return response.status?response.data.data:[]
}

const getPrimary  = async () => {
    const response = await http.get({url:Config.OTP.GET_PRIMARY})
    return response.status?response.data.data:[]
}

export default {
    sources,
    getPrimary
}
