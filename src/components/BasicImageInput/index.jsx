import React from "react"
import styles from "./BasicImageInput.module.css";

function BasicImageInput(props) {
  const {
    label,
    image,
    onChange,
    imagePreviewError
  } = props;

  return (
    <div style={{ display: "flex", margin: 10, padding: 20, height: 150 }}>
      <div>
        <img src={image} alt="" id="img" className={styles.img}/>
      </div>
      <div style={{ "margin-left": 60 }}>
        <input
          type="file" 
          accept="image/jpeg, image/jpg, image/png" 
          id="input"
          name="image"
          onChange={onChange} 
          className={styles.input} 
          hidden>
        </input>
        <label 
          htmlFor="input" 
          className={`
            button-text
            ${styles.upload}
          `}
        >{label}</label>
        {imagePreviewError && (<p className="paragraph" style={{ color: "red" }}>We don't support that file type.</p>)}
      </div>
    </div>
  )
}

export default BasicImageInput;