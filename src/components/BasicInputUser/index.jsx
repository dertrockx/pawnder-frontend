import React from "react";
import styles from "./BasicInputUser.module.css";

function BasicInputUser(props) {
	const {
		type,
		name,
		onChange,
		placeholder,

		value,
		outline,

		required,

		children,
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

export default BasicInputUser;
