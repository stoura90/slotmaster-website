import http from "../../http/http3";
import {Config} from "../../config";

const getCoinSpaidOrder=({currency,loader})=>{
    return http.get({url:Config.Deposit.CoinsPaid.concat('?currency=',currency),loader:loader})
}

const getCoinRate=({currency,loader})=>{
    return http.get({url:Config.Deposit.CoinsRate.concat('?currency=',currency),loader:loader})
}

const getCoinExchangeRate=({currency,loader})=>{
    return http.get({url:Config.Deposit.CoinsExchangeRate.concat('?currency=',currency),loader:loader})
}
export {
    getCoinSpaidOrder,
    getCoinRate,
    getCoinExchangeRate
}
