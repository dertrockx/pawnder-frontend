import React, { useState } from "react";
import Button from "components/Button";
import BasicInput from "components/BasicInput"
import BasicTextArea from "components/BasicTextArea";
import { IoLocationSharp, IoArrowBack } from 'react-icons/io5';

function InstitutionOnboardingPage() {
	const [ step, setStep ] = useState(1);
	const [ value, setValue ] = useState({
		image: null,
		name: null,
		description: null,
		address: null,
		websiteURL: null,
		facebookURL: null,
		twitterURL: null,
		messengerURL: null,
		instagramURL: null
	});
	const [ isEnableLocationClicked, setIsEnableLocationClicked ] = useState(false);

	const handleChange = (e) => {
		setValue({
			...value,
			[e.target.name]: e.target.value,
		});

		// For testing
		console.log(e.target.value);
	}

	const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
  }

	// function handleValueChange(e, valueCb) {
	// 	const newValue = e.target.value;
	// 	valueCb(newValue);
	// }
	
	// function handleFormSubmit(e) {
	// 	e.preventDefault();
	// }
	
	// function clickNext(e) {
	// 	e.preventDefault();
	// 	setIsNextClicked(true);
	// }

	// function clickSubmit(e) {
	// 	e.preventDefault();
	// 	console.log(name, description, websiteURL, facebookURL, twitterURL, instagramURL, messengerURL);
	// 	//clears the fields of the form
	// 	const form = document.getElementsByName("onboarding-form");
	// 	form[0].reset();
	// }

	function clickEnableLocation() {
		setIsEnableLocationClicked(true);
	}

	// function imageSelectedHandler(event) {
	// 	setSelectedImage(event.target.img);
	// 	console.log(event.target.img);
	// }

	return (
		<div>
			<div>
				<img src="/images/paw.svg" alt="paw"/>
				{step > 1 && (<Button size="small" onClick={() => setStep(step - 1)}><IoArrowBack /></Button>)}
			</div>
			<div>
				<form onSubmit={handleSubmit}>

					{ step === 1 && (
						<div>
							<div className="heading-2">Welcome! Let's create your profile.</div>
							<div>
								<label>Institution Name</label>
								<BasicInput
									type="text"
									name="name"
									onChange={handleChange}
									placeholder="Institution Name"
									required="true"
								/>
							</div>
							<div>
								<label>Description</label>
								<BasicTextArea
									rows={5}
									cols={100}
									name="description"
									placeholder="Enter your description"
									onChange={handleChange}
									required="true"
								/>
							</div>
							<div>
								<label>Contact Number</label>
								<BasicInput 
									type="text"
									name="contact-number"
									placeholder="Contact Number"
									required="true"
								/>
							</div>
							<div>
								<label>Address</label>
								<BasicInput 
									type="text"
									name="address"
									placeholder="Address"
									disabled="true"
								/>
								<Button onClick={clickEnableLocation} color="brand-default" variant="outline" size="small">Enable location</Button><br/>
							</div>
								<Button onClick={() => setStep(step + 1)} color="brand-default" size="small" block>Next</Button>
							
						</div>
					)}

					{ step === 2 && (
						<div>

							<div className="heading-2">Welcome! Let's create your profile.</div>
							External Links
							Website
		 					<BasicInput 
									type="text"
									name="website"
									onChange={handleChange}
									placeholder="Website URL"
							/>
							Facebook
							<BasicInput 
									type="text"
									name="facebook"
									onChange={handleChange}
									placeholder="Facebook URL"
							/>
							Messenger
							<BasicInput 
									type="text"
									name="messenger"
									onChange={handleChange}
									placeholder="Messenger URL"
							/>
							Twitter
							<BasicInput 
									type="text"
									name="twitter"
									onChange={handleChange}
									placeholder="Twitter URL"
							/>
							Instagram
							<BasicInput 
									type="text"
									name="instagram"
									onChange={handleChange}
									placeholder="Instagram URL"
							/>
							<Button onClick={handleSubmit} color="brand-default" size="small" block>Submit</Button>

						</div>
					)}
				</form>
			</div>
		</div>


		// <div style={{ display: "flex" }}>
		// 	<div 
		// 		style={{
		// 			width: "50%",
		// 			height: "50%",
		// 			// background: "#89CFF0",
		// 		}}
		// 	>
		// 		<img src="/images/paw.svg" alt="paw"/>
		// 	</div>

		// 	<div 
		// 		className="paragraph" 
		// 		style={{
		// 			padding: 150,
		// 			"padding-top": 75,
		// 			width: "50%",
		// 			height: "50%",
		// 			// background: "#8B0000"
		// 		}}
		// 	>
		// 		<div className="heading-2">Welcome! Let's create your profile.</div>
				
		// 			{!isNextClicked ? (
		// 				<>
		// 				{/* <Button color="brand-default" variant="outline" size="small">Add Picture</Button> */}
		// 				<input type="file" id="default-btn" accept="image/*" style={{ border: "1px solid #A52A2A" }} />
		// 				{/* <Button onClick={imageSelectedHandler} id="custom-btn" color="brand-default" variant="outline" size="small">Add Picture</Button> */}
		// 				<BasicHR/>
		// 				<br/>
		// 				<form name="onboarding-form" onSubmit={handleFormSubmit}>
		// 					<>
		// 						<div style={{ width: 200, display:"inline-block" }}>Institution Name</div>
		// 						<BasicInput
		// 							type="text"
		// 							name="name"
		// 							onChange={(e) => handleValueChange(e, setName)}
		// 							placeholder="Institution Name"
		// 							required="true"
		// 						/>
		// 					</>
		// 						Description
		// 						<BasicTextArea
		// 							rows={5}
		// 							cols={100}
		// 							name="description"
		// 							placeholder="Enter your description"
		// 							onChange={(e) => handleValueChange(e, setDescription)}
		// 							required="true"
		// 						/>
		// 					<>
		// 						Contact Number
		// 						<BasicInput 
		// 							type="text"
		// 							name="contact-number"
		// 							placeholder="Contact Number"
		// 							required="true"
		// 						/>
		// 					</>
		// 						Address
		// 						<BasicInput 
		// 							type="text"
		// 							name="address"
		// 							placeholder="Address"
		// 							disabled="true"
		// 						/>
		// 					<>
		// 						<Button onClick={clickEnableLocation} color="brand-default" variant="outline" size="small">Enable location</Button><br/>
		// 					</>
		// 					<>
		// 						<Button onClick={clickNext} color="brand-default" size="small" block>Next</Button>
		// 					</>
						
		// 				</form>
		// 			</>
		// 			) : (
		// 				<>
		// 				External Links
		// 				<form name="onboarding-form" onSubmit={handleFormSubmit}>
		// 					Website
		// 					<BasicInput 
		// 							type="text"
		// 							name="website"
		// 							onChange={(e) => handleValueChange(e, setWebsiteURL)}
		// 							placeholder="Website URL"
		// 					/>
		// 					Facebook
		// 					<BasicInput 
		// 							type="text"
		// 							name="facebook"
		// 							onChange={(e) => handleValueChange(e, setFacebookURL)}
		// 							placeholder="Facebook URL"
		// 					/>
		// 					Messenger
		// 					<BasicInput 
		// 							type="text"
		// 							name="messenger"
		// 							onChange={(e) => handleValueChange(e, setMessengerURL)}
		// 							placeholder="Messenger URL"
		// 					/>
		// 					Twitter
		// 					<BasicInput 
		// 							type="text"
		// 							name="twitter"
		// 							onChange={(e) => handleValueChange(e, setTwitterURL)}
		// 							placeholder="Twitter URL"
		// 					/>
		// 					Instagram
		// 					<BasicInput 
		// 							type="text"
		// 							name="instagram"
		// 							onChange={(e) => handleValueChange(e, setInstagramURL)}
		// 							placeholder="Instagram URL"
		// 					/>
		// 					<Button onClick={clickSubmit} color="brand-default" size="small" block>Submit</Button>
		// 				</form>
		// 			</>
		// 			)}
				
		// 	</div>
		// </div>
	)
}

export default InstitutionOnboardingPage;