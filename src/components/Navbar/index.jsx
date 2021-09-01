import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import Button from "components/Button";
function Navbar() {
	// TODO: use redux and cookeis to check if user is authenticated
	// as of now just use some basic state
	const [authenticated, setAuthenticated] = useState(false);

	const login = () => setAuthenticated(true);

	const logout = () => setAuthenticated(false);
	// render these navbar items if currently signed-in identiy is a user
	function renderUserItems() {
		return (
			<>
				<NavLink
					className={`paragraph ${styles.navbarItem}`}
					activeClassName="bold-text"
					to="/feed"
				>
					Feed
				</NavLink>
				<NavLink
					className={`paragraph ${styles.navbarItem}`}
					activeClassName="bold-text"
					to="/nearby"
				>
					Nearby Institutions
				</NavLink>
				<NavLink
					className={`paragraph ${styles.navbarItem}`}
					activeClassName="bold-text"
					to="/stories"
				>
					Success Stories
				</NavLink>
				<NavLink
					className={`paragraph ${styles.navbarItem}`}
					activeClassName="bold-text"
					to="/settings"
				>
					Settings
				</NavLink>
			</>
		);
	}
	// render these navbar items if currently signed-in identiy is an institution
	// function renderInstitutionItems() {
	// 	return (
	// 		<>
	// 			<NavLink
	// 				className={`paragraph ${styles.navbarItem}`}
	// 				activeClassName="bold-text"
	// 				to="/manage-pets"
	// 			>
	// 				Manage Pets
	// 			</NavLink>
	// 			<NavLink
	// 				className={`paragraph ${styles.navbarItem}`}
	// 				activeClassName="bold-text"
	// 				to="/manage-stories"
	// 			>
	// 				Manage Stories
	// 			</NavLink>
	// 			<NavLink
	// 				className={`paragraph ${styles.navbarItem}`}
	// 				activeClassName="bold-text"
	// 				to="/settings"
	// 			>
	// 				Settings
	// 			</NavLink>
	// 		</>
	// 	);
	// }

	return (
		<header className={styles.navbar}>
			<div className={styles.navbarLeftItems}>
				<p className="bold-text">Logo goes here</p>
			</div>
			<div className={styles.navbarRightItems}>
				{authenticated && renderUserItems()}
				<NavLink
					className={`paragraph ${styles.navbarItem}`}
					activeClassName="bold-text"
					to="/sample"
				>
					Sample
				</NavLink>
				{authenticated ? (
					<Button color="white" variant="outline" size="small" onClick={logout}>
						logout
					</Button>
				) : (
					<>
						<Button
							color="white"
							variant="outline"
							size="small"
							onClick={login}
						>
							login
						</Button>
						<Button
							color="white"
							variant="outline"
							size="small"
							onClick={login}
						>
							signup
						</Button>
					</>
				)}
			</div>
		</header>
	);
}

export default Navbar;
