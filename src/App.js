import React from "react";
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";

// TODO: use React.lazy() to lazy-load these pages
import SamplePage from "pages/SamplePage";
import { UserLoginPage, UserSignupPage, InstitutionOnboardingPage } from "pages";
import Navbar from "components/Navbar";

// reset default styles for all html elements - https://en.wikipedia.org/wiki/Reset_style_sheet
import "./normalize.css";
import "./typography.css";

function App() {
	return (
		<>
			<Router>
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
