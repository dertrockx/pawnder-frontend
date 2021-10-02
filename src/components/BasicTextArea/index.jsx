import React from "react";
import styles from "./BasicTextArea.module.css";

function BasicTextArea( props ) {
  const {
    rows,
    cols,
    name,
    value,
    placeholder,
    children,
    onChange
  } = props;

  return (
    <textarea
      rows={rows}
      cols={cols}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={`
        input-text
        ${styles.baseStyles}
      `}
    >
      {children}
    </textarea>
  )
}

export default BasicTextArea;