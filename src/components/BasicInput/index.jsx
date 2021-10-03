import React from "react";
import styles from "./BasicInput.module.css";

function BasicInput(props) {
	const {
		type,
		name,
		onChange,
		placeholder,
		value,
		outline,
		children,
		required,
		disabled,
	} = props;

	return (
		<input
			type={type}
			name={name}
			onChange={onChange}
			placeholder={placeholder}
			value={value}
			disabled={disabled}
			required={required}
			className={`
                input-text
                ${outline === "red" ? styles.inputError : styles.baseStyles}
            `}
		>
			{children}
		</input>
	);
}

export default BasicInput;
