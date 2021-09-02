import React from "react";
// import classnames from "classnames";

function BasicInput({ type, name, onChange, placeholder, disabled }) {
    // const classes = classnames(styles.input, className);

    return (
        <input
            type={type}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            // className={classes}
        />
    )
}

export default BasicInput;