import {Config} from "../../config";
import Request from "../../http/http";
const play =(slot)=>{
    return Request.setEvents(false).get(Config.Slot.PLAY.replace("{gameId}",slot.id))
}
export default {
    play
}