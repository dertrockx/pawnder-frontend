import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout as logoutUser } from 'redux/actions/authActions'

import styles from "./Navbar.module.css";
import Button from "components/Button";

function Navbar() {
	// TODO: use redux and cookeis to check if user is authenticated
	// as of now just use some basic state
	const history = useHistory();
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
	const loginType = useSelector((s) => s.auth.loginType);

	function logout() { 
		dispatch(logoutUser());
		if(loginType === 'user') history.replace("/user/login");
		else history.replace("/institution/login");
	}

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
					to="/user/settings"
				>
					Settings
				</NavLink>
			</>
		);
	}
	// render these navbar items if currently signed-in identiy is an institution
	function renderInstitutionItems() {
		return (
			<>
				<NavLink
					className={`paragraph ${styles.navbarItem}`}
					activeClassName="bold-text"
					to="/manage-pets"
				>
					Manage Pets
				</NavLink>
				<NavLink
					className={`paragraph ${styles.navbarItem}`}
					activeClassName="bold-text"
					to="/manage-stories"
				>
					Manage Stories
				</NavLink>
				<NavLink
					className={`paragraph ${styles.navbarItem}`}
					activeClassName="bold-text"
					to="/institution/settings"
				>
					Settings
				</NavLink>
			</>
		);
	}

	return (
		<header className={styles.navbar}>
			<div className={styles.navbarContainer}>
				<div className={styles.navbarLeftItems}>
					<p className="bold-text">Logo goes here</p>
				</div>
				<div className={styles.navbarRightItems}>
					{isAuthenticated &&
						(loginType === 'institution' ? renderInstitutionItems() : renderUserItems())}
					{/* <NavLink
						className={`paragraph ${styles.navbarItem}`}
						activeClassName="bold-text"
						to="/sample"
					>
						Sample
					</NavLink>
					<NavLink
						className={`paragraph ${styles.navbarItem}`}
						activeClassName="bold-text"
						to="/chakra-sample"
					>
						Chakra Sample
					</NavLink> */}
					{isAuthenticated ? (
						<Button
							color="white"
							variant="outline"
							size="small"
							onClick={logout}
						>
							logout
						</Button>
					) : (
						<>
							<Button
								color="white"
								variant="outline"
								size="small"
								onClick={() => {
									history.push("/user/login")
								}}
							>
								login as user
							</Button>
							<Button
								color="white"
								variant="outline"
								size="small"
								onClick={() => {
									history.push("/user/signup")
								}}
							>
								signup as user
							</Button>
							<Button
								color="white"
								variant="outline"
								size="small"
								onClick={() => {
									history.push("/institution/login")
								}}
							>
								login as insti
							</Button>
							<Button
								color="white"
								variant="outline"
								size="small"
								onClick={() => {
									history.push("/institution/signup")
								}}
							>
								signup as insti
							</Button>
						</>
					)}
				</div>
			</div>
		</header>
	);
}

export default Navbar;
