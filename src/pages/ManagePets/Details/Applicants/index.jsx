import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { VStack, Spinner } from "@chakra-ui/react";
import { updateApplicant } from "redux/actions";
import HR from "components/HR";
import ApplicantCard from "./ApplicantCard";
import UserInformationModal from "./UserInformationModal";

function Applicants() {
	const { petId } = useSelector((state) => state.pet);
	const {
		applicants: { pending, underReview },
		fetching,
		updating,
	} = useSelector((s) => s.applicant);
	const dispatch = useDispatch();
	const [selected, setSelected] = useState(null);
	function handleView(applicant) {
		setSelected(applicant);
	}

	const onClose = () => setSelected(null);

	function handleDelete(id) {
		dispatch(updateApplicant(id, "deleted"));
		onClose();
	}
	function handleAccept(id) {
		dispatch(updateApplicant(id, "accepted"));
		onClose();
	}
	function handleReview(id) {
		dispatch(updateApplicant(id, "under review"));
		onClose();
	}
	function handleReject(id) {
		dispatch(updateApplicant(id, "rejected"));
		onClose();
	}

	if (!petId || fetching) return <Spinner />;
	return (
		<VStack spacing="60px" alignItems="stretch">
			{/* Under review section */}
			<div>
				<h3 className="heading-3">Under review</h3>
				<p className="caption" style={{ marginBottom: 20 }}>
					Below are applicants who you are currently reviewing
				</p>

				{underReview && underReview.length > 0 ? (
					underReview.map((applicant) => {
						const { id, firstName = "", lastName = "", birthDate } = applicant;
						let name = `${firstName} ${lastName}`;
						if (!firstName || !lastName) name = "No name";
						const age = birthDate
							? new Date().getFullYear() - new Date(birthDate).getFullYear()
							: null;
						return (
							<ApplicantCard
								key={id}
								onView={() => handleView(applicant)}
								loading={updating}
								onCancel={() => handleReject(id)}
								onSuccess={() => handleAccept(id)}
								name={name}
								age={age}
							/>
						);
					})
				) : (
					<p className="caption">
						Nothing under review so far :) How about you check the pending
						applicants instead?
					</p>
				)}
			</div>
			<HR />
			<div>
				<h3 className="heading-3">Pending</h3>
				<p className="caption" style={{ marginBottom: 20 }}>
					Below are applicants who are still on queue and waiting for your
					confirmation
				</p>
				{pending &&
					pending.length > 0 &&
					pending.map((applicant) => {
						const { id, firstName = "", lastName = "", birthDate } = applicant;
						let name = `${firstName} ${lastName}`;
						if (!firstName || !lastName) name = "No name";
						const age = birthDate
							? new Date().getFullYear() - new Date(birthDate).getFullYear()
							: null;
						return (
							<ApplicantCard
								key={id}
								onView={() => handleView(applicant)}
								loading={updating}
								onCancel={() => handleDelete(id)}
								onSuccess={() => handleReview(id)}
								name={name}
								age={age}
								disabled={!!underReview && underReview.length > 0}
							/>
						);
					})}
			</div>
			<UserInformationModal
				isOpen={!!selected}
				onClose={onClose}
				selectedApplicant={selected || {}}
				underReview={!!selected && selected.status !== "under review"}
				loading={updating || fetching}
				secAction={
					!!selected && selected.status === "under review"
						? () => handleReject(selected.id)
						: () => handleDelete(selected.id)
				}
				primAction={
					!!selected && selected.status === "under review"
						? () => handleAccept(selected.id)
						: () => handleReview(selected.id)
				}
			/>
		</VStack>
	);
}

export default Applicants;
