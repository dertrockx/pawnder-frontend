import React from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { Route } from "react-router";

// TODO: use React.lazy() to lazy-load these pages
import SamplePage from "pages/SamplePage";
import ChakraSample from "pages/ChakraSample";
import Feed from "pages/Feed";
import NearbyInstitution from "pages/NearbyInstitution";
import NavRoute from "components/NavRoute";
import UserOnboarding from "pages/UserOnboarding";

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
					<Route path="/user/onboarding" exact component={UserOnboarding} /> {/* Maybe change to /onboarding */}
					{/* <Route path="institution/settings" exact component={} /> */}
					{/* <Route path="institution/settings" exact component={} /> */}
					<Redirect path="/" to="/sample" exact />
				</Switch>
			</Router>
		</ChakraProvider>
	);
}

export default App;
