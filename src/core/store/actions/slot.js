import {Config} from "../../config";
import Request from "../../http/http";
import Http from "../../http/http2";
const play =(slot)=>{
    return (new Http()).get(Config.Slot.PLAY.replace("{gameId}",slot.id))
}
const list =  () => {
    return (new Http()).permitAll().setLoader("zura-loader").get(Config.Slot.LIST);
}
const listByProvider =  (id) => {
    return (new Http()).permitAll().get(Config.Slot.LIST_BY_PROVIDER.replace("{slotProviderId}",id));
}
const listByFilter =  (id) => {
    return (new Http()).permitAll().get(Config.Slot.LIST_BY_FILTER.replace("{filterId}",id));
}
export default {
    play,
    list,
    listByProvider,
    listByFilter
}
