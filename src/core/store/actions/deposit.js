import http from "../../http/http3";
import {Config} from "../../config";

const getCoinSpaidOrder=({loader})=>{
    return http.get({url:Config.Deposit.CoinsPaid,loader:loader})
}

export {
    getCoinSpaidOrder
}
