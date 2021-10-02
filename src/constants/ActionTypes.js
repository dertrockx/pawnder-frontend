import keyMirror from "keymirror";

export const auth = keyMirror({
	LOGIN_PENDING: null,
	LOGIN_COMPLETED: null,
	LOGIN_FAILED: null,

	LOGOUT: null,
});

export const pet = keyMirror({
	FETCH_PENDING: null,
	FETCH_ERROR: null,
	FETCH_SUCCESS: null,
	// set id to reference manage pet eme
	SET_SINGLETON: null,

	CREATE_PENDING: null,
	CREATE_SUCCESS: null,
	CREATE_ERROR: null,

	UPDATE_PENDING: null,
	UPDATE_SUCCESS: null,
	UPDATE_ERROR: null,
});

export const photo = keyMirror({
	UPDATE_PENDING: null,
	UPDATE_SUCCESS: null,
	UPDATE_ERROR: null,
});
