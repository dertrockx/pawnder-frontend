import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { getPet, fetchApplicants } from "redux/actions/";

const BetterSidebarLink = ({ children, ...linkProps }) => (
	<Route
		path={linkProps.to}
		exact={linkProps.exact}
		children={({ match }) => children({ active: !!match, linkProps })}
	/>
);

function Details() {
	const { token } = useSelector((s) => s.auth);
	const { petId: cachedPetId } = useSelector((s) => s.pet);

	let { path, url } = useRouteMatch();
	const dispatch = useDispatch();

	const { petId } = useParams();
	// fetch pet information here
	useEffect(() => {
		if (token) {
			dispatch(getPet(petId));
			dispatch(fetchApplicants(petId));
		}

		// eslint-disable-next-line
	}, [token, cachedPetId]);

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
