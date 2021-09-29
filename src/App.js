import React from "react";
import { Router, Switch, Redirect } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "redux/store";

// TODO: use React.lazy() to lazy-load these pages
import SamplePage from "pages/SamplePage";
import ChakraSample from "pages/ChakraSample";
import Feed from "pages/Feed";
import NearbyInstitution from "pages/NearbyInstitution";
import {
	List as ManagePetList,
	Details as ManagePetDetails,
} from "pages/ManagePets";
import Dashboard from "pages/Dashboard";

import NavRoute from "components/NavRoute";
import InstitutionSignUp from "pages/InstitutionSignUpPage";
import InstitutionLogin from "pages/InstitutionLoginPage";
import ShowStoryDetails from "pages/ShowStoryDetails";
import ManageStoryDetails from "pages/ManageStoryDetails";
import { Route } from "react-router";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import history from "utils/history";
// reset default styles for all html elements - https://en.wikipedia.org/wiki/Reset_style_sheet
import "./normalize.css";
import "./typography.css";

const store = configureStore();
const INSTITUTION_ROOT = "/institution";

function App() {
	return (
		<ReduxProvider store={store}>
			<ChakraProvider theme={theme}>
				<Router history={history}>
					<Switch>
						<NavRoute path="/chakra-sample" exact component={ChakraSample} />
						<NavRoute path="/sample" exact component={SamplePage} />
						<NavRoute path="/feed" exact component={Feed} />
						<NavRoute path="/nearby" exact component={NearbyInstitution} />
						<NavRoute path="/stories/:id" component={ShowStoryDetails} />

						{/* institution pages */}
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

						<Redirect path="/" to="/sample" exact />
					</Switch>
				</Router>
			</ChakraProvider>
		</ReduxProvider>
	);
}

export default App;
