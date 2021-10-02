import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
	Switch,
	Route,
	useRouteMatch,
	Redirect,
	Link,
} from "react-router-dom";
import { useSelector } from "react-redux";
import UserSettingsPreferences from "./UserSettingsPreferences";
import UserSettingsInformation from "./UserSettingsInformation";
import styles from "./UserSettings.module.css";

import { IoSettingsSharp } from 'react-icons/io5';

// reference: https://github.com/remix-run/react-router/issues/5496#issuecomment-376499389
const BetterSidebarLink = ({ children, ...linkProps }) => (
	<Route
		path={linkProps.to}
		exact={linkProps.exact}
		children={({ match }) => children({ active: !!match, linkProps })}
	/>
);


function BasicSideBar() {
	const history = useHistory();
	const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
	const loginType = useSelector((s) => s.auth.loginType);

	let { path, url } = useRouteMatch();
	
	useEffect(() => {
		// if(isAuthenticated && loginType === 'user') return
		// else history.replace("/user/login")
		console.log("========")
	}, [])

	return (
		<div className={styles.container}>
			<h1 className="heading-1" style={{display: "flex", gap: "10px", marginLeft: "30px"}} >
				<IoSettingsSharp style={{color: "var(--color-brand-darker)"}} />
				Settings
			</h1>
			<div className={styles.content}>
				<nav className={styles.sidebar}>
					<div className={styles.sidebarContent}>
						{/* sidebar item */}
						<BetterSidebarLink to={`${url}/information`}>
							{({ active, linkProps }) => (
								<div
									className={`${styles.sidebarItem} ${
										active ? styles.activeSidebarItem : ""
									}`}
								>
									<Link {...linkProps}>
										<h2 className="heading-2">Information</h2>
									</Link>
								</div>
							)}
						</BetterSidebarLink>

						<BetterSidebarLink to={`${url}/preferences`}>
							{({ active, linkProps }) => (
								<div
									className={`${styles.sidebarItem} ${
										active ? styles.activeSidebarItem : ""
									}`}
								>
									<Link {...linkProps}>
										<h2 className="heading-2">Preferences</h2>
									</Link>
								</div>
							)}
						</BetterSidebarLink>
					</div>
				</nav>
				<main className={styles.main}>
					<Switch>
						<Route path={`${path}/information`} exact component={UserSettingsInformation} />
						<Route path={`${path}/preferences`} exact component={UserSettingsPreferences}/>
						<Redirect path={path} to={`${path}/information`} exact />
					</Switch>
				</main>
			</div>
		</div>
	);

}

export default BasicSideBar;
