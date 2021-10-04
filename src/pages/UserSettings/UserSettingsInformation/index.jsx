import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import history from "utils/history";

import LoadingPage from "pages/LoadingPage";
import BasicDescription from "components/BasicDescription";
import BasicHR from "components/BasicHR";
import BasicImageInput2 from "components/BasicImageInput2";
import BasicLabel from "components/BasicLabel";
import BasicInput from "components/BasicInput";
import Button from "components/Button";
import styles from "./UserSettingsInformation.module.css";
import { IoLocationSharp } from "react-icons/io5";
import { Radio, RadioGroup, Stack, useToast } from "@chakra-ui/react";
import axios from "utils/axios";

function UserSettingsInformation() {
	const noPhoto = "/images/Avatar.png";
	const toast = useToast();
	const [values, setValues] = useState({
		avatarPhoto: null,
		firstName: null,
		middleName: null,
		lastName: null,
		sex: null,
		birthDate: null,
		contactNumber: null,
		locationLat: "",
		locationLong: "",
	});
	const [currentValues, setCurrentValues] = useState({
		avatarPhoto: null,
		firstName: null,
		middleName: null,
		lastName: null,
		sex: null,
		birthDate: null,
		contactNumber: null,
		locationLat: "",
		locationLong: "",
	});

	const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
	const loginType = useSelector((s) => s.auth.loginType);
	const token = useSelector((s) => s.auth.token);
	const model = useSelector((s) => s.auth.model);
	const [imagePreviewError, setImagePreviewError] = useState(false);
	const [imagePreview, setImagePreview] = useState(`${noPhoto}`);
	const [locationError, setLocationError] = useState(false);
	const [isSaveDisabled, setIsSaveDisabled] = useState(false);
	const [isRequired, setIsRequired] = useState(false);
	const [contactNumberError, setContactNumberError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	//checks if user is authenticated
	useEffect(() => {
		if (!isAuthenticated && loginType !== "USER")
			return history.replace("/user/login");
		// const id = Object.values(model)[1];
		const id = model.id;

		try {
			axios
				.get(`/api/0.1/user/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((data) => {
					const user = data.data.user;
					var today = new Date(user.birthDate);
					setValues({
						avatarPhoto: user.photoUrl,
						firstName: user.firstName,
						middleName: user.middleName,
						lastName: user.lastName,
						sex: user.sex,
						birthDate: today.toISOString().substr(0, 10),
						contactNumber: user.contactNumber,
						locationLat: user.locationLat,
						locationLong: user.locationLat,
					});

					setCurrentValues({
						avatarPhoto: user.photoUrl,
						firstName: user.firstName,
						middleName: user.middleName,
						lastName: user.lastName,
						sex: user.sex,
						birthDate: today.toISOString().substr(0, 10),
						contactNumber: user.contactNumber,
						locationLat: user.locationLat,
						locationLong: user.locationLat,
					});

					setImagePreview(user.photoUrl);
					setLoading(false);
					setHasError(false);
				});
		} catch (error) {
			console.log(error);
			setLoading(false);
			setHasError(true);
		}
		// eslint-disable-next-line
	}, [token]);

	function checkObjects(keys1) {
		for (let key of keys1) {
			if (values[key] !== currentValues[key]) {
				return false;
			}
		}
		return true;
	}

	useEffect(() => {
		const keys1 = Object.keys(values);
		if (checkObjects(keys1)) setIsSaveDisabled(true);
		else setIsSaveDisabled(false);
		// eslint-disable-next-line
	}, [values]);

	const handleChange = (e) => {
		if (e.target.name === "contactNumber" && contactNumberError)
			setContactNumberError(false);
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});

		if (isRequired) setIsRequired(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);

		// const id = Object.values(model)[1];
		const id = model.id;
		if (
			values.firstName === "" ||
      values.firstName === null ||
			values.lastName === "" ||
			values.lastName === null ||
			values.contactNumber === "" || 
      values.contactNumber === null ||
			values.locationLat === "" ||
			values.locationLong === "" ||
      values.locationLat === null ||
			values.locationLong === null
      
		)
			return setIsRequired(true);
		// change logic of this one
		// regardless of the left-part's value, it still checks the right side
		// that's why it results to a .null error
		if (
			isNaN(values.contactNumber) ||
			!values.contactNumber ||
			values.contactNumber.length !== 11
		)
			return setContactNumberError(true);

		const data = new FormData();
		data.append("avatarPhoto", values.avatarPhoto);
		data.append("firstName", values.firstName);
		data.append("middleName", values.middleName);
		data.append("lastName", values.lastName);
		data.append("contactNumber", values.contactNumber);
		data.append("locationLat", values.locationLat);
		data.append("locationLong", values.locationLong);

		axios
			.put(`/api/0.1/user/${id}`, data)
			.then((res) => {
				setLoading(false);
				toast({
					title: "Successfully saved your changes.",
					status: "success",
					position: "top",
					duration: 5000,
					isClosable: true,
				});
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				toast({
					title: "Something went wrong. Please try again later.",
					status: "error",
					position: "top",
					duration: 5000,
					isClosable: true,
				});
			});
	};

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
			setImagePreviewError(false);
		} else {
			/**
			 * Selecting a file and cancelling returns undefined to selected.
			 * So if you select a file and cancel, the imagePreviewError would be set to true.
			 * We don't want that so we check if selected === undefined. If it's true, then we don't give out any errors.
			 */
			if (selected === undefined) {
				setImagePreviewError(false);
				return;
			}
			setImagePreviewError(true);
			toast({
				title: "We don't support that file type.",
				status: "error",
				position: "top",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const handleImageRemove = (e) => {
		e.preventDefault();
		setImagePreview(`${noPhoto}`);
		setValues({
			...values,
			avatarPhoto: null,
		});
	};

	// For location
	const onSuccess = (position) => {
		setValues({
			...values,
			locationLat: position.coords.latitude,
			locationLong: position.coords.longitude,
		});

		setLocationError(false);
		toast({
			title: "Access to location allowed.",
			status: "success",
			position: "top",
			duration: 5000,
			isClosable: true,
		});
	};

	const onError = () => {
		setLocationError(true);
		toast({
			title: "Unable to retrieve your location. Please enable permissions.",
			status: "error",
			position: "top",
			duration: 5000,
			isClosable: true,
		});
	};

	const handleLocation = (e) => {
		/* See note in image handler. */
		e.preventDefault();
		if (!navigator.geolocation) {
			setLocationError(true);
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

	function handleCancel(e) {
		e.preventDefault();
		setValues(currentValues);
	}

	return (
		<>
			{loading ? (
				<LoadingPage />
			) : (
				<>
					{hasError ? (
						<div className={styles.center}>
							<h1 className="heading-1">
								Something went wrong. Please try again later.
							</h1>
						</div>
					) : (
						<div className={styles.container}>
							<div className={styles.row}>
								<div>
									<BasicDescription
										title="Display Picture"
										body="Upload your display picture to share in public."
									/>
								</div>
								<div>
									<BasicImageInput2
										src={imagePreview}
										label="Change Picture"
										onChange={handleImageChange}
										onClick={handleImageRemove}
										imagePreviewError={imagePreviewError}
									/>
								</div>
							</div>

							<BasicHR />

							<div className={styles.row}>
								<div>
									<BasicDescription
										title=" Basic Information"
										body="Update your basic information to display on your profile."
									/>
								</div>
								<div>
									<div className={styles.row}>
										<div className={styles.label}>
											<BasicLabel label="First Name" />
										</div>
										<div className={styles.input}>
											<BasicInput
												type="text"
												name="firstName"
												outline={isRequired ? "red" : "gray"}
												onChange={handleChange}
												value={values.firstName}
											/>
										</div>
									</div>

									<div className={styles.row}>
										<div className={styles.label}>
											<BasicLabel label="Last Name" />
										</div>
										<div className={styles.input}>
											<BasicInput
												type="text"
												name="lastName"
												outline={isRequired ? "red" : "gray"}
												onChange={handleChange}
												value={values.lastName}
											/>
										</div>
									</div>

									<div className={styles.row}>
										<div className={styles.label}>
											<BasicLabel label="Middle Name (Optional)" />
										</div>
										<div className={styles.input}>
											<BasicInput
												type="text"
												name="middleName"
												onChange={handleChange}
												value={values.middleName}
											/>
										</div>
									</div>

									<div className={styles.row}>
										<div className={styles.label}>
											<BasicLabel label="Sex" />
										</div>
										<div className={styles.input}>
											<RadioGroup
												name="sex"
												onChange={handleChange}
												value={values.sex}
											>
												<Stack spacing={8} direction="row">
													<Radio
														isDisabled
														name="sex"
														variantColor="brand.100"
														value="m"
													>
														Male
													</Radio>
													<Radio
														isDisabled
														name="sex"
														variantColor="brand.100"
														value="f"
													>
														Female
													</Radio>
												</Stack>
											</RadioGroup>
										</div>
									</div>

									<div className={styles.row}>
										<div className={styles.label}>
											<BasicLabel label="Birthdate" />
										</div>
										<div className={styles.input}>
											<BasicInput
												type="date"
												name="birthDate"
												outline={isRequired ? "red" : "gray"}
												onChange={handleChange}
												value={values.birthDate}
												disabled
											/>
										</div>
									</div>

									<div className={styles.row}>
										<div className={styles.label}>
											<BasicLabel label="Contact Number" />
										</div>
										<div className={styles.input}>
											<BasicInput
												type="tel"
												name="contactNumber"
												maxlength="11"
												outline={
													contactNumberError || isRequired ? "red" : "gray"
												}
												onChange={handleChange}
												value={values.contactNumber}
											/>
										</div>
									</div>

									<div className={styles.row}>
										<div className={styles.label}>
											<BasicLabel label="Address" />
										</div>
										<div className={styles.input}>
											{values.locationLat !== currentValues.locationLat &&
											values.locationLong !== currentValues.locationLong ? (
												<Button
													size="small"
													color="brand-default"
													onClick={handleLocation}
												>
													{" "}
													<span>Location updated</span>
													<IoLocationSharp />{" "}
												</Button>
											) : (
												<Button
													size="small"
													color="brand-default"
													onClick={handleLocation}
													variant="outline"
												>
													<IoLocationSharp /> <span>Update location</span>
												</Button>
											)}
											{locationError !== "" && (
												<p className="paragraph">{locationError}</p>
											)}
										</div>
									</div>
								</div>
							</div>

							<BasicHR />

							<div className={styles.row}>
								<div>
									<BasicDescription />
								</div>
								<div className={styles.row}>
									<div className={styles.label}></div>
									<div className={styles.row}>
										<div style={{ width: 190, "margin-right": 10 }}>
											<Button
												onClick={handleCancel}
												color="brand-default"
												variant="outline"
												size="small"
												block
											>
												Cancel
											</Button>
										</div>
										<div style={{ width: 190, "margin-left": 10 }}>
											<Button
												onClick={handleSubmit}
												color="brand-default"
												size="small"
												block
												disabled={isSaveDisabled}
											>
												Save
											</Button>
										</div>
									</div>
								</div>
							</div>
							<br />
							<br />
						</div>
					)}
				</>
			)}
		</>
	);
}

export default UserSettingsInformation;
