import React from "react";
import PropTypes from "prop-types";
import cardStyles from "./BasicCard.module.css";

function BasicCard(props) {
	const { text = "Default card text" } = props;
	return <div className={cardStyles.card}>{text}</div>;
}

BasicCard.propTypes = {
	text: PropTypes.string,
};

export default BasicCard;
