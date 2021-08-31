import React from "react";
import styles from "./Navbar.module.css";

function Navbar() {
	return (
		<header className={styles.navbar}>
			<div className={styles.navbarLeftItems}>Logo goes here</div>
			<div className={styles.navbarRightItems}>
				<div className={styles.navbarItem}>Item 1</div>
				<div className={styles.navbarItem}>Item 2</div>
				<div className={styles.navbarItem}>Item 3</div>
				<div className={styles.navbarItem}>Item 4</div>
			</div>
		</header>
	);
}

export default Navbar;
