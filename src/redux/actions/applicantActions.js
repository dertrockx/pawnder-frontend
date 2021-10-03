import { applicant } from "constants/ActionTypes";
import axios from "utils/axios";

export const fetchApplicants = (petId) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		dispatch({
			type: applicant.FETCH_APPLICANT_PENDING,
		});
		try {
			const res = await axios.get(`/api/0.1/application?petId=${petId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const { applications: applicants = [] } = res.data;
			const pending = [];
			const underReview = [];
			applicants
				.sort((app1, app2) => app1.updateAt - app2.updatedAt)
				.forEach(async (app) => {
					if (app.status === "pending") pending.push(app);
					else if (app.status === "under review") underReview.push(app);
				});

			dispatch({
				type: applicant.FETCH_APPLICANT_SUCCESS,
				payload: {
					underReview,
					pending,
				},
			});
		} catch (error) {
			console.log(error);
			dispatch({
				type: applicant.FETCH_APPLICANT_ERROR,
				payload: "Error fetching applicants",
			});
		}
	};
};

export const updateApplicant = (id, status) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		const { applicants } = getState().applicant;
		dispatch({
			type: applicant.UPDATE_APPLICANT_PENDING,
		});
		try {
			await axios.put(
				`/api/0.1/application/${id}`,
				{ status },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			let { pending: cachedPending, underReview: cachedUnderReview } =
				applicants;

			// move applicant from pending to under review
			if (status === "under review") {
				let applicant = cachedPending.splice(
					cachedPending.map((pending) => pending.id).indexOf(id),
					1
				)[0];

				Object.assign(applicant, { status });
				console.log(applicant);
				cachedUnderReview.push(applicant);
			}
			// remove applicant from `pending`
			else if (status === "deleted") {
				cachedPending.splice(
					cachedPending.map((pending) => pending.id).indexOf(id),
					1
				);
			}
			// remove applicant from `underReview`
			else {
				cachedUnderReview.splice(
					cachedUnderReview.map((underReview) => underReview.id).indexOf(id),
					1
				);
			}
			const payload = {
				pending: cachedPending,
				underReview: cachedUnderReview,
			};
			dispatch({
				type: applicant.UPDATE_APPLICANT_SUCCESS,
				payload,
			});
		} catch (error) {
			console.log(error);
			dispatch({
				type: applicant.UPDATE_APPLICANT_ERROR,
				payload: "Error in updating applicant",
			});
		}
	};
};
