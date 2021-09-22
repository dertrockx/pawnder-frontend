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
			return {
				...state,
				loginPending: true,
			};
		}
		default:
			return state;
	}
}
