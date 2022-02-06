import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

const UploadDoc = ({id,onSelect,title, progress}) =>{

    const {t}=useTranslation()
    const [inArea, setInArea] = useState(false);
    const [result,setResult] = useState(null)

    useEffect(() => {
        onSelect(result)
    }, [result]);

    const dropHandler=(ev)=> {
        ev.preventDefault();
        let files = ev.dataTransfer.files; // Array of all files
        fileReader(files[0])
    }
    const chooseFile = (e)=>{
        if(e.target?.files.length>0){
            fileReader(e.target.files[0])

        }
    }
    const fileReader = (file) => {
        let reader = new FileReader();
        reader.onload = function(e) {
            setResult(e.target.result)
        }
        reader.readAsDataURL(file);
    }

    return  (<div className="pass-template" >
                    <p>{title}</p>
                    <div
                        className="status-box upload" id={"id"}
                        //style={{backgroundColor:`${ result? 'rgba(1, 4, 7, 0.33)':   inArea?"#212940":"#151b29"}`}}
                        style={{background:`url(${result?result:'none'})`}}
                        onDrop={dropHandler}
                        onDragOver={e=>{
                            e.preventDefault();
                            setInArea(true)
                        }}
                        onDragLeave={e=>{
                            e.preventDefault();
                            setInArea(false)
                        }}
                        onClick={()=>document.getElementById(`image-${id}`).click()}
                    >
                        <span>{inArea? t("Upload Image"):t("New Image")} </span>

                        <input type="file"
                               id={`image-${id}`} name="avatar"
                               accept="image/png, image/jpeg" style={{display:"none"}} onChange={chooseFile} />
                    </div>
           {/* <div className="status-box wrong">
                <span>Something Wrong</span>
            </div>
            <div className="status-box success">
                <span>Uploaded Successfully</span>
            </div>*/}
                    <div style={{
                        borderTop:"2px solid green",
                        width:`${progress}%`
                    }}/>
                    {
                        result?<button onClick={()=>document.getElementById(`image-${id}`).click()}>New File</button>:null
                    }

                </div>
            )

}
UploadDoc.propTypes={
    id:PropTypes.string.isRequired,
    onSelect:PropTypes.func.isRequired,
    progress:PropTypes.number
}
UploadDoc.defaultProps={
    progress:0
}
export default UploadDoc;
