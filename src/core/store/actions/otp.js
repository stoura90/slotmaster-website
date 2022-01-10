import http from "../../http/http";
import {Config} from "../../index";

const sources  = async () => {
    const response = await http.get(Config.OTP.SOURCES)
    return response.status?response.data.data:[]
}

export default {
    sources
}
