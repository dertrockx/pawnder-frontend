import { auth } from "constants/ActionTypes";
import cookie from "utils/cookie";

const initialState = {
	loginPending: false,
	loginError: null, // Wrong credentials, basically error message

	isAuthenticated: false,
	loginType: null, // 'USER' or 'INSTITUTION' lang,
	model: null,
	token: null,
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case auth.LOGIN_PENDING: {
			const { loginType } = action.payload;
			return {
				...state,
				loginPending: true,
				loginError: null,
				loginType,
			};
		}
		case auth.LOGIN_COMPLETED: {
			const {
				type,
				model,
				token: { auth, refresh },
			} = action.payload;

			cookie.set("refresh", refresh);

			return {
				...state,
				loginPending: false,
				loginError: null,
				isAuthenticated: true,
				loginType: type,
				model,
				token: auth,
			};
		}
		case auth.LOGIN_FAILED:
			return {
				...state,
				loginPending: false,
				loginError: action.payload,
			};
		case auth.LOGOUT:
			cookie.remove("refresh");
			return {
				loginPending: false,
				loginError: null,

				isAuthenticated: false,
				loginType: null,
				model: null,
				token: null,
			};
		default:
			return state;
	}
}
