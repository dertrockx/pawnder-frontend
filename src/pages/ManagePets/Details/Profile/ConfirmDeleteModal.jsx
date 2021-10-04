import React from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	ButtonGroup,
	Button,
} from "@chakra-ui/react";

function ConfirmDeleteModal(props) {
	const {
		isOpen = false,
		loading = false,
		onClose = () => {},
		onSuccess = () => {},
	} = props;

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Delete pet</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<p className="paragraph">Are you sure you want to delete this pet?</p>
				</ModalBody>
				<ModalFooter>
					<ButtonGroup spacing="10px">
						<Button
							className="button-text"
							variant="outline"
							isLoading={loading}
							onClick={onClose}
						>
							Cancel
						</Button>
						<Button
							className="button-text"
							colorScheme="red"
							isLoading={loading}
							onClick={onSuccess}
						>
							Confirm
						</Button>
					</ButtonGroup>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default ConfirmDeleteModal;
