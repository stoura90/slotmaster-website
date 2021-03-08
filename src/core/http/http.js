import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const http =  axios.create({
    baseURL: '/'
})

const Request = {
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
    event:function({type='global',event='test'}){
        const uuid = uuidv4();
        this.data.event=true;
        this.data.requestEventData = {type: type, event: event, uuid: uuid};
        return this;
    },
    loader:function(event='app'){
        const uuid = uuidv4();
        this.data.loader=true;
        this.data.loaderData = {event: event, uuid: uuid};
        return this;
    },
    dispatch:function(type,event,data){
        if(!this.events[type][event]) return;
        this.events[type][event].forEach(callback=>callback(data))
    },
    dispatchLoader: function(event='app',status=false){
        if(!this.events['loader'][event]) return;
        this.events["loader"][event].forEach(callback=>callback(status))
        return this;
    },
    subscribe: function (type,event,callback) {
        if(!this.events[type][event]) this.events[type][event] = [];
        this.events[type][event].push(callback);
        return this;
    },
    subscribeLoader: function (event,callback) {
        if(!this.events["loader"][event]) this.events["loader"][event] = [];
        this.events["loader"][event].push(callback)
        return this;
    },
    unsubscribe: function(type,event,callback){
        if(this.events[type][event]) delete this.events[type][event];
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
          try {
            http.post(url,data,((header) ? header:{})).then( response => {
              if(response.status===200){
                if(!response.data){
                  resolve({status:true})
                }else{
                  if(response.data["status"] === 1){
                    resolve({status:true,data:response.data})
                  }else{
                    if(this.data.event){
                      this.dispatch(this.data.requestEventData.type,this.data.requestEventData.event,{type: "error", message: response.data.error});
                    }
                    resolve({status:false,data:response.data})
                  }
                }
              }
            }).catch(reason => {
              if(this.data.event){
                this.dispatch(this.data.requestEventData.type,this.data.requestEventData.event,{type: "error", message:reason.message});
              }
              console.log(reason)
              if(reason.response.status === 401){
                  this.dispatch('global','Unauthorized',{type: "error", message:reason.response.message});
              }
              resolve({ status:false })
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
    get:function(url){
        if(this.data.loader){
            this.dispatchLoader(this.data.loaderData.event,true);
        }

        return new Promise((resolve) => {
            http.get(url).then(
                response=>{
                    if(response.status===200){
                        if(!response.data){
                            resolve({status:true})
                        }else{
                          if(response.data["status"] === 1){
                                resolve({status:true,data:response.data})
                            }else{
                                if(this.data.event){
                                    this.dispatch(this.data.requestEventData.type,this.data.requestEventData.event,{type: "error", message: response.data.error});
                                }
                                resolve({status:false,data:response.data})
                            }
                        }
                    }
                }).catch(reason => {
                if(this.data.event){
                    this.dispatch(this.data.requestEventData.type,this.data.requestEventData.event,{type: "error", message:reason.message});
                }
                if(reason.response &&reason.response.status === 401){
                    this.dispatch('global','Unauthorized',{type: "error", message:reason.response.message});
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
