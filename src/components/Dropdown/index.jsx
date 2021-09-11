import React from "react";
import PropTypes from "prop-types";

import styles from "./Dropdown.module.css";

function Dropdown({ options, renderOptions, ...rest }) {
	return (
		<div className={styles.dropdownWrapper}>
			<select className={`paragraph ${styles.dropdownContainer}`}>
				{renderOptions
					? renderOptions()
					: options.map(({ label, value }) => (
							<option value={value}>{label}</option>
					  ))}
			</select>
		</div>
	);
}

Dropdown.propTypes = {
	options: PropTypes.array,
	renderOptions: PropTypes.func,
};

export default Dropdown;
