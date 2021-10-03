import { applicant } from "constants/ActionTypes";

const initialState = {
	fetching: false,
	updating: false,
	applicants: {
		pending: null,
		underReview: null,
	},
	error: null,
};

export default function reducer(
	state = initialState,
	action = { type: null, payload: null }
) {
	switch (action.type) {
		case applicant.FETCH_APPLICANT_PENDING:
			return {
				...state,
				fetching: true,
			};
		case applicant.FETCH_APPLICANT_SUCCESS:
			console.log(action.payload);
			return {
				...state,
				applicants: {
					...action.payload,
				},
				fetching: false,
			};
		case applicant.FETCH_APPLICANT_ERROR:
			return {
				...state,
				fetching: false,
				error: action.payload,
			};
		case applicant.UPDATE_APPLICANT_PENDING: {
			return {
				...state,
				updating: true,
			};
		}
		case applicant.UPDATE_APPLICANT_SUCCESS: {
			return {
				...state,
				applicants: action.payload,
				updating: false,
			};
		}
		case applicant.UPDATE_APPLICANT_ERROR: {
			return {
				...state,
				error: null,
				updating: false,
			};
		}
		default:
			return state;
	}
}
