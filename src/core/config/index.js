export const Config ={
   User:{
      SIGN_IN:"/api/?app=user/authorization",
      SIGN_OUT:"/api/?app=logout",
      Auth: "/api/login",
      Ping: "/api/secured/user/ping"
   },
   registration:"/api/?app=user/reg_user_v2&act=registration",
   uploadFiles:"/api/?app=user/api&service=uploadImage",
   finishUploads:"/api/?app=user/api&service=finishUploads",
   qrFinishUpload:"/api/?app=goMobile&act=finishUploads",
   qrUpload:"/api/?app=goMobile&act=upload",
   getUserMobile:"/api/?app=user/api&service=getUserMobile",
   otp:"/api/?app=user/api&service=otp",
   otpMobile:"/api/?app=user/api&service=otp&step&type=mobile",
   SMS:"/api/?app=goMobile&act=sms"

}
