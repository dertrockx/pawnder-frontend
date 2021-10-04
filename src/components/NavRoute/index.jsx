import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Navbar from "components/Navbar";
import { Route } from "react-router";
import { model } from "constants/EntityType";
import { useSelector } from "react-redux";
import history from "utils/history";

function NavRoute({ component: Component, type, ...rest }) {
	const auth = useSelector((s) => s.auth);
	/*
	if auth.loginType is user but type is not for user, return feed
	else if auth.loginType is institution but type is not for institution, return dashboard
	*/
	useEffect(() => {
		if (auth.isAuthenticated && type !== null) {
			history.push(
				auth.loginType === model.USER ? "/feed" : "/institution/dashboard"
			);
		}
		if (type) {
			if (auth.loginType === model.USER && type !== model.USER) {
				history.push("/feed");
			} else if (
				auth.loginType === model.INSTITUTION &&
				type !== model.INSTITUTION
			) {
				history.push("/institution/dashboard");
			}
		}
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<Navbar />
			<Route {...rest} render={(routeProps) => <Component {...routeProps} />} />
		</>
	);
}

NavRoute.propTypes = {
	component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	type: PropTypes.oneOf([...Object.values(model), null]).isRequired,
};

export default NavRoute;
