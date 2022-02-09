import axios from 'axios';
import {UseEvent} from "../hooks/useEvent";

import JWT from "../models/JWT";
const http =  axios.create({
    baseURL: '/',
    timeout:10000
})
const loaders = UseEvent();

class Http {

    static get({url,loader,headers,permitAll=false}){
        const jwt  = new JWT()
        console.log(jwt)
        return new Promise((resolve) => {
            if (loader) this.setLoader(loader, true);
            http.get(url,permitAll?{}:{headers: {
                    'Authorization': `bearer ${jwt.access}`
                }}).then(response=>{
                resolve(response.status===200?{status:true,data:response.data}:{status:false,data:response.data})
            }).catch(reason => {
                resolve({ status:false , error:reason.response.data})
                //window.pushEvent(reason.response.data.message,"error")

            }).finally(()=>{
                if (loader) this.setLoader(loader, false);
            })
        })

    }
    static post({url,data,loader,headers,permitAll=false}){
        const jwt  = new JWT()
        return  new Promise(resolve => {
            if (loader) this.setLoader(loader, true);
            http.post(url,data,permitAll?{}:{headers: {
                    'Authorization': `bearer ${jwt.access}`
                }}).then(response=>{
                resolve(response.status===200?{status:true,data:response.data}:{status:false,data:response.data})
            }).catch(reason =>{
                resolve({ status:false , error:reason.response.data})
                console.log(reason.response.data.message)
                //window.pushEvent(reason.response.data.message,"error")
            }).finally(()=>{
                if (loader) this.setLoader(loader, false);
            })
        })

    }
    static put({url,data,loader,headers,permitAll}){
        const jwt  = new JWT()
        return  new Promise(resolve => {
            if (loader) this.setLoader(loader, true);
            http.put(url,data,permitAll?{}:{headers: {
                    'Authorization': `bearer ${jwt.access}`
                }}).then(response=>{
                resolve(response.status===200?{status:true,data:response.data}:{status:false,data:response.data})
            }).catch(reason =>{
                resolve({ status:false , error:reason.response.data})
                //window.pushEvent(reason.response.data.message,"error")
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
}
export default Http;
