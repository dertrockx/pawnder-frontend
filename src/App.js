import React, { lazy, Suspense } from "react";
import { Router, Switch, Redirect } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "redux/store";
import { Route } from "react-router";

// reset default styles for all html elements - https://en.wikipedia.org/wiki/Reset_style_sheet
import { UserLoginPage, UserSignupPage } from "pages";
import InstitutionOnboardingPage from "pages/InstitutionOnboarding"
import NavRoute from "components/NavRoute";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import history from "utils/history";
import LoadingPage from "pages/LoadingPage";
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
const store = configureStore();
const INSTITUTION_ROOT = "/institution";
const USER_ROOT = "/user";

function App() {
	return (
		<ReduxProvider store={store}>
			<ChakraProvider theme={theme}>
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
							<Route
								path={`${USER_ROOT}/login`}
								exact
								component={UserLoginPage}
							/>
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
							/>
							<NavRoute path="/login" exact component={ChooseLogin} />
							<NavRoute path="/signup" exact component={ChooseSignup} />
							<Redirect path="/" to="/signup" exact />
						</Switch>
					</Router>
				</Suspense>
			</ChakraProvider>
		</ReduxProvider>
		
	);
}

export default App;