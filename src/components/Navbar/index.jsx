import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import Button from "components/Button";
import { useSelector, useDispatch } from "react-redux";
import { model } from "constants/EntityType";
import { logout as onLogout } from "redux/actions/authActions";

const INSTITUTION_ROOT = "/institution";

function Navbar() {
	const auth = useSelector((s) => s.auth);
	const dispatch = useDispatch();
	const { token, type } = auth;

	const logout = () => {
		dispatch(onLogout());
	};
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
					<p className="bold-text">Logo goes here</p>
				</div>
				<div className={styles.navbarRightItems}>
					{token &&
						(type === model.INSTITUTION
							? renderInstitutionItems()
							: renderUserItems())}
					<NavLink
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
							<Button color="white" variant="outline" size="small">
								Sign up
							</Button>
							<Button color="white" variant="outline" size="small">
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
