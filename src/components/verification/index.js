import {EmailVerificationModal} from "./EmailVerificationModal";
import {MobileVerificationModal} from "./MobileVerificationModal";
import {useOTP} from "../../core/hooks/useOTP";
import {OtpVerificationModal} from "./OtpVerificationModal";

const  OTP =()=>{
    const {otp,CLOSE} = useOTP()


    const onSubmit = (e) =>{
        console.log(e)
    }
    return  <>
        {
            otp.type==="multi" && <OtpVerificationModal
                        title={otp.title}
                        additionalParams={otp.additionalParams}
                        verify={otp.verify}
                        onSubmit={onSubmit}
                        err={otp.error}
                        onClose={CLOSE}
                        send={otp.send}
                        save={otp.save}
                />
        }
        {
            otp.type=== 'email' && <EmailVerificationModal
                                        title={otp.title}
                                        additionalParams={otp.additionalParams}
                                        email={otp.value}
                                        verify={otp.verify}
                                        onSubmit={onSubmit}
                                        err={otp.error}
                                        onClose={CLOSE}
                                        send={otp.send}
                                        save={otp.save}
                                    />
        }
        {
            otp.type=== 'phone' && <MobileVerificationModal
                                        title={otp.title}
                                        additionalParams={otp.additionalParams}
                                        number={otp.value}
                                        verify={otp.verify}
                                        prefix={otp.prefix}
                                        onSubmit={onSubmit}
                                        err={otp.error}
                                        onClose={CLOSE}
                                        send={otp.send}
                                        save={otp.save}
            />
        }
    </>
}
export default OTP;
