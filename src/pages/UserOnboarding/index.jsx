import React, { useState, useEffect } from "react";
import { IoLocationSharp, IoArrowBack } from "react-icons/io5";
import {
	Input,
	InputGroup,
	InputLeftAddon,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	useToast,
} from "@chakra-ui/react";

// Change to utils
// import { useHistory } from 'react-router';
import axios from "axios";

import Button from "components/Button";
import BasicInputUser from "components/BasicInputUser";
import Radio from "components/Radio";
// import Checkbox from 'components/Checkbox';

import logo from "assets/logo.svg";
import dogAdopting from "assets/dogAdopting.png";
import catFostering from "assets/catFostering.png";
import noPhoto from "assets/noPhoto.png";
import bg from "assets/userOnboardingBackground.png";
import styles from "./UserOnboarding.module.css";

const UserOnboarding = () => {
	// fetch user id here from redux login
	const id = 4;

	// const history = useHistory();
	const toast = useToast();

	const current = new Date().toISOString().split("T")[0];

	// User model only allows string, but will be commenting this out since checkbox component isn't used
	// const [preferredAnimalsArr, setPreferredAnimalsArr] = useState([]);

	const [imagePreview, setImagePreview] = useState(noPhoto);
	const [step, setStep] = useState(1);
	const [isDisabled, setIsDisabled] = useState(true); // set to false when testing and comment out useEffect
	const [distance, setDistance] = useState(""); // for Chakra-UI NumberInput
	const [values, setValues] = useState({
		avatarPhoto: "",
		firstName: "",
		middleName: "",
		lastName: "",
		birthDate: "",
		sex: "",
		contactNumber: "",
		locationLat: "",
		locationLong: "",
		action: "",
		preferredAnimal: "", // to match backend
		preferredDistance: "",
	});

	// For disabling buttons
	useEffect(() => {
		// If step 1, check photo, first and last names, bday, sex, number, and loc coordinates
		// If step 2, check action
		// If step 3, check preferred animals and distance

		if (step === 1) {
			if (
				values.avatarPhoto !== "" &&
				values.firstName !== "" &&
				values.lastName !== "" &&
				values.birthDate !== "" &&
				values.sex !== "" &&
				values.contactNumber !== "" &&
				values.contactNumber.match(/^\d{10}$/) &&
				values.locationLat !== "" &&
				values.locationLong !== ""
			) {
				setIsDisabled(false);
			} else {
				setIsDisabled(true);
			}
		} else if (step === 2) {
			if (values.action !== "") {
				setIsDisabled(false);
			} else {
				setIsDisabled(true);
			}
		} else if (step === 3) {
			if (values.preferredAnimal !== "" && values.preferredDistance !== "") {
				setIsDisabled(false);
			} else {
				setIsDisabled(true);
			}
		}
	}, [values, step]);

	const animals = [
		{ text: "dogs", value: "dogs" },
		{ text: "cats", value: "cats" },
		{ text: "fish & aquariums", value: "fish and aquariums" },
		{ text: "reptiles & amphibians", value: "reptiles and amphibians" },
		{ text: "exotic pets", value: "exotic pets" },
		{ text: "rabbits", value: "rabbits" },
		{ text: "rodents", value: "rodents" },
	];

	const AnimalOptions = ({ options }) => {
		return (
			<>
				{options.map((choice, index) => (
					<div className={styles.checkboxItem} key={index}>
						{/* <Checkbox
            id={choice.value}
            label={choice.text}
            onChange={handleCheck}
            checked={preferredAnimalsArr.includes(`${choice.value}`)}
          /> */}
						<Radio
							name="preferredAnimal"
							value={choice.value}
							label={choice.text}
							onChange={handleChange}
							checked={values.preferredAnimal === `${choice.value}`}
						/>
					</div>
				))}
			</>
		);
	};

	// For input of types text or radio
	const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	// For input of type checkbox
	// const handleCheck = (e) => {
	//   let newArray = [...preferredAnimalsArr, e.target.id];
	//   if (preferredAnimalsArr.includes(e.target.id)) {
	//     newArray = newArray.filter(animal => animal !== e.target.id);
	//   }
	//   setPreferredAnimalsArr(newArray);
	//   setValues({
	//     ...values,
	//     preferredAnimal: newArray.join(', '), // using newArr becayse preferredAnimalsArr holds the prev state of newArr
	//   });
	// };

	const handleImageChange = (e) => {
		const selected = e.target.files[0];
		const ALLOWED_TYPES = ["image/png", "image/jpg", "image/jpeg"];
		if (selected && ALLOWED_TYPES.includes(selected.type)) {
			let reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(`${reader.result}`);
			};
			setValues({
				...values,
				avatarPhoto: selected,
			});
			reader.readAsDataURL(selected);
		} else {
			// Selecting a file and cancelling returns undefined to selected.
			// We don't want that so we check if selected === undefined. If it's true, then we don't give out any errors.
			if (selected === undefined) {
				return;
			}
			toast({
				title: "We don't support that file type.",
				status: "error",
				position: "top",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	// This handler is solely for Chakra-UI's NumberInput since it doesn't return an event object.
	// See: https://github.com/chakra-ui/chakra-ui/issues/617
	const handleNumberChange = (distance) => {
		setDistance(distance);
		setValues({
			...values,
			preferredDistance: distance,
		});
	};

	// For location
	const onSuccess = (position) => {
		setValues({
			...values,
			locationLat: position.coords.latitude,
			locationLong: position.coords.longitude,
		});
	};

	const onError = () => {
		toast({
			title: "Unable to retrieve your location. Please enable permissions.",
			status: "error",
			position: "top",
			duration: 5000,
			isClosable: true,
		});
	};

	const handleLocation = (e) => {
		/**
		 * All buttons inside a form trigger the submit event.
		 * By using the preventDefault() method, the submit event will be canceled,
		 * thus, allowing multiple buttons inside a form.
		 */
		e.preventDefault();
		if (!navigator.geolocation) {
			toast({
				title:
					"Geolocation is not supported by your browser. Please use another.",
				status: "error",
				position: "top",
				duration: 5000,
				isClosable: true,
			});
		} else {
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault(); // so page doesn't reload

		const formData = new FormData();

		for (const key in values) {
			formData.append(`${key}`, values[key]);
		}

		axios
			.put("http://localhost:8081/api/0.1/user/" + id, formData)
			.then(() => {
				toast({
					title:
						"Successfully updated information. Redirecting to feed, please wait.",
					status: "success",
					position: "top",
					duration: 5000,
					isClosable: true,
				});

				// Redirect to feed after onboarding
				// history.push('/feed');
			})
			.catch(() => {
				toast({
					title: "Something went wrong. Please try again later.",
					status: "error",
					position: "top",
					duration: 5000,
					isClosable: true,
				});
			});
	};

	return (
		<div className={styles.page}>
			<div className={styles.topItems}>
				<img src={logo} alt="logo" className={styles.logo} />
				{step > 1 && (
					<Button
						className={styles.backButton}
						size="small"
						onClick={() => setStep(step - 1)}
					>
						<IoArrowBack />
					</Button>
				)}
			</div>
			<div className={styles.content}>
				<form onSubmit={handleSubmit}>
					{step === 1 && (
						<div className={styles.formGroup}>
							<h2 className="heading-2">Welcome! Let's create your profile</h2>
							<div className={styles.imageContainer}>
								<img src={imagePreview} alt="" className={styles.img} />
								<input
									className={styles.hideImageInput}
									type="file"
									accept="image/jpeg, image/jpg, image/png"
									id="image"
									onChange={handleImageChange}
								/>
								<label className={styles.imageUploadButton} htmlFor="image">
									{" "}
									{/* Cannot use button as label for adding photo. */}
									Choose Photo
								</label>
							</div>
							<div className={styles.formFields}>
								<div>
									<label className="bold-text">First Name</label>
									<BasicInputUser
										type="text"
										name="firstName"
										onChange={handleChange}
										value={values.firstName}
										placeholder="First Name"
									/>
								</div>
								<div>
									<label className="bold-text">Middle Name</label>
									<BasicInputUser
										type="text"
										name="middleName"
										onChange={handleChange}
										value={values.middleName}
										placeholder="Middle Name (optional)"
									/>
								</div>
								<div>
									<label className="bold-text">Last Name</label>
									<BasicInputUser
										type="text"
										name="lastName"
										onChange={handleChange}
										value={values.lastName}
										placeholder="Last Name"
									/>
								</div>
								<div className={styles.formItemSex}>
									<label className="bold-text">Sex</label>
									<div className={styles.formItemSexOptions}>
										<Radio
											name="sex"
											value="m"
											label="Male"
											onChange={handleChange}
											checked={values.sex === "m"}
										/>
										<Radio
											name="sex"
											value="f"
											label="Female"
											onChange={handleChange}
											checked={values.sex === "f"}
										/>
									</div>
								</div>
								<div>
									<label className="bold-text">Date of Birth</label>
									<BasicInputUser
										type="date"
										name="birthDate"
										onChange={handleChange}
										value={values.birthDate}
										max={current}
									/>
								</div>
								<div>
									<label className="bold-text">Contact Number</label>
									<InputGroup marginTop="10px">
										<InputLeftAddon children="+63" fontFamily="Raleway" />
										<Input
											type="tel"
											placeholder="Contact Number"
											name="contactNumber"
											onChange={handleChange}
											onKeyPress={(e) => {
												if (e.target.value.length > 9) {
													e.preventDefault();
													e.stopPropagation();
												}
											}}
											value={values.contactNumber}
											fontFamily="Raleway"
											borderWidth="2px"
											borderColor={"var(--color-light-grey)"}
											_hover={{ borderColor: "var(--color-grey)" }}
											_focus={{ borderColor: "brand.100", borderWidth: "2px" }}
										/>
									</InputGroup>
								</div>
								<div>
									<label className="bold-text">Location</label>
									{values.locationLat !== "" && values.locationLong !== "" ? (
										<Button
											size="small"
											color="brand-default"
											onClick={handleLocation}
										>
											{" "}
											<span>Location enabled</span>
											<IoLocationSharp />{" "}
										</Button>
									) : (
										<Button
											size="small"
											color="brand-default"
											onClick={handleLocation}
											variant="outline"
										>
											<IoLocationSharp /> <span>Enable location</span>
										</Button>
									)}
								</div>
							</div>
						</div>
					)}
					{step === 2 && (
						<div className={styles.formGroup}>
							<h2 className="heading-2">What brings you to Pawnder?</h2>
							<div className={styles.cardDisplay}>
								<label>
									<div
										className={
											values.action !== "adopt"
												? styles.cardPreferences
												: styles.cardPreferencesSelected
										}
									>
										<img
											src={dogAdopting}
											alt=""
											className={styles.cardImage}
										/>
										<h3 className="heading-3">I'm adopting</h3>
										<p className="paragraph">
											Give an animal a second chance by providing a loving
											furrever home.
										</p>
										<input
											type="radio"
											name="action"
											value="adopt"
											onChange={handleChange}
											checked={values.action === "adopt"}
										/>
									</div>
								</label>
								<label>
									<div
										className={
											values.action !== "foster"
												? styles.cardPreferences
												: styles.cardPreferencesSelected
										}
									>
										<img
											src={catFostering}
											alt=""
											className={styles.cardImage}
										/>
										<h3 className="heading-3">I'm fostering</h3>
										<p className="paragraph">
											Temporarily care for a furry friend in need until a
											suitable home is found.
										</p>
										<input
											type="radio"
											name="action"
											value="foster"
											onChange={handleChange}
											checked={values.action === "foster"}
										/>
									</div>
								</label>
							</div>
						</div>
					)}
					{step === 3 && (
						<div className={styles.formGroup}>
							<h2 className="heading-2">Which animal would you like to see?</h2>
							<p className="paragraph">You can only select one</p>
							<div className={styles.checkboxesContainer}>
								<AnimalOptions options={animals} />
							</div>
							<h2 className="heading-2">How far are you willing to go?</h2>
							<NumberInput
								fontFamily="Raleway"
								focusBorderColor="brand.100"
								min={1}
								value={distance}
								onChange={handleNumberChange}
							>
								<NumberInputField placeholder="km" />
								<NumberInputStepper color="rgb(109, 125, 139)">
									<NumberIncrementStepper
										_active={{ color: "rgb(255, 165, 0)" }}
									/>
									<NumberDecrementStepper
										_active={{ color: "rgb(255, 165, 0)" }}
									/>
								</NumberInputStepper>
							</NumberInput>
						</div>
					)}
					{step === 3 && (
						<Button
							type="submit"
							color="brand-default"
							block
							disabled={isDisabled}
						>
							SUBMIT
						</Button>
					)}
				</form>
				{step < 3 && (
					<Button
						type="button"
						color="brand-default"
						block
						onClick={() => setStep(step + 1)}
						disabled={isDisabled}
					>
						NEXT
					</Button>
				)}
				<div className={styles.bg}>
					<img src={bg} alt="" />
				</div>
			</div>
		</div>
	);
};

export default UserOnboarding;
