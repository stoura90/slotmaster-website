import React from "react";
import PropTypes from 'prop-types';
import './button.css'
const Button =({className,title,onCLick})=>{
    return <button className={`zl2-button ${className}`} onClick={()=>onCLick()}>{title}</button>
}
Button.propTypes={
    title:PropTypes.string.isRequired,
    className:PropTypes.oneOf(["primary","secondary" , "success","danger","warning","info","light","dark","link"]),
    onCLick:PropTypes.func.isRequired
}
Button.defaultProps={
    className:"primary",
}
export default Button