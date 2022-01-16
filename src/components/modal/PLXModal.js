import {close} from "../../assets/img/icons/icons";
import PropTypes from "prop-types";

const PLXModal = ({children,title,footer,onClickBackDrop,closeButton,onClose})=>{
    return  (
        <div
            className="custom-modal"
            onClick={()=>onClickBackDrop()}
        >

            <div className="modal-dialog modal-dialog-centered auth-modal">
                <div className="modal-content">
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

}
PLXModal.defaultProps={
    title:"",
    closeButton:true,
    onClickBackDrop:()=>console.log("backdrop click"),
    onClose:()=>console.log("onClose")
}

export default PLXModal;
