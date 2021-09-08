import React from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

// TODO: use React.lazy() to lazy-load these pages
import SamplePage from "pages/SamplePage";
import Feed from "pages/Feed";
import NearbyInstitution from "pages/NearbyInstitution";
import ManagePetList from "pages/ManagePets/List";
import NavRoute from "components/NavRoute";

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
					<NavRoute path="/manage-pets" component={ManagePetList} />
					<Redirect path="/" to="/sample" exact />
				</Switch>
			</Router>
		</>
	);
}

export default App;
