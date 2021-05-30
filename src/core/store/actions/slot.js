import {Config} from "../../config";
import Request from "../../http/http";
const play =(slot)=>{
    return Request.setEvents(false).get(Config.Slot.PLAY.replace("{gameId}",slot.gameId))
}
const list =  () => {
    return Request.setEvents(false).get(Config.Slot.LIST);
}
const listByProvider =  (id) => {
    return Request.setEvents(false).get(Config.Slot.LIST_BY_PROVIDER.replace("{slotProviderId}",id));
}
export default {
    play,
    list,
    listByProvider
}