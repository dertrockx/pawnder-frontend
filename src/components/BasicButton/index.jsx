import React, { useState } from "react";
import styles from "./BasicButton.module.css";

function BasicButton() {
	const [count, setCount] = useState(0);
	function handleClick() {
		setCount(count + 1);
	}
	return (
		<button onClick={handleClick} className={styles.basicButton}>
			I am a button that's been clicked {count} time{count > 1 ? "s" : ""}
		</button>
	);
}

export default BasicButton;
