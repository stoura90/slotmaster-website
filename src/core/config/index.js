export const Config ={
   User:{
      SIGN_OUT:"/api/?app=logout",
      SIGN_IN: "/v1/api/login",
      SIGN_UP:"/us/v1/api/reg",
      PING: "/us/v1/api/secured/ping"
   },
   Config:{

   },
   Slot:{
      PLAY:"/ss/v1/api/secured/gis?gameId={gameId}&lang=ru",
      //LIST:"/ss/v1/api/slot/providers",
      LIST:"/ss/v1/api/slot/categories",
      LIST_BY_PROVIDER:"/ss/v1/api/slot/providers/{slotProviderId}",
      LIST_BY_FILTER:'/ss/v1/api/slot/filter/{filterId}/games'
   }
}
