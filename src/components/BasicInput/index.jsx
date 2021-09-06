import React from "react";
import styles from "./BasicInput.module.css";

function BasicInput( props ) {
    const { 
        type, 
        name, 
        onChange, 
        placeholder,
<<<<<<< HEAD
        value,
        outline,
        children,
        required,
        disabled
=======
        children,
        disabled,
        value,
>>>>>>> Create onboarding page for user
    } = props;

    return (
        <input
            type={type}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
<<<<<<< HEAD
            value={value}
            disabled={disabled}
            required={required}
            className={`
                input-text
                ${outline === "red" ? styles.inputError : styles.baseStyles}
            `}
=======
            disabled={disabled}
            className={`
                input-text
                ${styles.baseStyles}
            `}
            value={value}
>>>>>>> Create onboarding page for user
        >{children}</input>
    )
}

export default BasicInput;