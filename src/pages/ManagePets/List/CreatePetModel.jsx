import React from "react";
import PropTypes from "prop-types";

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	ButtonGroup,
	Input,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Select,
	Textarea,
	Grid,
	NumberInput,
	NumberInputField,
	VStack,
} from "@chakra-ui/react";

function CreatePetModal({
	isOpen = false,
	loading = false,
	uploadHandler = () => {},
	onClose = () => {},
	handleChange = () => {},
	onSave = () => {},
	info,
	errors,
}) {
	const {
		name,
		breed,
		animalType,
		sex,
		height,
		weight,
		age,
		medicalHistory,
		otherInfo,
		action,
	} = info;
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size="xl"
			isCentered
			scrollBehavior="inside"
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Create new pet</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack
						spacing={5}
						flexDir="column"
						alignItems="flex-start"
						justifyContent="stretch"
					>
						<Grid gridTemplateColumns="1fr 1fr" columnGap={5} rowGap={5}>
							<FormControl
								isRequired
								id="name"
								isInvalid={
									errors && errors.length > 0 && errors.includes("name")
								}
							>
								<FormLabel>Pet Name</FormLabel>
								<Input
									type="text"
									focusBorderColor="brand.100"
									value={name}
									name="name"
									onChange={handleChange}
									disabled={loading}
								/>
								<FormErrorMessage>This field is required</FormErrorMessage>
							</FormControl>
							<FormControl
								isRequired
								id="breed"
								isInvalid={
									errors && errors.length > 0 && errors.includes("breed")
								}
							>
								<FormLabel>Breed</FormLabel>
								<Input
									type="text"
									focusBorderColor="brand.100"
									value={breed}
									name="breed"
									onChange={handleChange}
									disabled={loading}
								/>
								<FormErrorMessage>This field is required</FormErrorMessage>
							</FormControl>

							<FormControl
								isRequired
								id="animalType"
								isInvalid={
									errors && errors.length > 0 && errors.includes("animalType")
								}
							>
								<FormLabel>Animal Type</FormLabel>
								<Select
									placeholder="Select option"
									focusBorderColor="brand.100"
									name="animalType"
									value={animalType}
									onChange={handleChange}
									disabled={loading}
								>
									<option value="dogs">Dog</option>
									<option value="cats">Cat</option>
									<option value="fish and aquariums">Fish and Aquariums</option>
									<option value="reptiles and amphibians">
										Reptile / Amphibian
									</option>
									<option value="exotic pets">Exotic pet</option>

									<option value="rabbits">Rabbit</option>
									<option value="rodents">Rodent</option>
								</Select>
								<FormErrorMessage>This field is required</FormErrorMessage>
							</FormControl>
							<FormControl
								isRequired
								id="sex"
								isInvalid={
									errors && errors.length > 0 && errors.includes("sex")
								}
							>
								<FormLabel>Sex</FormLabel>
								<Select
									placeholder="Select option"
									focusBorderColor="brand.100"
									name="sex"
									value={sex}
									onChange={handleChange}
									disabled={loading}
								>
									<option value="m">Male</option>
									<option value="f">Female</option>
								</Select>
								<FormErrorMessage>This field is required</FormErrorMessage>
							</FormControl>

							<FormControl
								isRequired
								id="weight"
								isInvalid={
									errors && errors.length > 0 && errors.includes("weight")
								}
							>
								<FormLabel>Weight (kg)</FormLabel>
								<NumberInput focusBorderColor="brand.100">
									<NumberInputField
										value={weight}
										name="weight"
										onChange={handleChange}
										disabled={loading}
									/>
								</NumberInput>
								<FormErrorMessage>This field is required</FormErrorMessage>
							</FormControl>
							<FormControl
								isRequired
								id="height"
								isInvalid={
									errors && errors.length > 0 && errors.includes("height")
								}
							>
								<FormLabel>Height (cm)</FormLabel>
								<NumberInput focusBorderColor="brand.100">
									<NumberInputField
										value={height}
										name="height"
										onChange={handleChange}
										disabled={loading}
									/>
								</NumberInput>
								<FormErrorMessage>This field is required</FormErrorMessage>
							</FormControl>
							<FormControl
								isRequired
								id="age"
								isInvalid={
									errors && errors.length > 0 && errors.includes("age")
								}
							>
								<FormLabel>Age (in months)</FormLabel>
								<NumberInput focusBorderColor="brand.100">
									<NumberInputField
										value={age}
										name="age"
										onChange={handleChange}
										disabled={loading}
									/>
								</NumberInput>
								<FormErrorMessage>This field is required</FormErrorMessage>
							</FormControl>
						</Grid>
						<FormControl
							isRequired
							id="medicalHistory"
							isInvalid={
								errors && errors.length > 0 && errors.includes("medicalHistory")
							}
						>
							<FormLabel>Medical History</FormLabel>
							<Textarea
								type="text"
								placeholder="I am a placeholder"
								focusBorderColor="brand.100"
								rows={3}
								name="medicalHistory"
								value={medicalHistory}
								onChange={handleChange}
								disabled={loading}
							/>
							<FormErrorMessage>This field is required</FormErrorMessage>
						</FormControl>
						<FormControl
							isRequired
							id="other"
							isInvalid={
								errors && errors.length > 0 && errors.includes("otherInfo")
							}
						>
							<FormLabel>Other Information</FormLabel>
							<Textarea
								type="text"
								placeholder="I am a placeholder"
								focusBorderColor="brand.100"
								rows={3}
								name="otherInfo"
								value={otherInfo}
								onChange={handleChange}
								disabled={loading}
							/>
							<FormErrorMessage>This field is required</FormErrorMessage>
						</FormControl>
						<FormControl
							isRequired
							id="action"
							isInvalid={
								errors && errors.length > 0 && errors.includes("otherInfo")
							}
						>
							<FormLabel>Open for</FormLabel>
							<Select
								placeholder="Select option"
								focusBorderColor="brand.100"
								name="action"
								onChange={handleChange}
								value={action}
								disabled={loading}
							>
								<option value="adopt">Adoption</option>
								<option value="foster">Foster Care</option>
							</Select>
							<FormErrorMessage>This field is required</FormErrorMessage>
						</FormControl>
						<FormControl
							isRequired
							id="picture"
							isInvalid={errors && errors.length > 0 && errors.includes("main")}
						>
							<FormLabel>Main picture</FormLabel>
							<input
								type="file"
								name="main"
								onChange={uploadHandler}
								accept="image/*"
							/>
							<FormErrorMessage>This field is required</FormErrorMessage>
						</FormControl>
						<Grid gridTemplateColumns="1fr 1fr" gap={5}>
							<FormControl
								isRequired
								id="others"
								isInvalid={
									errors && errors.length > 0 && errors.includes("other1")
								}
							>
								<FormLabel>Other picture 1</FormLabel>
								<input
									type="file"
									name="other1"
									onChange={uploadHandler}
									accept="image/*"
								/>
								<FormErrorMessage>This field is required</FormErrorMessage>
							</FormControl>
							<FormControl id="others">
								<FormLabel>Other picture 2</FormLabel>
								<input
									type="file"
									name="other2"
									onChange={uploadHandler}
									accept="image/*"
								/>
							</FormControl>
							<FormControl id="others">
								<FormLabel>Other picture 3</FormLabel>
								<input
									type="file"
									name="other3"
									onChange={uploadHandler}
									accept="image/*"
								/>
							</FormControl>
							<FormControl id="others">
								<FormLabel>Other picture 4</FormLabel>
								<input
									type="file"
									name="other4"
									onChange={uploadHandler}
									accept="image/*"
								/>
							</FormControl>
						</Grid>
					</VStack>
				</ModalBody>

				<ModalFooter>
					<ButtonGroup spacing="10px">
						<Button
							className="button-text"
							variant="outline"
							onClick={onClose}
							isLoading={loading}
						>
							Cancel
						</Button>
						<Button
							className="button-text"
							colorScheme="green"
							onClick={onSave}
							isLoading={loading}
						>
							Save
						</Button>
					</ButtonGroup>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

CreatePetModal.propTypes = {
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
	onSave: PropTypes.func,
	onChange: PropTypes.func,
	info: PropTypes.object,
	loading: PropTypes.bool,
	file: PropTypes.any,
	uploadHandler: PropTypes.func,
};

export default CreatePetModal;
