class JWT {
    access=null;
    refresh=null;
    constructor() {

        this.access=localStorage.getItem("PLN_A_TOKEN")||null
        this.refresh=localStorage.getItem("PLN_R_TOKEN")||null
    }
    setData(data){
        const {access_token,refresh_token} = data;
       localStorage.setItem("PLN_A_TOKEN",access_token);
       localStorage.setItem("PLN_R_TOKEN",refresh_token);
    }
    clear(){
        localStorage.removeItem("PLN_A_TOKEN");
        localStorage.removeItem("PLN_R_TOKEN");
    }

}
export default JWT;
