export const Timeout = {
  timeout:null,
  set:function (method,time=1000){
      this.timeout = setTimeout(()=>{
        method()
      },time)
  },
  clear:function (){
     clearTimeout(this.timeout)
  }
}
