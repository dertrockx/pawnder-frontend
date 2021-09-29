import axios from "utils/axios";
import { auth } from "constants/ActionTypes";
import { model } from "constants/EntityType";
import history from "utils/history";

export const login = (email, password) => {
	return async (dispatch) => {
		dispatch({
			type: auth.LOGIN_PENDING,
		});
		try {
			const res = await axios.post("/api/0.1/auth/login", {
				email,
				password,
				type: model.INSTITUTION,
			});
			const data = res.data;

			dispatch({
				type: auth.LOGIN_COMPLETED,
				payload: data,
			});
			history.push("/feed");
		} catch (err) {
			console.log(err);
			dispatch({
				type: auth.LOGIN_FAILED,
				payload: "Request error.",
			});
		}
	};
};

export const logout = () => {
	return (dispatch) => {
		dispatch({ type: auth.LOGOUT });
		history.push("/");
	};
};
