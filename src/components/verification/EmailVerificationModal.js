import {close} from "../../assets/img/icons/icons"
import {useEffect, useState} from "react";

window.reSendInterval=null;
export const EmailVerificationModal = ({email})=>{
    const [error,setError]=useState("")
    let [reSend,setReSend]=useState(-1)
    const  [code,setCode]=useState("")


    useEffect(()=>{

        if(reSend===-1){
            if(window.reSendInterval){
                clearInterval(window.reSendInterval)
                window.reSendInterval=null
            }
        }else{
            if(!window.reSendInterval){
                window.reSendInterval = setInterval(()=>{
                     setReSend(--reSend)
                },1000)

            }
        }
    },[reSend])
    return <div
        className="modal fade"
        id="confirmEmail"
        tabIndex="-1"
        aria-labelledby="confirmPhoneLabel"
        aria-hidden="true"
    >
        <div className="modal-dialog modal-dialog-centered auth-modal">
            <div className="modal-content">
                <div className="modal-head mb-0">
                    <button className="close" data-bs-dismiss="modal">
                        <img src={close} alt="Close modal"/>
                    </button>
                    <div className="modal-title">Email Verification</div>
                </div>
                <form onSubmit={e=>{
                    e.preventDefault();
                    setError("Incorrect sms code")
                    setTimeout(()=>{
                        setError("")
                    },2000)

                }} className="confirm-form">
                    <p className="confirm-text">
                        A 6-digit SMS code was sent to:
                        <br/>
                        <span className="phone-num">{email}</span><br/> Please enter the
                        code in the field below to confirm:
                    </p>
                    <div className="input-label-border">
                        <input type="number" name="code" id="code" value={code} onChange={e=>setCode(e.target.value)} className="for-confirm"/>
                        <label htmlFor="code">SMS Code</label>
                        {
                            reSend!==-1? <span className="timeout">{reSend}</span>: <button type="button" className="btn-confirm" onClick={()=>{
                                setCode("")
                                setReSend(10)
                            }}>Send</button>
                        }
                    </div>
                    <p style={{color:"red"}}>{error}</p>
                    <button type="submit" className="btn-dep justify-content-center px-0">
                        Confirm
                    </button>
                </form>
            </div>
        </div>
    </div>
}
