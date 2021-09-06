import React from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

// TODO: use React.lazy() to lazy-load these pages
import SamplePage from "pages/SamplePage";
import Feed from "pages/Feed";
import NearbyInstitution from "pages/NearbyInstitution";
import NavRoute from "components/NavRoute";
import InstitutionSignUp from "pages/InstitutionSignUpPage/index";
import InstitutionLogin from "pages/InstitutionLoginPage/index";
import { Route } from "react-router";

// reset default styles for all html elements - https://en.wikipedia.org/wiki/Reset_style_sheet
import "./normalize.css";
import "./typography.css";

function App() {
	return (
		<>
			<Router>
				<Switch>
					<NavRoute path="/sample" exact component={SamplePage} />
					<NavRoute path="/feed" exact component={Feed} />
					<NavRoute path="/nearby" exact component={NearbyInstitution} />
					<Route path="/institution/signup" exact component = {InstitutionSignUp} />
					<Route path="/institution/login" exact component = {InstitutionLogin} />
					<Redirect path="/" to="/sample" exact />
				</Switch>
			</Router>
		</>
	);
}

export default App;
