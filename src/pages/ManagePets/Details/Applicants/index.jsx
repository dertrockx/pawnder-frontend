import React from "react";
import { VStack, useDisclosure } from "@chakra-ui/react";

import HR from "components/HR";
import ApplicantCard from "./ApplicantCard";
import UserInformationModal from "./UserInformationModal";
const dummy = [1, 2, 3, 4, 5];

function Applicants() {
	const { onOpen, isOpen, onClose } = useDisclosure();
	return (
		<VStack spacing="60px" alignItems="stretch">
			{/* Under review section */}
			<div>
				<h3 className="heading-3">Under review</h3>
				<p className="caption" style={{ marginBottom: 20 }}>
					Below are applicants who you are currently reviewing
				</p>
				<ApplicantCard onView={onOpen} />
			</div>
			<HR />
			<div>
				<h3 className="heading-3">Pending</h3>
				<p className="caption" style={{ marginBottom: 20 }}>
					Below are applicants who are still on queue and waiting for your
					confirmation
				</p>
				{dummy.map((_, idx) => (
					<ApplicantCard key={idx} disabled />
				))}
			</div>
			<UserInformationModal isOpen={isOpen} onClose={onClose} underReview />
		</VStack>
	);
}

export default Applicants;
