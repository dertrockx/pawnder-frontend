import { auth } from "constants/ActionTypes";

const initialState = {
	loginPending: false,
	loginError: null, // Wrong credentials, basically error message

	isAuthenticated: false,
	loginType: null, // 'user' or 'institution' lang
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

			return {
				...state,
				loginPending: false,
				isAuthenticated: true,
			}
		}

		case auth.LOGIN_FAILED: {
			const { errorMessage } = action.payload;
			return {
				...state,
				loginPending: false,
				loginError: errorMessage,
			}
		}

		case auth.LOGOUT: {
			return {
				...state,
				isAuthenticated: false,
				loginType: null,
			}
		}
		default:
			return state;
	}
}
