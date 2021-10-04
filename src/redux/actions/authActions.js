import axios from "utils/axios";
import { auth } from "constants/ActionTypes";
import { model } from "constants/EntityType";
import history from "utils/history";

export const login = (email, password, type) => {
	return async (dispatch) => {
		dispatch({
			type: auth.LOGIN_PENDING,
		});
		try {
			const res = await axios.post("/api/0.1/auth/login", {
				email,
				password,
				type: type,
			});
			const data = res.data; 

			dispatch({
				type: auth.LOGIN_COMPLETED,
				payload: res.data,
			});
			history.push(
				type === model.INSTITUTION ? "/institution/dashboard" : "/feed"
			);
		} catch (err) {
			let message = "Invalid email / password combination";
			if (err.response) {
				const { msg } = err.response.data;
				if (msg) message = msg;
			}

			dispatch({
				type: auth.LOGIN_FAILED,
				payload: message,
			});
		}
	};
};

export const logout = () => {
	return async (dispatch) => {
		try {
			await axios.post("/api/0.1/auth/logout", { credentials: "include" });
			dispatch({ type: auth.LOGOUT });
		} catch (error) {
			console.log(error);
		}
		history.push("/login");
	};
};

export const silentRefresh = () => {
	// console.log("Calling silent refresh")
	return async (dispatch) => {
		try {
			const res = await axios.get("/api/0.1/auth/refresh_token");
			const { model, type, token, token_expiry } = res.data;
			dispatch({
				type: auth.LOGIN_COMPLETED,
				payload: { model, type, token: { auth: token }, token_expiry },
			});
			// history.push(type === model.USER ? "/feed" : "/institution/dashboard");
		} catch (err) {
			console.log(err);
			dispatch(logout());
		}
	};
};
