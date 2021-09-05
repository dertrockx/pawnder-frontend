import { useState } from "react";
import BasicInput from "components/BasicInput";
import Button from "components/Button";

function UserSignupPage() {
	const [ email, setEmail ] = useState(null);
	const [ password, setPassword ] = useState(null);
	const [ confirmPasword, setConfirmPasword ] = useState(null);    

	function handleValueChange(e, valueCb) {
		const newValue = e.target.value;
		valueCb(newValue);
	}
	
	function handleFormSubmit(e) {
		e.preventDefault();
		console.log(email, password, confirmPasword);
	}

	return (
		<div style={{ display: "flex" }}>
			<div style={{ width: "50%", height: "50%" }}>
				<img src="/images/dog.jpg" alt="dog" style={{ height: "100%", width: "100%", "object-fit": "contain" }} />
			</div>

			<div 
				className="input-label" 
				style={{
					padding: 200,
					"padding-top": 130,
					"padding-bottom": 130,
					width: "50%", 
					height: "50%",
				}}>
				<div 
					style={{ 
						"text-align": "center" 
					}}>
					<div className="heading-2">Create an account</div>
					<div className="paragraph">Welcome! Enter your personal details and give a home to these adorable pets.</div>
				</div><br/>
				<form 
					onSubmit={handleFormSubmit} 
					style={{ 
						"margin-left": 25, 
						"margin-right": 25 
					}}>
					Email<br/>
					<BasicInput 
						type="email"
						name="email"
						onChange={(e) => handleValueChange(e, setEmail)}
						placeholder="Email"
					/><br/>
					Password<br/>
					<BasicInput 
						type="password"
						name="password"
						onChange={(e) => handleValueChange(e, setPassword)}
						placeholder="Password"
					/><br/>
					Confirm Password<br/>
					<BasicInput 
						type="password"
						name="confirmPassword"
						onChange={(e) => handleValueChange(e, setConfirmPasword)}
						placeholder="Confirm Password"
					/><br/><br/>
					<Button color="brand-default" size="small" block>Signup</Button><br/>
					<div 
						className="caption" 
						style={{ 
							"text-align": "center" 
						}}
					>
						Already have an account? Login
					</div>
				</form>
			</div>
		</div>
	)
}

export default UserSignupPage;