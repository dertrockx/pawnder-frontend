import keyMirror from "keymirror";

export const auth = keyMirror({
	LOGIN_PENDING: null,
	LOGIN_COMPLETED: null,
	LOGIN_FAILED: null,

	LOGOUT: null,
});
