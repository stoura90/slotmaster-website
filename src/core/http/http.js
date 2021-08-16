import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import EventEmitter from "../utils/eventEmitter"
const http =  axios.create({
    baseURL: '/',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    }
})
const eventEmitter=new EventEmitter();
const Request = {
  enableEvents:true,
  data:{
        event:false,
        loader:false,
        requestEventData:null,
        loaderData:null
    },
    events:{
        global:{},
        local:{},
        loader:{}
    },
    setEvents:function (status=true){
      this.enableEvents=status;
      return this;
    },
    event:function({name,type="error",summary="Http Error", details="error", sticky=false,life=2000}){
        eventEmitter.emit(name,{severity: type, summary: summary, detail: details, sticky: sticky,life:life})
        return this;
    },
    loader:function(event='app'){
        const uuid = uuidv4();
        this.data.loader=true;
        this.data.loaderData = {event: event, uuid: uuid};
        return this;
    },

    dispatchLoader: function(event='app',status=false){
        if(!this.events['loader'][event]) return;
        this.events["loader"][event].forEach(callback=>callback(status))
        return this;
    },

    subscribeLoader: function (event,callback) {
        if(!this.events["loader"][event]) this.events["loader"][event] = [];
        this.events["loader"][event].push(callback)
        return this;
    },

    unsubscribeLoader: function(event){
        if(this.events["loader"][event]) delete this.events["loader"][event];
        return this;
    },
    post:function(url,data, header=null){
        if(this.data.loader){
            this.dispatchLoader(this.data.loaderData.event,true);
        }
        return new Promise((resolve, ) => {
            let customHeader;
            if(localStorage.getItem("access_token")){
                 customHeader =((header) ? {
                    headers:{...header, Authorization: `Bearer `+localStorage.getItem("access_token")},
                }:{
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Bearer `+localStorage.getItem("access_token")
                    }
                })
            }else{
                 customHeader=header
            }
          try {
            http.post(url,data,customHeader).then( response => {
              if(response.status===200){
                  resolve({status:true,data:response.data})
              }else{
                  if(this.enableEvents){
                      eventEmitter.emit("httpError",{severity: 'error', summary: 'Http Error', detail: `error  ${response.status}`, sticky: false,life:2000})
                  }
                  resolve({status:false,data:response.data})
              }
            }).catch(reason => {
                if(this.enableEvents) {
                    eventEmitter.emit("httpError",{severity: 'error', summary: 'Http Error', detail: `error  ${reason.response.status}`, sticky: false,life:2000})
                }
                resolve({ status:false,data: JSON.parse(reason.response.data.error) })
            })
          }catch (e) {
              console.log(e.message)
          }

        }).finally(()=>{
            if(this.data.loader){
                this.dispatchLoader(this.data.loaderData.event,false);
            }
        })
    },
    get:function(url,header){
        if(this.data.loader){
            this.dispatchLoader(this.data.loaderData.event,true);
        }

        return new Promise((resolve) => {
            let customHeader;
            if(localStorage.getItem("access_token")){
                customHeader =((header) ? {
                    headers:{...header, Authorization: `Bearer `+localStorage.getItem("access_token")},
                }:{
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Bearer `+localStorage.getItem("access_token")
                    }
                })
            }else{
                customHeader=header
            }
            http.get(url,customHeader).then(
                response=>{
                    if(response.status===200){
                        resolve({status:true,data:response.data})
                    }else{
                        if(this.enableEvents) {
                            eventEmitter.emit("httpError",{severity: 'error', summary: 'Http Error', detail: `error  ${response.status}`, sticky: false,life:2000})
                        }
                        resolve({status:false,data:response.data})
                    }
                }).catch(reason => {
                if(this.enableEvents) {
                    eventEmitter.emit("httpError",{severity: 'error', summary: 'Http Error', detail: `error  ${reason.response.status}`, sticky: false,life:2000})

                }

                resolve({ status:false })
            })
        }).finally(()=>{
            if(this.data.loader){
                this.dispatchLoader(this.data.loaderData.event,false);
            }
        })
    }

};

export default Request;
