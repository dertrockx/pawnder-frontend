import React from "react";
import Button from "components/Button"
import styles from "./BasicImageInput2.module.css";

function BasicImageInput2(props) {
  const {
    src,
    label,
    onChange,
    onClick,
    imagePreviewError
  } = props;

  return (
    <div style={{ display: "flex", margin: 10, padding: 20, height: 150 }}>
      <div>
        <img src={src} alt="" id="img" className={styles.img}/>
      </div>
      <div style={{ "margin-left": 60 }}>
        <input
          type="file" 
          accept="image/jpeg, image/jpg, image/png" 
          id="input"
          name="photoUrl"
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
        <Button name="image" size="small" color="brand-default" variant="outline" onClick={onClick}>Remove picture</Button>
        {imagePreviewError && (<p className="paragraph" style={{ color: "red" }}>We don't support that file type.</p>)}
      </div>
    </div>
  )
}

export default BasicImageInput2;