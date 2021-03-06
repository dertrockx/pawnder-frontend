import React, { lazy, Suspense, useEffect, useState } from "react";
import { Router, Switch, Redirect } from "react-router-dom";
import { Route } from "react-router";

// reset default styles for all html elements - https://en.wikipedia.org/wiki/Reset_style_sheet

import NavRoute from "components/NavRoute";

import history from "utils/history";
import LoadingPage from "pages/LoadingPage";
import { useDispatch, useSelector } from "react-redux";

import { silentRefresh } from "redux/actions/authActions";
import { model } from "constants/EntityType";
// reset default styles for all html elements - https://en.wikipedia.org/wiki/Reset_style_sheet
import "./normalize.css";
import "./typography.css";

// lazy-loading pages
// const InstitutionOnboardingPage = lazy(() =>
// 	import("pages/InstitutionOnboarding")
// );
const Feed = lazy(() => import("pages/Feed"));
const NearbyInstitution = lazy(() => import("pages/NearbyInstitution"));
const ManagePetList = lazy(() =>
	import("pages/ManagePets").then((module) => ({ default: module.List }))
);
const ManagePetDetails = lazy(() =>
	import("pages/ManagePets").then((module) => ({ default: module.Details }))
);
const UserLoginPage = lazy(() => import("pages/UserLogin"));
const UserSignupPage = lazy(() => import("pages/UserSignup"));
const Dashboard = lazy(() => import("pages/Dashboard"));
const UserSettings = lazy(() => import("pages/UserSettings"));
// const UserOnboarding = lazy(() => import("pages/UserOnboarding"));
// const ShowStoryList = lazy(() => import("pages/ShowStoryList"));
// const ShowStoryDetails = lazy(() => import("pages/ShowStoryDetails"));
const InstitutionSignUp = lazy(() => import("pages/InstitutionSignUpPage"));
const InstitutionLogin = lazy(() => import("pages/InstitutionLoginPage"));
const InstitutionSettings = lazy(() => import("pages/InstitutionSettings"));
// const ManageStoryList = lazy(() => import("pages/ManageStoryList"));
// const ManageStoryDetails = lazy(() => import("pages/ManageStoryDetails"));
const ChooseLogin = lazy(() => import("pages/ChooseLogin"));
const ChooseSignup = lazy(() => import("pages/ChooseSignup"));
const INSTITUTION_ROOT = "/institution";
const USER_ROOT = "/user";

function App() {
	const { isAuthenticated, token_expiry, token } = useSelector((s) => s.auth);
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(silentRefresh());
		setLoaded(true);
		// eslint-disable-next-line
	}, []);

	// do silent-refresh
	useEffect(() => {
		if (!isAuthenticated || !token_expiry) return;
		const id = setInterval(() => {
			dispatch(silentRefresh());
		}, token_expiry - 5000);
		return () => clearInterval(id);
		// eslint-disable-next-line
	}, [isAuthenticated, token_expiry]);
	if (!loaded && !token) return <LoadingPage />;

	return (
		<Suspense fallback={<LoadingPage />}>
			<Router history={history}>
				<Switch>
					{/* NavRoute props are for authenticated sessions */}
					<NavRoute path="/feed" exact component={Feed} type={model.USER} />
					<NavRoute
						path="/nearby"
						exact
						component={NearbyInstitution}
						type={model.USER}
					/>
					{/* <NavRoute path="/stories" component={ShowStoryList} type={null} />
					<NavRoute
						path="/stories/:id"
						component={ShowStoryDetails}
						type={null}
					/> */}
					<Route
						path={`${INSTITUTION_ROOT}/login`}
						exact
						component={InstitutionLogin}
					/>
					<Route
						path={`${INSTITUTION_ROOT}/signup`}
						exact
						component={InstitutionSignUp}
					/>
					<NavRoute
						path={`${INSTITUTION_ROOT}/dashboard`}
						exact
						component={Dashboard}
						type={model.INSTITUTION}
					/>
					<NavRoute
						path={`${INSTITUTION_ROOT}/manage-pets/:petId`}
						component={ManagePetDetails}
						type={model.INSTITUTION}
					/>
					<NavRoute
						path={`${INSTITUTION_ROOT}/manage-pets`}
						component={ManagePetList}
						type={model.INSTITUTION}
					/>
					{/* <NavRoute
						path="/institution/manage-stories"
						component={ManageStoryList}
						type={model.INSTITUTION}
					/> */}
					{/* <NavRoute
						path={`${INSTITUTION_ROOT}/manage-stories/:id`}
						component={ManageStoryDetails}
						type={model.INSTITUTION}
					/> */}
					<NavRoute
						path={`${INSTITUTION_ROOT}/settings`}
						component={InstitutionSettings}
						type={model.INSTITUTION}
					/>

					{/* cutoff */}
					<Route path={`${USER_ROOT}/login`} exact component={UserLoginPage} />
					<Route
						path={`${USER_ROOT}/signup`}
						exact
						component={UserSignupPage}
					/>
					{/* <Route
						path={`${USER_ROOT}/onboarding`}
						exact
						component={InstitutionOnboardingPage}
					/>
					<Route
						path={`${INSTITUTION_ROOT}/onboarding`}
						exact
						component={UserOnboarding}
					/> */}
					<NavRoute
						path={`${USER_ROOT}/settings`}
						component={UserSettings}
						type={model.USER}
					/>
					<NavRoute path="/login" exact component={ChooseLogin} />
					<NavRoute path="/signup" exact component={ChooseSignup} />
					<Redirect path="/" to="/signup" exact />
				</Switch>
			</Router>
		</Suspense>
	);
}

export default App;
