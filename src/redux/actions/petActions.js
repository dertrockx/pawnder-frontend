import { pet } from "constants/ActionTypes";
import axios from "utils/axios";

const {
	FETCH_PENDING,
FETCH_ERROR,
FETCH_SUCCESS,
SET_SINGLETON,
CREATE_PENDING,
CREATE_SUCCESS,
CREATE_ERROR,
UPDATE_PENDING,
UPDATE_SUCCESS,
UPDATE_ERROR,
} = pet;

export const getPets = () => {
	return async (dispatch, getState) => {
		const { model, token } = getState().auth;
		try {
			dispatch({
				type: FETCH_PENDING,
			});
			const res = await axios.get(
				`/api/0.1/pet?institutionId=${model.id || ""}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const { pets } = res.data;
			console.log(pets);
			let petMap = {};
			pets.forEach((pet) => {
				const { id, ...rest } = pet;
				Object.assign(petMap, { [id]: rest });
			});
			dispatch({
				type: FETCH_SUCCESS,
				payload: petMap,
			});
		} catch (error) {
			console.log(error);
			dispatch({
				type: FETCH_ERROR,
				payload: "Fetching error",
			});
		}
	};
};

export const getPet = (petId) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		const { pets } = getState().pet;
		try {
			// fetch pet if no existing copy of pet with id of `petId`
			if (!pets || !pets[petId]) {
				dispatch({
					type: FETCH_PENDING,
				});
				const res = await axios.get(`/api/0.1/pet/${petId}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				let petMap = {};
				const { id, ...rest } = res.data.pet;
				Object.assign(petMap, { [id]: rest });

				dispatch({
					type: FETCH_SUCCESS,
					payload: petMap,
				});
			}
			dispatch({
				type: SET_SINGLETON,
				payload: petId,
			});
		} catch (error) {
			console.log(error);
			dispatch({
				type: FETCH_ERROR,
				payload: "Fetching error",
			});
		}
	};
};

export const createPet = (formData) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		dispatch({
			type: CREATE_PENDING,
		});
		try {
			const res = await axios.request({
				method: "POST",
				url: "api/0.1/pet",
				data: formData,
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				},
			});
			const { pet, images } = res.data;
			const { id, ...rest } = pet;
			let data = {};
			Object.assign(data, { [id]: { photos: images, ...rest } });
			dispatch({
				type: CREATE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			console.log(error);
			dispatch({
				type: CREATE_ERROR,
				payload: "Error in creating pet",
			});
		}
	};
};

export const updatePet = (petId, data) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		const { pets } = getState().pet;
		dispatch({
			type: UPDATE_PENDING,
		});
		try {
			const res = await axios.put(`/api/0.1/pet/${petId}`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			let cachedPet = pets[petId];
			const { pet } = res.data;
			const { id, ...rest } = pet;
			let payload = {};
			Object.assign(payload, { [id]: { ...cachedPet, ...rest}});
			dispatch({
				type: UPDATE_SUCCESS,
				payload: cachedPet,
			});
		} catch (error) {
			console.log(error);
			dispatch({
				type: UPDATE_ERROR,
				paload: "Error during update",
			});
		}
	};
};
