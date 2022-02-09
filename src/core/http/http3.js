import axios from 'axios';
import {UseEvent} from "../hooks/useEvent";

import JWT from "../models/JWT";
import {Config} from "../config";
import {query_string} from "../utils";
const http =  axios.create({
    baseURL: '/',
    timeout:10000
})
const loaders = UseEvent();

class Http {

    static get({url,loader,headers,permitAll=false,enableRefreshToken=true}){
        const jwt  = new JWT()
        return new Promise((resolve) => {
            if (loader) this.setLoader(loader, true);
            http.get(url,permitAll?{}:{headers: {
                    'Authorization': `bearer ${jwt.access}`
                }}).then(response=>{
                    resolve(response.status===200?{status:true,data:response.data}:{status:false,data:response.data})
            }).catch( async reason => {
                if (enableRefreshToken&& jwt.refresh && reason.response.status === 401) {
                    if(enableRefreshToken){
                        let refresh = await this.refreshToken(jwt)
                        if(refresh.status){
                            jwt.setData(refresh.data.data);
                            resolve(this.get({url,loader,headers,permitAll,enableRefreshToken:false}))
                        }
                    }else{
                        loaders.emit('signIn',true);
                        resolve({status: false, error: reason?.response?.data})
                    }
                } else {
                    resolve({status: false, error: reason?.response?.data})
                }
                //window.pushEvent(reason.response.data.message,"error")

            }).finally(()=>{
                if (loader) this.setLoader(loader, false);
            })
        })

    }
    static post({url,data,loader,headers,permitAll=false,enableRefreshToken=true}){
        const jwt  = new JWT()
        return  new Promise(resolve => {
            if (loader) this.setLoader(loader, true);
            http.post(url,data,permitAll?{}:{headers: {
                    'Authorization': `bearer ${jwt.access}`
                }}).then(response=>{
                resolve(response.status===200?{status:true,data:response.data}:{status:false,data:response.data})
            }).catch(async reason => {
                if (enableRefreshToken && jwt.refresh && reason.response.status === 401) {
                    if (enableRefreshToken) {
                        let refresh = await this.refreshToken(jwt)
                        if (refresh.status) {
                            jwt.setData(refresh.data.data);
                            resolve(this.post({
                                url,data,loader,headers,permitAll,enableRefreshToken:false
                            }))
                        }
                    } else {
                        loaders.emit('signIn', true);
                        resolve({status: false, error: reason?.response?.data})

                    }
                } else {
                    resolve({status: false, error: reason?.response?.data})
                }
            }).finally(()=>{
                if (loader) this.setLoader(loader, false);
            })
        })

    }
    static put({url,data,loader,headers,permitAll=false,enableRefreshToken=true}){
        const jwt  = new JWT()
        return  new Promise(resolve => {
            if (loader) this.setLoader(loader, true);
            http.put(url,data,permitAll?{}:{headers: {
                    'Authorization': `bearer ${jwt.access}`
                }}).then(response=>{
                resolve(response.status===200?{status:true,data:response.data}:{status:false,data:response.data})
            }).catch(async reason => {
                if (enableRefreshToken && jwt.refresh && reason.response.status === 401) {
                    if (enableRefreshToken) {
                        let refresh = await this.refreshToken(jwt)
                        if (refresh.status) {
                            jwt.setData(refresh.data.data);
                            resolve(this.put({
                                url,data,loader,headers,permitAll,enableRefreshToken:false
                            }))
                        }
                    } else {
                        loaders.emit('signIn', true);
                        resolve({status: false, error: reason?.response?.data})

                    }
                } else {
                    resolve({status: false, error: reason?.response?.data})
                }
            }).finally(()=>{
                if (loader) this.setLoader(loader, false);
            })
        })

    }
    static setLoader(loader, status) {
        if (typeof loader === "string") {
            loaders.emit(loader, status);
        } else {
            try {
                loader(status);
            } catch (e) {
                console.info(e.message);
            }
        }
    }
    static refreshToken(jwt){

        console.log("refreh",jwt)
        return new Promise((resolve)=>{
            this.post({url:Config.Config.REFRESH_TOKEN,data: query_string({refresh_token:jwt.refresh })})
                .then(response=>{
                    console.log("accept tocken",response)
                    resolve({status:true,data:response})
                })
                .catch(reason => {
                    console.log("reject reason",reason)
                    resolve({status:false})
                })
        })

    }
}
export default Http;
