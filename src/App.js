<<<<<<< HEAD
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Router, Switch, Redirect } from "react-router-dom";

import { Route } from "react-router";
=======
import React from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "redux/store";
import { Route } from "react-router";

// TODO: use React.lazy() to lazy-load these pages
import SamplePage from "pages/SamplePage";
import ChakraSample from "pages/ChakraSample";
import Feed from "pages/Feed";
import NearbyInstitution from "pages/NearbyInstitution";
import {
	List as ManagePetList,
	Details as ManagePetDetails,
} from "pages/ManagePets";

import NavRoute from "components/NavRoute";
import InstitutionSignUp from "pages/InstitutionSignUpPage";
import InstitutionLogin from "pages/InstitutionLoginPage";
import ShowStoryDetails from "pages/ShowStoryDetails";
import ManageStoryDetails from "pages/ManageStoryDetails";
import UserOnboarding from "pages/UserOnboarding";
>>>>>>> Create onboarding page for user

// reset default styles for all html elements - https://en.wikipedia.org/wiki/Reset_style_sheet
import { UserLoginPage, UserSignupPage } from "pages";
import InstitutionOnboardingPage from "pages/InstitutionOnboarding";
import NavRoute from "components/NavRoute";
import UserOnboarding from "pages/UserOnboarding";
import InstitutionSettings from "pages/InstitutionSettings";

import history from "utils/history";
import LoadingPage from "pages/LoadingPage";
import { useDispatch, useSelector } from "react-redux";

import { silentRefresh } from "redux/actions/authActions";
import { model } from "constants/EntityType";
// reset default styles for all html elements - https://en.wikipedia.org/wiki/Reset_style_sheet
import "./normalize.css";
import "./typography.css";

// lazy-loading pages
const Feed = lazy(() => import("pages/Feed"));
const NearbyInstitution = lazy(() => import("pages/NearbyInstitution"));
const ManagePetList = lazy(() =>
	import("pages/ManagePets").then((module) => ({ default: module.List }))
);
const ManagePetDetails = lazy(() =>
	import("pages/ManagePets").then((module) => ({ default: module.Details }))
);
const Dashboard = lazy(() => import("pages/Dashboard"));
const UserSettings = lazy(() => import("pages/UserSettings"));
const InstitutionSignUp = lazy(() => import("pages/InstitutionSignUpPage"));
const InstitutionLogin = lazy(() => import("pages/InstitutionLoginPage"));
const ShowStoryDetails = lazy(() => import("pages/ShowStoryDetails"));
const ManageStoryDetails = lazy(() => import("pages/ManageStoryDetails"));
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
					<NavRoute
						path="/stories/:id"
						component={ShowStoryDetails}
						type={null}
					/>
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
					<NavRoute
						path={`${INSTITUTION_ROOT}/manage-stories/:id`}
						component={ManageStoryDetails}
						type={model.INSTITUTION}
					/>
					{/* cutoff */}
					<Route path={`${USER_ROOT}/login`} exact component={UserLoginPage} />
					<Route
						path={`${USER_ROOT}/signup`}
						exact
						component={UserSignupPage}
					/>
					<Route
						path={`${INSTITUTION_ROOT}/onboarding`}
						exact
						component={InstitutionOnboardingPage}
					/>
					<NavRoute
						path={`${USER_ROOT}/settings`}
						component={UserSettings}
						type={model.USER}
					/>
					<NavRoute path="/login" exact component={ChooseLogin} />
					<NavRoute path="/signup" exact component={ChooseSignup} />
					<Route
						path="/user/onboarding"
						exact
						component={UserOnboarding}
					/>{" "}
					{/* Maybe change to /onboarding kasi depende pa rin kung logged in as user or onboarding? */}
					<NavRoute
						path="/institution/settings"
						component={InstitutionSettings}
					/>{" "}
					{/* Maybe change to just /settings kapag logged in as insti?*/}
					<Redirect path="/" to="/signup" exact />
				</Switch>
			</Router>
		</Suspense>
	);
}

export default App;
