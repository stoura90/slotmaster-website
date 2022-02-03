import {close} from "../../assets/img/icons/icons";
import PropTypes from "prop-types";

const PLXModal = ({children,title,footer,onClickBackDrop,closeButton,onClose,contentStyle,dialogStyle})=>{
    return  (
        <div
            className="custom-modal"
            onClick={()=>onClickBackDrop()}

        >

            <div className="modal-dialog modal-dialog-centered auth-modal" style={{...dialogStyle}}>
                <div className="modal-content" style={{...contentStyle}}>
                    <div className="modal-head mb-0">
                        {
                            closeButton && <button className="close" data-bs-dismiss="modal" onClick={()=>onClose()}>
                                <img src={close} alt="Close modal"/>
                            </button>
                        }
                        <div className="modal-title">{title}</div>
                    </div>
                    { children }
                </div>
                <div className={'modal-footer'}>
                    { footer }
                </div>

            </div>
        </div>
    )
}
PLXModal.propTypes={
    title:PropTypes.string,
    closeButton:PropTypes.bool,
    onClickBackDrop:PropTypes.func,
    onClose:PropTypes.func,
    contentStyle:PropTypes.object
}
PLXModal.defaultProps={
    title:"",
    closeButton:true,
    onClickBackDrop:()=>console.log("backdrop click"),
    onClose:()=>console.log("onClose"),
    contentStyle:{}
}

export default PLXModal;
