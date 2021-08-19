import {Config} from "../../config";
import Request from "../../http/http";
import Http from "../../http/http2";
const play =(slot)=>{
    return Request.setEvents(false).get(Config.Slot.PLAY.replace("{gameId}",slot.gameId))
}
const list =  () => {
    return (new Http()).setLoader("zura-loader").get(Config.Slot.LIST);
}
const listByProvider =  (id) => {
    return Request.setEvents(false).get(Config.Slot.LIST_BY_PROVIDER.replace("{slotProviderId}",id));
}
const listByFilter =  (id) => {
    return Request.setEvents(false).get(Config.Slot.LIST_BY_FILTER.replace("{filterId}",id));
}
export default {
    play,
    list,
    listByProvider,
    listByFilter
}
