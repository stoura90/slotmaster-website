export const Config ={
   User:{
      SIGN_OUT:"/api/?app=logout",
      SIGN_IN: "/v1/api/login",
      SIGN_UP:"/us/v2/api/reg",
      PING: "/us/v1/api/secured/ping",
      //INFO:"/us/v1/api/secured/personal/info",
      INFO:"/us/v2/api/secured/personal/info",
      UPDATE_INFO:"/us/v2/api/secured/personal/info/update",
      OTP:"/us/v2/api/reg/otp/get?type={type}&prefix={prefix}&value={value}",
      VERIFICATION:"/us/v2/api/secured/personal/info/verify",
      VERIFICATION_EMAIL:"/us/v2/api/secured/personal/info/email/change",
      VERIFICATION_PHONE:"/us/v2/api/secured/personal/info/mobile/change",
      CHANGE_PASSWORD:"/us/v2/api/secured/personal/info/password/change",
      WITHDRAW_COINSPAID:"/ws/v1/api/secured/payment/coinspaid/withdraw",
      GET_SECURITY_QUESTIONS:"/wsd/v1/api/security-questions",
      CHECK_SECURITY_QUESTIONS:"/us/v2/api/secured/personal/info/security/questions",
      SAVE_SECURITY_QUESTIONS:"/us/v2/api/secured/personal/info/security/questions/save",
      SAVE_2FA_AUTHENTICATION:"/us/v2/api/secured/personal/info/security/2fa",
      CONFIRM_SECURITY_QUESTIONS_OTP:"/us/v2/api/secured/personal/info/security/questions"
   },
   Config:{
      REFRESH_TOKEN:"/v1/api/refresh_token",
      SPORT_TOKEN:"/ws/v1/api/secured/sport/get/url"
   },
   Slot:{
      PLAY:"/ss/v1/api/secured/url?id={gameId}&lang={lang}",
      //LIST:"/ss/v1/api/slot/providers",
      LIST:"/ss/v1/api/page/{webPageId}/slot/categories",
      SLOT_LIST:"/ss/v1/api/page/{webPageId}/slots",
      LIST_BY_PROVIDER:"/ss/v1/api/page/{webPageId}/slot/providers/{slotProviderId}",
      LIST_BY_FILTER:'/ss/v1/api/page/{webPageId}/slot/filter/{filterId}/games'
   },
   OTP:{
      //SOURCES:"/us/v2/api/secured/personal/info/otp/sources"
      SOURCES:"/os/v1/api/secured/sources",
      GET_PRIMARY:"/us/v2/api/secured/personal/info/security/2fa"
   },
   Guest:{
      RECOVER: {
         USERNAME:"/us/v1/api/personal/recover/username?channel={channel}&token={token}&prefix={prefix}&data={data}",
         PASSWORD:"/us/v1/api/personal/recover/password?channel={channel}&token={token}&prefix={prefix}&data={data}&username={username}&otp={otp}"
      }
   },
   Deposit:{
      CoinsPaid:"/ws/v1/api/secured/payment/coinspaid/deposit",
      CoinsRate:"/ws/v1/api/secured/payment/coinspaid/rate",
      CoinsExchangeRate:"/ws/v1/api/secured/payment/coinspaid/exchange/rate"
   }
}



