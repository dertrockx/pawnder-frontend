import { auth } from "constants/ActionTypes";

const initialState = {
	loginPending: true,
	loginError: null, // Wrong credentials, basically error message

	isAuthenticated: false,
	loginType: null, // 'USER' or 'INSTITUTION' lang,
	model: null,
	token: null,
	token_expiry: null,
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
				token_expiry,
				token: { auth },
			} = action.payload;

			return {
				...state,
				loginPending: false,
				loginError: null,
				isAuthenticated: true,
				loginType: type,
				model,
				token_expiry,
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
