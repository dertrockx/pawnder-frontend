import React from "react";
import styles from "./BasicInputUser.module.css";

<<<<<<< HEAD
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
=======
const BasicInputUser = (props) => {
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

export default BasicInputUser;
>>>>>>> 6f24e80395dd1ab0aecd31fa25bd999cabe09cd9
