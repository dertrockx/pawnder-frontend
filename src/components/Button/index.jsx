import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

function Button(props) {
	const {
		onClick,
		size,
		variant,
		color,
		children,
		disabled = false,
		block = false,
	} = props;
	function getColorVariant(variant, color) {
		switch (color) {
			case "brand-default":
				return variant === "outline"
					? styles.outlineBrandDefault
					: styles.filledBrandDefault;
			case "brand-lighter":
				return variant === "outline"
					? styles.outlineBrandLighter
					: styles.filledBrandLighter;
			case "brand-darker":
				return variant === "outline"
					? styles.outlineBrandDarker
					: styles.filledBrandDarker;
			case "red":
				return variant === "outline" ? styles.outlineRed : styles.filledRed;
			case "green":
				return variant === "outline" ? styles.outlineGreen : styles.filledGreen;
			case "blue":
				return variant === "outline" ? styles.outlineBlue : styles.filledBlue;
			case "black":
				return variant === "outline" ? styles.outlineBlack : styles.filledBlack;
			case "white":
				return variant === "outline" ? styles.outlineWhite : styles.filledWhite;
			default:
				return "";
		}
	}

	return (
		<button
			onClick={onClick}
			className={`
      button-text
      ${styles.baseStyles} 
      ${size === "small" ? styles.smallButton : styles.defaultButton}
      ${getColorVariant(variant, color)}
			${disabled ? styles.disabled : ""}
			${block ? styles.block : ""}
      `}
			disabled={disabled}
		>
			{children}
		</button>
	);
}

Button.propTypes = {
	onClick: PropTypes.func,
	size: PropTypes.oneOf(["default", "small"]),
	variant: PropTypes.oneOf(["default", "outline"]),
	color: PropTypes.oneOf([
		"brand-default",
		"brand-lighter",
		"brand-darker",
		"red",
		"green",
		"blue",
		"black",
		"white",
	]),
	children: PropTypes.node,
	disabled: PropTypes.bool,
	block: PropTypes.bool,
};

export default Button;
