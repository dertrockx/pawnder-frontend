import React from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

// TODO: use React.lazy() to lazy-load these pages
import SamplePage from "pages/SamplePage";
import ChakraSample from "pages/ChakraSample";
import Feed from "pages/Feed";
import NearbyInstitution from "pages/NearbyInstitution";
import NavRoute from "components/NavRoute";
import InstitutionSignUp from "pages/InstitutionSignUpPage";
import InstitutionLogin from "pages/InstitutionLoginPage";
import ShowStoryDetails from "pages/ShowStoryDetails";
import ManageStoryDetails from "pages/ManageStoryDetails";
import { Route } from "react-router";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
// reset default styles for all html elements - https://en.wikipedia.org/wiki/Reset_style_sheet
import "./normalize.css";
import "./typography.css";

function App() {
	return (
		<ChakraProvider theme={theme}>
			<Router>
				<Switch>
					<NavRoute path="/chakra-sample" exact component={ChakraSample} />
					<NavRoute path="/sample" exact component={SamplePage} />
					<NavRoute path="/feed" exact component={Feed} />
					<NavRoute path="/nearby" exact component={NearbyInstitution} />
					<Route path="/institution/signup" exact component = {InstitutionSignUp} />
					<Route path="/institution/login" exact component = {InstitutionLogin} />
					<NavRoute path = "/stories/1" exact component = {ShowStoryDetails} />
					<NavRoute path = "/institution/manage-stories/1" exact component = {ManageStoryDetails} />
					<Redirect path="/" to="/sample" exact />
				</Switch>
			</Router>
		</ChakraProvider>
	);
}

export default App;
