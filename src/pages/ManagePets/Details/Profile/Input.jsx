import React from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.css";

function Input({ type, value, hasErrors = false, ...rest }) {
	return (
		<input
			type={type}
			value={value}
			{...rest}
			className={`paragraph ${styles.baseStyles} ${
				hasErrors ? styles.errors : ""
			}`}
		/>
	);
}

Input.propTypes = {
	type: PropTypes.string,
	value: PropTypes.any,
	variant: PropTypes.oneOf(["default", "focused", "error"]),
	hasErrors: PropTypes.bool,
	placeholder: PropTypes.string,
};

export default Input;
