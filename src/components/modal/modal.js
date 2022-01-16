import React from 'react';
import './modal.css';
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {Button} from "../index";
const Modal = ({children,styles,title,footer,onClickBackDrop,closeButton,onClose})=>{
    return <>

        <div className={"zl2-modal"} style={{...styles}}>
            <div className={"header"}>
                <div className="title">
                    {
                        title
                    }
                </div>
                {
                    closeButton? <div className="close" onClick={()=>onClose()}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>:null

                }

            </div>

            <div className={"modal-content"}>
                {
                    children
                }
            </div>
            <div className={"footer"}>
                {
                    footer
                }
            </div>
        </div>
        <div className={"zl2-modal-backdrop"} onClick={()=>onClickBackDrop()}/>
    </>
}

Modal.propTypes={
    title:PropTypes.string,
    closeButton:PropTypes.bool,
    onClickBackDrop:PropTypes.func,
    onClose:PropTypes.func,

}
Modal.defaultProps={
    title:"ავტორიზაციის გავლა",
    closeButton:true,
    onClickBackDrop:()=>console.log("backdrop click"),
    onClose:()=>console.log("onClose")
}
export default Modal;