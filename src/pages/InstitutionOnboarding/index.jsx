import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoArrowBack } from 'react-icons/io5';

import Button from "components/Button";
import BasicInput from "components/BasicInput"
import BasicTextArea from "components/BasicTextArea";
import BasicImageInput from "components/BasicImageInput";
import BasicLabel from "components/BasicLabel";
import styles from "./InstitutionOnboarding.module.css"
import { useToast } from '@chakra-ui/react';

function InstitutionOnboardingPage() {
	const history = useHistory();
	const toast = useToast();
	const [ step, setStep ] = useState(1);
	const [ value, setValue ] = useState({
		image: '/images/Avatar.png',
		name: "",
		description: "",
		contactNumber: "",
		locationLat: "",
		locationLong: "",
		websiteURL: "",
		facebookURL: "",
		twitterURL: "",
		messengerURL: "",
		instagramURL: ""
	});
	const [ locationError, setLocationError ] = useState(false);
	const [ imagePreviewError, setImagePreviewError ] = useState(false);
	const [ nextDisabled, setNextDisabled ] = useState(true);
	const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
	const loginType = useSelector((s) => s.auth.loginType);

	useEffect(() => {
		// if(!isAuthenticated) history.replace("/institution/login") 
		// else if (loginType === 'institution') {
			if(value.name !== "" && value.description !== "" && value.contactNumber !== "") setNextDisabled(false);
		// }
		
	});

	const handleChange = (e) => {
		setValue({
			...value,
			[e.target.name]: e.target.value,
		});

		console.log(e.target.value);
	}

	const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);

		//sends PUT request
		fetch(
			`http://localhost:8081/api/0.1/institution/` + `1`,	//hardcoded id
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(value)
			})
			.then(response =>
				{
				if(response.status === 200){
					history.replace("/feed")		//must be redirected to user feed page
				}
				return response.json();
			}
			)
			.then(body => {
				console.log(body)
			})

	}

	function imageHandler(e) {
		const selected = e.target.files[0];
		const ALLOWED_TYPES=['image/png', 'image/jpg', 'image/jpeg'];
		if(selected && ALLOWED_TYPES.includes(selected.type)) {
			const reader = new FileReader();
			reader.onload = () => {
				if(reader.readyState === 2) {
					setValue({
						...value,
						[e.target.name]: reader.result,
					})
				}
			}
			reader.readAsDataURL(e.target.files[0]);
		} else {
			if (selected === undefined) {
				return;
			}
			setImagePreviewError(true);
		}
	}

	// For location
	const onSuccess = (position) => {
		setValue({
			...value,
			locationLat: position.coords.latitude,
			locationLong: position.coords.longitude,
		});
		setLocationError(false);
	}
	
	const onError = () => {
		setLocationError(true);
		toast({
			title: 'Unable to retrieve your location. Please enable permissions.',
			status: 'error',
			position: 'top',
			duration: 5000,
			isClosable: true,
		});
	}

	const handleLocation = (e) => {
		/* See note in image handler. */
		e.preventDefault();
		if (!navigator.geolocation) {
		setLocationError(true);
		toast({
			title: 'Geolocation is not supported by your browser. Please use another.',
			status: 'error',
			position: 'top',
			duration: 5000,
			isClosable: true,
		});
		} else {
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.svg}>
				<img src="/images/paw.svg" alt="paw"/>
			</div>
			<div className={styles.form}>

				{step > 1 && (<div style={{ "margin-top": 15, "margin-bottom": 15 }}><Button style={{ "margin-top": 10, "margin-bottom": 20 }} size="small" onClick={() => setStep(step - 1)}><IoArrowBack /></Button></div>)}
				
				<form onSubmit={handleSubmit} name="onboarding-form">

					{ step === 1 && (
						<div className={styles.item}>
							<div className="heading-2" style={{ "text-align": "center", width: 600 }}>Welcome! Let's create your profile.</div>

							<BasicImageInput label="Add Picture" image={value.image} onChange={imageHandler} imagePreviewError={imagePreviewError}/>
							
							<div style={{ display: "flex" }}>
								<div style={{ width: 200, "padding-top": 5 }}>
									<BasicLabel label="Institution Name"/>
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

							<div style={{ display: "flex"}}>
								<div style={{ width: 200, "padding-top": 5 }}>
									<BasicLabel label="Description"/>
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

							<div style={{ display: "flex"}}>
								<div style={{ width: 200, "padding-top": 5 }}>
									<BasicLabel label="Contact Number"/>
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

							<div style={{ display: "flex"}}>
								<div style={{ width: 200, "padding-top": 5 }}>
									<BasicLabel label="Address"/>
								</div>
								<div style={{ width: 400 }}>							
									{/* <BasicInput 
										type="text"
										name="address"
										onChange={handleChange}
										value={value.address}
										placeholder="Address"
									/><br/> */}
									<Button onClick={handleLocation} color="brand-default" variant="outline" size="small">Enable location</Button><br/>
									<Button onClick={() => setStep(step + 1)} color="brand-default" size="small" block disabled={nextDisabled}>Next</Button>
								</div>
							</div>
							
						</div>
					)}

					{ step === 2 && (
						<div className={styles.item}>
							<div className="heading-2" style={{ "text-align": "center", width: 600, "margin-top": 40, "margin-bottom": 40 }}>Welcome! Let's create your profile.</div>
							<div className="heading-3">External Links</div>
							<div style={{ display: "flex", "margin-top": 5, "margin-bottom": 5 }}>
								<div style={{ width: 200, "padding-top": 5 }}>
									<BasicLabel label="Website"/>
								</div>
								<div  style={{ width: 400 }}>
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
									<BasicLabel label="Facebook"/>
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
									<BasicLabel label="Messenger"/>
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
									<BasicLabel label="Twitter"/>
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
									<BasicLabel label="Instagram"/>
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
										<Button onClick={handleSubmit} color="brand-default" size="small" block>Submit</Button>
									</div>
								</div>
							</div>

						</div>
					)}
				</form>

			</div>
		</div>
	)
}

export default InstitutionOnboardingPage;