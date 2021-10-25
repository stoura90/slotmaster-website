import {Config} from "../../config";
import Request from "../../http/http";
import Http from "../../http/http2";
const play =(slot)=>{
    return (new Http()).get(Config.Slot.PLAY.replace("{gameId}",slot.id))
}
const list =  ({webPageId="1"}) => {
    return (new Http()).permitAll().setLoader("zura-loader").get(Config.Slot.LIST.replace("{webPageId}",webPageId));
}
const listByProvider =  (id,webPageId="1") => {
    return (new Http()).permitAll().get(Config.Slot.LIST_BY_PROVIDER.replace("{slotProviderId}",id).replace("{webPageId}",webPageId));
}
const listByFilter =  (id,webPageId="1") => {
    return (new Http()).permitAll().get(Config.Slot.LIST_BY_FILTER.replace("{filterId}",id).replace("{webPageId}",webPageId));
}
export default {
    play,
    list,
    listByProvider,
    listByFilter
}
