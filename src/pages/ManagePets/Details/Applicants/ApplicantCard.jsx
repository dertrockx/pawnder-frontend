import React from "react";
import {
	Flex,
	HStack,
	Image,
	Tooltip,
	ButtonGroup,
	IconButton,
	Icon,
	VStack,
} from "@chakra-ui/react";
import { IoEyeOutline, IoClose, IoCheckmarkSharp } from "react-icons/io5";
import PropTypes from "prop-types";

function ApplicantCard(props) {
	const {
		disabled = false,
		onSuccess = () => {},
		onView = () => {},
		onCancel = () => {},
	} = props;
	return (
		<Flex
			shadow="lg"
			alignItems="center"
			flexDirection="row"
			justifyContent="space-between"
			paddingX={5}
			paddingY="10px"
			borderRadius="10px"
		>
			{/* left side */}
			<HStack alignItems="center" spacing={5}>
				<Image src="https://via.placeholder.com/80" borderRadius="50%" />
				<VStack spacing="5px" alignItems="flex-start">
					<h4 className="heading-4">User's name</h4>
					<HStack spacing="10px">
						<p className="caption">X years old</p>
						<p className="caption">Lives in Tagkawayan, Quezon</p>
					</HStack>
				</VStack>
			</HStack>
			<Tooltip
				isDisabled={!disabled}
				label="You can only entertain one applicant at a time"
				hasArrow
				placement="top"
			>
				<ButtonGroup spacing="10px" variant="outline">
					<IconButton
						icon={<Icon as={IoClose} width={6} height={6} />}
						colorScheme="red"
						borderRadius="50%"
						disabled={disabled}
						onClick={onCancel}
					/>
					<IconButton
						icon={<Icon as={IoEyeOutline} width={6} height={6} />}
						colorScheme="yellow"
						borderRadius="50%"
						disabled={disabled}
						onClick={onView}
					/>
					<IconButton
						icon={<Icon as={IoCheckmarkSharp} width={6} height={6} />}
						colorScheme="green"
						borderRadius="50%"
						disabled={disabled}
						onClick={onSuccess}
					/>
				</ButtonGroup>
			</Tooltip>
		</Flex>
	);
}

ApplicantCard.propTypes = {
	disabled: PropTypes.bool,
	onView: PropTypes.func,
	onCancel: PropTypes.func,
	onSuccess: PropTypes.func,
};

export default ApplicantCard;