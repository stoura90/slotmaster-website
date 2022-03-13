import {Config} from "../../config";
import http from "../../http/http3";
const play =(slot)=>{
    return http.get({url:Config.Slot.PLAY.replace("{gameId}",slot.id).replace("{lang}",slot.lang)})
}
const list =  ({webPageId="1"}) => {
    return http.get({url:Config.Slot.LIST.replace("{webPageId}",webPageId),permitAll:true});
}
const listByPage =  ({webPageId="1"}) => {
    return http.get({url:Config.Slot.SLOT_LIST.replace("{webPageId}",webPageId),permitAll:true});
}
const listByProvider =  (id,webPageId="1") => {
    return http.get({url:Config.Slot.LIST_BY_PROVIDER.replace("{slotProviderId}",id).replace("{webPageId}",webPageId),permitAll:true});
}
const listByFilter =  (id,webPageId="1") => {
    return http.get({url:Config.Slot.LIST_BY_FILTER.replace("{filterId}",id).replace("{webPageId}",webPageId),permitAll:true});
}
export default {
    play,
    list,
    listByProvider,
    listByFilter,
    listByPage
}
