import axios from 'axios';
import {Config} from "../index";
import {query_string} from "../utils";
import EventEmitter from "../utils/eventEmitter";
const request =  axios.create({
    baseURL: '/',
    timeout:10000
})
const eventEmitter = new EventEmitter();

let loaders = new Map();
class Http {
    try=1;
    loader=null;
    auth=true;
    permitAll(){
        this.auth=false;
        return this;
    }
    setLoader(loader){
       this.loader=loader;
       return this;
   }
    dispatchLoader(loader='global',status=false){
        if(!loaders.has(loader)) return;
            loaders.get(loader).forEach(callback=>callback(status))
            return this;
    }
    static subscribeLoader(loader,callback) {
         if(!loaders.has(loader)) loaders.set(loader,[]);
         loaders.get(loader).push(callback)
         return this;
     }
    static unsubscribeLoader(loader){
        if(loaders.has(loader))  loaders.delete(loader);
        return this;
    }
    get(url,header=null){
        return new Promise((resolve, reject) => {
            return new Promise((resolve,reject ) => {
                let customHeader;
                if(localStorage.getItem("GRD_access_token")){
                    customHeader =((header) ? {
                        headers:{...header, Authorization: `Bearer `+localStorage.getItem("GRD_access_token")},
                    }:{
                        headers:{
                            'Content-Type': 'application/x-www-form-urlencoded',
                            Authorization: `Bearer `+localStorage.getItem("GRD_access_token")
                        }
                    })
                }else{
                    customHeader=header
                }
                if(this.loader){
                    this.dispatchLoader(this.loader,true)
                }
                request.get(url,customHeader).then(response=>{
                    if(response.status===200){
                        resolve({
                            status:true,
                            data:response.data
                        })
                    }else{
                        reject({
                            status:false,
                            reason:response
                        })
                    }
                }).catch( async reason => {
                    if (this.try ===1 && localStorage.getItem("GRD_refresh_token") && reason.message === "Request failed with status code 401" ) {
                        this.try+=1;
                        const response = await this.refreshToken()
                        if (response) {
                            this.get(url, customHeader).then(response=>{
                                if(response.status===200){
                                    resolve({
                                        status:true,
                                        data:response.data
                                    })
                                }else {
                                    reject({
                                        status: false,
                                        reason: response
                                    })
                                }})
                        } else {

                            if(!this.auth){
                                delete customHeader.headers.Authorization;
                                this.get(url, customHeader).then(response=>{
                                    if(response.status===200){
                                        resolve({
                                            status:true,
                                            data:response.data
                                        })
                                    }else {
                                        reject({
                                            status: false,
                                            reason: response
                                        })
                                    }})
                            }else{
                                eventEmitter.emit("httpError",{type:"signIn"})
                                reject({
                                    status: false,
                                    reason: reason
                                })
                            }

                        }
                    } else {
                        reject({
                            status: false,
                            reason: reason
                        })
                    }
                }).finally(()=>{
                    if(this.loader){
                        this.dispatchLoader(this.loader,false)
                    }
                })
            }).then(response=>{
                resolve(response);
            }).catch(reason => {
                if(reason.reason.status){
                    resolve(reason.reason)
                }else{
                    reject(reason.reason)
                }
            })
        })
   }
    post(url,data,header=null){
        return new Promise((resolve, reject) => {
            return new Promise((resolve,reject ) => {
                if(this.loader){
                    this.dispatchLoader(this.loader,true)
                }
                let customHeader;
                if(localStorage.getItem("GRD_access_token")){
                    customHeader =((header) ? {
                        headers:{...header, Authorization: `Bearer `+localStorage.getItem("GRD_access_token")},
                    }:{
                        headers:{
                            'Content-Type': 'application/x-www-form-urlencoded',
                            Authorization: `Bearer `+localStorage.getItem("GRD_access_token")
                        }
                    })
                }else{
                    customHeader=header
                }
                request.post(url,data,customHeader).then(response=>{
                    if(response.status===200){
                        resolve({
                            status:true,
                            data:response.data
                        })
                    }else{
                        reject({
                            status:false,
                            reason:response
                        })
                    }
                }).catch( async reason => {
                    if (this.try ===1 && localStorage.getItem("GRD_refresh_token") && reason.message === "Request failed with status code 401") {
                        this.try+=1;
                        const response = await this.refreshToken()
                        if (response) {
                            this.post(url,data, customHeader).then(response=>{
                                if(response.status===200){
                                    resolve({
                                        status:true,
                                        data:response.data
                                    })
                                }else {
                                    reject({
                                        status: false,
                                        reason: response
                                    })
                                }})
                        } else {
                            if(!this.auth){
                                delete customHeader.headers.Authorization;
                                this.post(url,data, customHeader).then(response=>{
                                    if(response.status===200){
                                        resolve({
                                            status:true,
                                            data:response.data
                                        })
                                    }else {
                                        reject({
                                            status: false,
                                            reason: response
                                        })
                                    }})
                            }else{
                                eventEmitter.emit("httpError",{type:"signIn"})
                                reject({
                                    status: false,
                                    reason: reason
                                })
                            }
                        }
                    } else {
                        reject({
                            status: false,
                            reason: reason
                        })
                    }
                }).finally(()=>{
                    if(this.loader){
                        this.dispatchLoader(this.loader,false)
                    }
                })
            })
        })

   }
    async refreshToken() {
        try{
            const response = await request.post(Config.Config.REFRESH_TOKEN, query_string({refresh_token: localStorage.getItem("GRD_refresh_token")}), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            if(response.status===200){
                localStorage.setItem("GRD_access_token",response.data.access_token)
                localStorage.setItem("GRD_refresh_token",response.data.refresh_token)
                return true;
            }
            return false;
        }catch (ex){
            eventEmitter.emit("httpError",{type:"signOut"})
            localStorage.removeItem('GRD_access_token')
            localStorage.removeItem("GRD_refresh_token")
            return false;
        }

    }
}
export default Http;
