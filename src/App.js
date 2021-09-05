import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

// reset default styles for all html elements - https://en.wikipedia.org/wiki/Reset_style_sheet
import SamplePage from "pages/SamplePage";
import { UserLoginPage, UserSignupPage, InstitutionOnboardingPage } from "pages";
import Navbar from "components/Navbar";

import "./normalize.css";
import "./typography.css";

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Switch>
					<Route path="/sample" exact component={SamplePage} />
					<Route path="/user-login" component={UserLoginPage} />
					<Route path="/user-signup" component={UserSignupPage} />
					<Route path="/institution-onboarding" component={InstitutionOnboardingPage} />
					<Redirect path="/" to="/sample" exact />
				</Switch>
			</Router>
		</>
	);
}

export default App;
