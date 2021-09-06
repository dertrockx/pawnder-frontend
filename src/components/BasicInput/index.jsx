import React from "react";
import styles from "./BasicInput.module.css";

function BasicInput( props ) {
    const { 
        type, 
        name, 
        onChange, 
        placeholder,
        children,
        disabled,
        value,
    } = props;

    return (
        <input
            type={type}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`
                input-text
                ${styles.baseStyles}
            `}
            value={value}
        >{children}</input>
    )
}

export default BasicInput;