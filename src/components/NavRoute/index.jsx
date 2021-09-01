import React from "react";
import PropTypes from "prop-types";
import Navbar from "components/Navbar";
import { Route } from "react-router";

// TODO: consult kuya Cholo or kuya Ralph if the current structure is memory-efficient
// because I think it's not since for every mount of a different page you re-render the navbar
function NavRoute({ component: Component, ...rest }) {
	return (
		<>
			<Navbar />
			<Route {...rest} render={(routeProps) => <Component {...routeProps} />} />
		</>
	);
}

NavRoute.propTypes = {
	component: PropTypes.element,
};

export default NavRoute;
