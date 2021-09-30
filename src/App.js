import React, { lazy, Suspense, useEffect, useState } from "react";
import { Router, Switch, Redirect } from "react-router-dom";
import useInterval from "hooks/useInterval";

import { Route } from "react-router";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import history from "utils/history";
import NavRoute from "components/NavRoute";
import LoadingPage from "pages/LoadingPage";
import { useDispatch, useSelector } from "react-redux";
import { silentRefresh } from "redux/actions/authActions";
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

const InstitutionSignUp = lazy(() => import("pages/InstitutionSignUpPage"));
const InstitutionLogin = lazy(() => import("pages/InstitutionLoginPage"));
const ShowStoryDetails = lazy(() => import("pages/ShowStoryDetails"));
const ManageStoryDetails = lazy(() => import("pages/ManageStoryDetails"));
const ChooseLogin = lazy(() => import("pages/ChooseLogin"));
const ChooseSignup = lazy(() => import("pages/ChooseSignup"));
const INSTITUTION_ROOT = "/institution";

function App() {
	const { isAuthenticated, token_expiry, loginPending } = useSelector(
		(s) => s.auth
	);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(silentRefresh());
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

	return (
		<Suspense fallback={<LoadingPage />}>
			<Router history={history}>
				<Switch>
					<NavRoute path="/feed" exact component={Feed} />
					<NavRoute path="/nearby" exact component={NearbyInstitution} />
					<NavRoute path="/stories/:id" component={ShowStoryDetails} />

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
					/>
					<NavRoute
						path={`${INSTITUTION_ROOT}/manage-pets/:petId`}
						component={ManagePetDetails}
					/>
					<NavRoute
						path={`${INSTITUTION_ROOT}/manage-pets`}
						component={ManagePetList}
					/>
					<NavRoute
						path={`${INSTITUTION_ROOT}/manage-stories/:id`}
						component={ManageStoryDetails}
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
