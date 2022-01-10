export const Config ={
   User:{
      SIGN_OUT:"/api/?app=logout",
      SIGN_IN: "/v1/api/login",
      SIGN_UP:"/us/v2/api/reg",
      PING: "/us/v1/api/secured/ping",
      //INFO:"/us/v1/api/secured/personal/info",
      INFO:"/us/v2/api/secured/personal/info",
      UPDATE_INFO:"/us/v1/api/secured/personal/info/update",
      OTP:"/us/v2/api/reg/otp/get?type={type}&prefix={prefix}&value={value}"
   },
   Config:{
      REFRESH_TOKEN:"/v1/api/refresh_token",
      SPORT_TOKEN:"/ws/v1/api/secured/sport/get/url"
   },
   Slot:{
      PLAY:"/ss/v1/api/secured/url?id={gameId}&lang=ru",
      //LIST:"/ss/v1/api/slot/providers",
      LIST:"/ss/v1/api/page/{webPageId}/slot/categories",
      SLOT_LIST:"/ss/v1/api/page/{webPageId}/slots",
      LIST_BY_PROVIDER:"/ss/v1/api/page/{webPageId}/slot/providers/{slotProviderId}",
      LIST_BY_FILTER:'/ss/v1/api/page/{webPageId}/slot/filter/{filterId}/games'
   },
   OTP:{
      SOURCES:"/us/v2/api/secured/personal/info/otp/sources"
   }
}



