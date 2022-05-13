import {close} from "../../assets/img/icons/icons";
import PropTypes from "prop-types";
import './PLAlert.scss';

const PLAlert = ({children,title,footer,onClickBackDrop,closeButton,onClose,contentStyle,dialogStyle,className})=>{
    return  (
        <div
            className="custom-modal"
            onClick={()=>onClickBackDrop()}

        >

            <div className={`modal-dialog modal-dialog-centered pl_alert ${className}`} style={{...dialogStyle}}>
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

                    <div className={'modal-footer'}>
                        { footer }
                    </div>
                </div>


            </div>
        </div>
    )
}
PLAlert.propTypes={
    title:PropTypes.string,
    closeButton:PropTypes.bool,
    onClickBackDrop:PropTypes.func,
    onClose:PropTypes.func,
    contentStyle:PropTypes.object
}
PLAlert.defaultProps={
    title:"",
    closeButton:true,
    onClickBackDrop:()=>console.log("backdrop click"),
    onClose:()=>console.log("onClose"),
    contentStyle:{}
}

export default PLAlert;
