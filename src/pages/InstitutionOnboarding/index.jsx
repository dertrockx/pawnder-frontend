import React, { useState, useEffect } from "react";
import history from "utils/history";
import { useSelector } from "react-redux";
import { IoArrowBack } from "react-icons/io5";

import LoadingPage from "pages/LoadingPage";
import Button from "components/Button";
import BasicInput from "components/BasicInput";
import BasicTextArea from "components/BasicTextArea";
import BasicImageInput from "components/BasicImageInput";
import BasicLabel from "components/BasicLabel";
import styles from "./InstitutionOnboarding.module.css";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

function InstitutionOnboardingPage() {
	const noPhoto = "/images/Avatar.png";
	const toast = useToast();
	const [step, setStep] = useState(1);
	const [value, setValue] = useState({
		avatarPhoto: "",
		name: "",
		description: "",
		contactNumber: "",
		locationLat: "",
		locationLong: "",
		websiteURL: "",
		facebookURL: "",
		twitterURL: "",
		messengerURL: "",
		instagramURL: "",
	});
	const [imagePreview, setImagePreview] = useState(`${noPhoto}`);
	const [imagePreviewError, setImagePreviewError] = useState(false);
	const [nextDisabled, setNextDisabled] = useState(true);
	const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
	const loginType = useSelector((s) => s.auth.loginType);
	const model = useSelector((s) => s.auth.model);
	const token = useSelector((s) => s.auth.token);
	const [loading, setLoading] = useState(true); // for fetching insti data and updating insti data
	const [hasError, setHasError] = useState(false); // for fetching insti data

	useEffect(() => {
		if (!isAuthenticated && loginType !== "INSTITUTION")
			return history.replace("/institution/login");
		setLoading(false);
		// eslint-disable-next-line
	}, [token]);

	useEffect(() => {
		setLoading(false);
		if (
			value.name !== "" &&
			value.description !== "" &&
			value.contactNumber !== ""
		)
			setNextDisabled(false);
		// eslint-disable-next-line
	}, [value]);

	const handleChange = (e) => {
		setValue({
			...value,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const id = Object.values(model)[1];

		axios
			.put(`/api/0.1/institution/${id}`, value)
			.then((response) => {
				setLoading(false);
				toast({
					title: "Successfully saved your changes.",
					status: "success",
					position: "top",
					duration: 5000,
					isClosable: true,
				});
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				setHasError(true);
				toast({
					title: "Something went wrong. Please try again later.",
					status: "error",
					position: "top",
					duration: 5000,
					isClosable: true,
				});
			});
		//sends PUT request
		// fetch(
		// 	`http://localhost:8081/api/0.1/institution/` + id,
		// 	{
		// 		method: "PUT",
		// 		headers: {
		// 			"Content-Type": "application/json"
		// 		},
		// 		body: JSON.stringify(value)
		// 	})
		// 	.then(response =>
		// 		{
		// 		if(response.status === 200){
		// 			history.replace("/feed")		//must be redirected to user feed page
		// 		}
		// 		return response.json();
		// 	}
		// 	)
		// 	.then(body => {
		// 		console.log(body)
		// 	})
	};

	const handleImageChange = (e) => {
		const selected = e.target.files[0];
		const ALLOWED_TYPES = ["image/png", "image/jpg", "image/jpeg"];
		if (selected && ALLOWED_TYPES.includes(selected.type)) {
			let reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(`${reader.result}`);
			};
			setValue({
				...value,
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

	// For location
	const onSuccess = (position) => {
		setValue({
			...value,
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
		/* See note in image handler. */
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
							<div className={styles.svg}>
								<img src="/images/paw.svg" alt="paw" />
							</div>
							<div className={styles.form}>
								{step > 1 && (
									<div style={{ "margin-top": 15, "margin-bottom": 15 }}>
										<Button
											style={{ "margin-top": 10, "margin-bottom": 20 }}
											size="small"
											onClick={() => setStep(step - 1)}
										>
											<IoArrowBack />
										</Button>
									</div>
								)}

								<form onSubmit={handleSubmit} name="onboarding-form">
									{step === 1 && (
										<div className={styles.item}>
											<div
												className="heading-2"
												style={{ "text-align": "center", width: 600 }}
											>
												Welcome! Let's create your profile.
											</div>

											<BasicImageInput
												src={imagePreview}
												label="Add Picture"
												onChange={handleImageChange}
												imagePreviewError={imagePreviewError}
											/>

											<div style={{ display: "flex" }}>
												<div style={{ width: 200, "padding-top": 5 }}>
													<BasicLabel label="Institution Name" />
												</div>
												<div style={{ width: 400 }}>
													<BasicInput
														type="text"
														name="name"
														onChange={handleChange}
														value={value.name}
														placeholder="Institution Name"
														required="true"
													/>
												</div>
											</div>

											<div style={{ display: "flex" }}>
												<div style={{ width: 200, "padding-top": 5 }}>
													<BasicLabel label="Description" />
												</div>
												<div style={{ width: 400 }}>
													<BasicTextArea
														rows={5}
														cols={100}
														name="description"
														onChange={handleChange}
														value={value.description}
														placeholder="Enter your description"
														required="true"
													/>
												</div>
											</div>

											<div style={{ display: "flex" }}>
												<div style={{ width: 200, "padding-top": 5 }}>
													<BasicLabel label="Contact Number" />
												</div>
												<div style={{ width: 400 }}>
													<BasicInput
														type="text"
														name="contactNumber"
														onChange={handleChange}
														value={value.contactNumber}
														placeholder="Contact Number"
														required="true"
													/>
												</div>
											</div>

											<div style={{ display: "flex" }}>
												<div style={{ width: 200, "padding-top": 5 }}>
													<BasicLabel label="Address" />
												</div>
												<div style={{ width: 400 }}>
													{/* <BasicInput 
												type="text"
												name="address"
												onChange={handleChange}
												value={value.address}
												placeholder="Address"
											/><br/> */}
													<Button
														onClick={handleLocation}
														color="brand-default"
														variant="outline"
														size="small"
													>
														Enable location
													</Button>
													<br />
													<Button
														onClick={() => setStep(step + 1)}
														color="brand-default"
														size="small"
														block
														disabled={nextDisabled}
													>
														Next
													</Button>
												</div>
											</div>
										</div>
									)}

									{step === 2 && (
										<div className={styles.item}>
											<div
												className="heading-2"
												style={{
													"text-align": "center",
													width: 600,
													"margin-top": 40,
													"margin-bottom": 40,
												}}
											>
												Welcome! Let's create your profile.
											</div>
											<div className="heading-3">External Links</div>
											<div
												style={{
													display: "flex",
													"margin-top": 5,
													"margin-bottom": 5,
												}}
											>
												<div style={{ width: 200, "padding-top": 5 }}>
													<BasicLabel label="Website" />
												</div>
												<div style={{ width: 400 }}>
													<BasicInput
														type="text"
														name="websiteURL"
														value={value.websiteURL}
														onChange={handleChange}
														placeholder="Website URL"
													/>
												</div>
											</div>
											<div style={{ display: "flex" }}>
												<div style={{ width: 200, "padding-top": 5 }}>
													<BasicLabel label="Facebook" />
												</div>
												<div style={{ width: 400 }}>
													<BasicInput
														type="text"
														name="facebookURL"
														value={value.facebookURL}
														onChange={handleChange}
														placeholder="Facebook URL"
													/>
												</div>
											</div>
											<div style={{ display: "flex" }}>
												<div style={{ width: 200, "padding-top": 5 }}>
													<BasicLabel label="Messenger" />
												</div>
												<div style={{ width: 400 }}>
													<BasicInput
														type="text"
														name="messengerURL"
														value={value.messengerURL}
														onChange={handleChange}
														placeholder="Messenger URL"
													/>
												</div>
											</div>
											<div style={{ display: "flex" }}>
												<div style={{ width: 200, "padding-top": 5 }}>
													<BasicLabel label="Twitter" />
												</div>
												<div style={{ width: 400 }}>
													<BasicInput
														type="text"
														name="twitterURL"
														value={value.twitterURL}
														onChange={handleChange}
														placeholder="Twitter URL"
													/>
												</div>
											</div>
											<div style={{ display: "flex" }}>
												<div style={{ width: 200, "padding-top": 5 }}>
													<BasicLabel label="Instagram" />
												</div>
												<div style={{ width: 400, "margin-bottom": 4 }}>
													<BasicInput
														type="text"
														name="instagramURL"
														value={value.instagramURL}
														onChange={handleChange}
														placeholder="Instagram URL"
													/>
													<div style={{ "margin-top": 20 }}>
														<Button
															onClick={handleSubmit}
															color="brand-default"
															size="small"
															block
														>
															Submit
														</Button>
													</div>
												</div>
											</div>
										</div>
									)}
								</form>
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
}

export default InstitutionOnboardingPage;
