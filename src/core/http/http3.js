import axios from 'axios';
import {UseEvent} from "../hooks/useEvent";

import JWT from "../models/JWT";
import {Config} from "../config";
import {query_string} from "../utils";
import {useUser} from "../hooks/useUser";
const http =  axios.create({
    baseURL: '/',
    timeout:10000
})
const loaders = UseEvent();


class Http {

    static get({url,loader,headers,permitAll=false,enableRefreshToken=true,header}){
        const jwt  = new JWT()
        return new Promise((resolve) => {

            if (loader) this.setLoader(loader, true);
            http.get(url,permitAll? header? {headers:{...header}}:{} :{headers: {
                    ...header,
                    'Authorization': `bearer ${jwt.access}`
                }}).then(response=>{
                    resolve(response.status===200?{status:true,data:response.data}:{status:false,data:response.data})
            }).catch( async reason => {
                console.log("refresh",enableRefreshToken,jwt?.refresh,reason?.response?.status)

                if (enableRefreshToken && jwt?.refresh && reason?.response?.status === 401) {
                    if(enableRefreshToken){
                        let refresh = await this.refreshToken(jwt)
                        console.log("refresh-token",refresh)

                        if(refresh?.status){
                            jwt.setData(refresh.data.data);
                            resolve(this.get({url:url,loader:loader,headers:headers,permitAll:permitAll,enableRefreshToken:false,header:header}))
                        }else{
                            loaders.emit('plxEvent',{type:'signOut'})

                            resolve({status:false})

                        }
                    }else{
                        loaders.emit('plxEvent',{type:'signOut'})

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
    static post({url,data,loader,headers,permitAll=false,enableRefreshToken=true,header}){
        const jwt  = new JWT()
        return  new Promise(resolve => {
            if (loader) this.setLoader(loader, true);
            http.post(url,data,permitAll? header? {headers:{...header}}:{} :{headers: {
                    ...header,
                    'Authorization': `bearer ${jwt.access}`
                }}).then(response=>{
                resolve(response.status===200?{status:true,data:response.data}:{status:false,data:response.data})
            }).catch(async reason => {
                if (enableRefreshToken && jwt.refresh && reason?.response.status === 401) {
                    if (enableRefreshToken) {
                        let refresh = await this.refreshToken(jwt)
                        if (refresh.status) {
                            jwt.setData(refresh.data.data);
                            resolve(this.post({
                                url:url,data:data,loader:loader,headers:headers,permitAll:permitAll,enableRefreshToken:false,header:header
                            }))
                        }else{
                            loaders.emit('plxEvent',{type:'signOut'})
                            resolve({status:false})
                        }
                    } else {
                        loaders.emit('plxEvent',{type:'signOut'})

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
                if (enableRefreshToken && jwt.refresh && reason?.response.status === 401) {
                    if (enableRefreshToken) {
                        let refresh = await this.refreshToken(jwt)
                        if (refresh.status) {
                            jwt.setData(refresh.data.data);
                            resolve(this.put({
                                url:url,data:data,loader:loader,headers:headers,permitAll:permitAll,enableRefreshToken:false
                            }))
                        }else{
                            loaders.emit('plxEvent',{type:'signOut'})
                            resolve({status:false})
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
        return new Promise((resolve)=>{
            http.post( Config.Config.REFRESH_TOKEN, query_string({"refresh_token":jwt.refresh }))
                .then(response=>{
                    resolve({status:true,data:response})
                })
                .catch(reason => {
                    jwt.clear()

                    resolve({status:false})

                })
        })

    }
}
export default Http;
