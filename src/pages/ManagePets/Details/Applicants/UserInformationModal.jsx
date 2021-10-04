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
import {
	IoClose,
	IoCheckmarkSharp,
	IoTrashBin,
	IoArrowForward,
} from "react-icons/io5";
import PropTypes from "prop-types";
function UserInformationModal(props) {
	// const { isOpen, onOpen, onClose } = useDisclosure()
	const {
		isOpen,
		onClose,
		underReview = false,
		loading = false,
		secAction = () => {},
		primAction = () => {},
		selectedApplicant = {},
	} = props;

	const firstName = selectedApplicant.firstName || "";
	const middleName = selectedApplicant.middleName || "";
	const lastName = selectedApplicant.lastName || "";
	const email = selectedApplicant.email || "";
	const birthDate = selectedApplicant.birthDate || new Date();
	const photoUrl =
		selectedApplicant.photoUrl ||
		"https://avatars.dicebear.com/api/human/41234jl1.svg";
	const contactNumber = selectedApplicant.contactNumber || "+639xxxxxxxxx";

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>User information</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Grid gridTemplateColumns="1fr 1fr" columnGap={15}>
						<Image
							src={photoUrl}
							borderRadius="50%"
							boxSize="200px"
							objectFit="cover"
						/>
						<Grid
							gridTemplateColumns="137px 146px"
							columnGap={4}
							rowGap={2}
							alignContent="start"
						>
							<p className="bold-text">Name:</p>
							<p className="paragraph">{`${firstName} ${middleName} ${lastName}`}</p>
							<p className="bold-text">Age:</p>
							<p className="paragraph">{`${
								new Date().getFullYear() - new Date(birthDate).getFullYear()
							}`}</p>
							<p className="bold-text">Email:</p>
							<p className="paragraph">{email}</p>
							<p className="bold-text">Contact Number:</p>
							<p className="paragraph">{contactNumber}</p>
							{/* <p className="bold-text">Location:</p>
							<p className="paragraph">
								601 San Rafael St. Barangay Poblaction, Tagkawayan, Quezon
							</p> */}
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
									onClick={secAction}
									variant="outline"
									isLoading={loading}
								>
									Delete
								</Button>
								<Button
									className="button-text"
									colorScheme="green"
									leftIcon={<Icon as={IoArrowForward} />}
									onClick={primAction}
									isLoading={loading}
								>
									Move under review
								</Button>
							</>
						) : (
							<>
								<Button
									className="button-text"
									colorScheme="red"
									leftIcon={<Icon as={IoClose} />}
									onClick={secAction}
									variant="outline"
									isLoading={loading}
								>
									Reject
								</Button>
								<Button
									className="button-text"
									colorScheme="green"
									leftIcon={<Icon as={IoCheckmarkSharp} />}
									onClick={primAction}
									isLoading={loading}
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
