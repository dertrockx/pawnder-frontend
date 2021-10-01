import React from "react";
import PropTypes from "prop-types";
import styles from "./List.module.css";

function Card(props) {
	const { children, onClick = () => {} } = props;
	return (
		<div className={styles.card} onClick={onClick}>
			{children}
		</div>
	);
}

Card.propTypes = {
	children: PropTypes.elementType,
	onClick: PropTypes.func,
};

export default Card;
