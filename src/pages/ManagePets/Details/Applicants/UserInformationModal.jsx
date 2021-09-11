import React from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Image,
	Grid,
	ButtonGroup,
	Button,
	Icon,
} from "@chakra-ui/react";
import { IoClose, IoCheckmarkSharp, IoTrashBin } from "react-icons/io5";
import PropTypes from "prop-types";
function UserInformationModal(props) {
	// const { isOpen, onOpen, onClose } = useDisclosure()
	const { isOpen, onClose, underReview = false } = props;
	return (
		<Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>User information</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Grid gridTemplateColumns="1fr 1fr" columnGap={15}>
						<Image src="https://via.placeholder.com/200" borderRadius="50%" />
						<Grid gridTemplateColumns="137px 146px" columnGap={4}>
							<p className="bold-text">Name:</p>
							<p className="paragraph">Ian I. Salazar</p>
							<p className="bold-text">Age:</p>
							<p className="paragraph">20 years old</p>
							<p className="bold-text">Email:</p>
							<p className="paragraph">Ian I. Salazar</p>
							<p className="bold-text">Contact Number:</p>
							<p className="paragraph">09618016463</p>
							<p className="bold-text">Location:</p>
							<p className="paragraph">
								601 San Rafael St. Barangay Poblaction, Tagkawayan, Quezon
							</p>
						</Grid>
					</Grid>
				</ModalBody>

				<ModalFooter>
					<ButtonGroup spacing="10px">
						{underReview ? (
							<>
								<Button
									className="button-text"
									colorScheme="red"
									leftIcon={<Icon as={IoTrashBin} />}
									onClick={onClose}
								>
									Delete
								</Button>
								<Button
									className="button-text"
									colorScheme="green"
									leftIcon={<Icon as={IoCheckmarkSharp} />}
									onClick={onClose}
								>
									Accept
								</Button>
							</>
						) : (
							<>
								<Button
									className="button-text"
									colorScheme="red"
									leftIcon={<Icon as={IoClose} />}
									onClick={onClose}
								>
									Cancel
								</Button>
								<Button
									className="button-text"
									colorScheme="green"
									leftIcon={<Icon as={IoCheckmarkSharp} />}
									onClick={onClose}
								>
									Accept
								</Button>
							</>
						)}
					</ButtonGroup>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

UserInformationModal.propTypes = {
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
	underReview: PropTypes.bool,
};

export default UserInformationModal;
