import {Config} from "../../config";
import Request from "../../http/http";
const play =(slot)=>{
    return Request.setEvents(false).get(Config.Slot.PLAY.replace("{gameId}",slot.id))
}
const list = async () => {
    console.log('rrrr');
    const response = await Request.setEvents(false).get(Config.Slot.LIST);


    console.log('response_5', response)
    console.log('response_53333')
    //return response


    //return Request.setEvents(false).get(Config.Slot.LIST);
}
export default {
    play,
    list
}