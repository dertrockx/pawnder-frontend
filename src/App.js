import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

// TODO: use React.lazy() to lazy-load these pages
import SamplePage from "pages/SamplePage";
import Feed from "pages/Feed";
import Navbar from "components/Navbar";

// reset default styles for all html elements - https://en.wikipedia.org/wiki/Reset_style_sheet
import "./normalize.css";
import "./typography.css";

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Switch>
					<Route path="/sample" exact component={SamplePage} />
					<Route path="/feed" exact component={Feed} />
					<Redirect path="/" to="/sample" exact />
				</Switch>
			</Router>
		</>
	);
}

export default App;
