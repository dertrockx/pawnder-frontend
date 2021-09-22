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
