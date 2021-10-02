import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
	Switch,
	Route,
	useRouteMatch,
	Redirect,
	useParams,
	Link,
} from "react-router-dom";
import ApplicantsPage from "./Applicants";
import ProfilePage from "./Profile";
import styles from "./Details.module.css";
import { getPet } from "redux/actions/petActions";
// reference: https://github.com/remix-run/react-router/issues/5496#issuecomment-376499389
const BetterSidebarLink = ({ children, ...linkProps }) => (
	<Route
		path={linkProps.to}
		exact={linkProps.exact}
		children={({ match }) => children({ active: !!match, linkProps })}
	/>
);

function Details() {
	let { path, url } = useRouteMatch();
	const dispatch = useDispatch();

	const { petId } = useParams();
	// fetch pet information here
	useEffect(() => {
		dispatch(getPet(petId));

		// eslint-disable-next-line
	}, []);

	return (
		<div className={styles.container}>
			<h1 className="heading-1" style={{ marginLeft: 90 }}>
				Manage Pet
			</h1>
			<div className={styles.content}>
				<nav className={styles.sidebar}>
					<div className={styles.sidebarContent}>
						{/* sidebar item */}
						<BetterSidebarLink to={`${url}/profile`}>
							{({ active, linkProps }) => (
								<div
									className={`${styles.sidebarItem} ${
										active ? styles.activeSidebarItem : ""
									}`}
								>
									<Link {...linkProps}>
										<h2 className="heading-2">Profile</h2>
									</Link>
								</div>
							)}
						</BetterSidebarLink>

						<BetterSidebarLink to={`${url}/applicants`}>
							{({ active, linkProps }) => (
								<div
									className={`${styles.sidebarItem} ${
										active ? styles.activeSidebarItem : ""
									}`}
								>
									<Link {...linkProps}>
										<h2 className="heading-2">Applicants</h2>
									</Link>
								</div>
							)}
						</BetterSidebarLink>
					</div>
				</nav>
				<main className={styles.main}>
					<Switch>
						<Route path={`${path}/profile`} exact component={ProfilePage} />
						<Route
							path={`${path}/applicants`}
							exact
							component={ApplicantsPage}
						/>
						<Redirect path={path} to={`${path}/profile`} exact />
					</Switch>
				</main>
			</div>
		</div>
	);
}

export default Details;
