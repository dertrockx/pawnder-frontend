import { pet } from "constants/ActionTypes";

// pets ay key-value pair ng pet
// key: id, value: pet and photos

const initialState = {
	pets: null,
	error: null,
	petId: null,
	fetching: false,
	creating: false,
	updating: false,
};

export default function reduer(state = initialState, action = {}) {
	switch (action.type) {
		case pet.FETCH_PENDING: {
			return {
				...state,
				fetching: true,
			};
		}

		case pet.FETCH_SUCCESS: {
			return {
				...state,
				error: null,
				fetching: false,
				pets: action.payload,
			};
		}

		case pet.FETCH_ERROR: {
			return {
				...state,
				fetching: false,
				error: action.payload,
			};
		}
		case pet.SET_SINGLETON: {
			return {
				...state,
				petId: action.payload,
			};
		}
		case pet.CREATE_PENDING: {
			return {
				...state,
				creating: true,
			};
		}
		case pet.CREATE_SUCCESS: {
			return {
				...state,
				error: null,
				creating: false,
				pets: {
					...action.payload,
					...state.pets,
				},
			};
		}
		case pet.CREATE_ERROR: {
			return {
				...state,
				error: action.payload,
				creating: false,
			};
		}
		case pet.UPDATE_PENDING: {
			return {
				...state,
				updating: true,
			};
		}
		case pet.UPDATE_SUCCESS: {
			return {
				...state,
				error: null,
				updating: false,
				pets: {
					...state.pets,
					...action.payload,
				},
			};
		}
		case pet.UPDATE_ERROR: {
			return {
				...state,
				error: action.payload,
				updating: false,
			};
		}
		default:
			return state;
	}
}
