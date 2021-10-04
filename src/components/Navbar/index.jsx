import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import Button from "components/Button";
import { useSelector, useDispatch } from "react-redux";
import { model } from "constants/EntityType";
import { logout as onLogout } from "redux/actions/authActions";
import history from "utils/history";
import whiteLogo from "assets/logo-white.svg";
const INSTITUTION_ROOT = "/institution";

function Navbar() {
	const auth = useSelector((s) => s.auth);
	const dispatch = useDispatch();
	const { token, loginType } = auth;

	const logout = () => {
		dispatch(onLogout());
	};

	const login = () => history.push("/login");
	const signup = () => history.push("/signup");
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
					to={`${INSTITUTION_ROOT}/dashboard`}
				>
					Dashboard
				</NavLink>
				<NavLink
					className={`paragraph ${styles.navbarItem}`}
					activeClassName="bold-text"
					to={`${INSTITUTION_ROOT}/manage-pets`}
				>
					Manage Pets
				</NavLink>
				<NavLink
					className={`paragraph ${styles.navbarItem}`}
					activeClassName="bold-text"
					to={`${INSTITUTION_ROOT}/manage-stories`}
				>
					Manage Stories
				</NavLink>
				<NavLink
					className={`paragraph ${styles.navbarItem}`}
					activeClassName="bold-text"
					to={`${INSTITUTION_ROOT}/settings`}
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
					<img
						src={whiteLogo}
						alt="logo"
						width="80"
						style={{ cursor: "pointer" }}
						onClick={() =>
							history.push(
								loginType === model.INSTITUTION
									? "/institution/dashboard"
									: ( loginType === model.USER ? "/feed" : "/")
							)
						}
					/>
				</div>
				<div className={styles.navbarRightItems}>
					{token &&
						(loginType === model.INSTITUTION
							? renderInstitutionItems()
							: renderUserItems())}
					<NavLink
						className={`paragraph ${styles.navbarItem}`}
						activeClassName="bold-text"
						to="/stories"
					>
						Success Stories
					</NavLink>
					{token ? (
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
								onClick={signup}
							>
								Sign up
							</Button>
							<Button
								color="white"
								variant="outline"
								size="small"
								onClick={login}
							>
								Login
							</Button>
						</>
					)}
				</div>
			</div>
		</header>
	);
}

export default Navbar;
