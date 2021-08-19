import {Config} from "../../config";
import Request from "../../http/http";
const token =()=>{
    return Request.setEvents(false).get(Config.Config.SPORT_TOKEN)
}

export default {
    token,
}
