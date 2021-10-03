import keyMirror from "keymirror";

export const auth = keyMirror({
	LOGIN_PENDING: null,
	LOGIN_COMPLETED: null,
	LOGIN_FAILED: null,

	LOGOUT: null,
});

export const story = keyMirror({
	FETCH_STORIES_PENDING: null,
	FETCH_STORIES_COMPLETED: null,
	FETCH_STORIES_FAILED: null,
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

export const applicant = keyMirror({
	FETCH_APPLICANT_PENDING: null,
	FETCH_APPLICANT_ERROR: null,
	FETCH_APPLICANT_SUCCESS: null,

	UPDATE_APPLICANT_PENDING: null,
	UPDATE_APPLICANT_SUCCESS: null,
	UPDATE_APPLICANT_ERROR: null,
});

export const story = keyMirror({
	FETCH_STORIES_PENDING: null,
	FETCH_STORIES_COMPLETED: null,
	FETCH_STORIES_FAILED: null,
});
