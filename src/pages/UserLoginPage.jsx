import { useState } from "react";
import BasicInput from "components/BasicInput";
import Button from "components/Button";

function UserLoginPage() {
	const [ email, setEmail ] = useState(null);
	const [ password, setPassword ] = useState(null);

	function handleValueChange(e, valueCb) {
			const newValue = e.target.value;
			valueCb(newValue);
	}
	
	function handleFormSubmit(e) {
			e.preventDefault();
			console.log(email, password);
	}

	return (
		<div style={{ display: "flex" }}>
			<div 
				className="input-label" 
				style={{ 
					padding: 200,
					"padding-top": 170,
					"padding-bottom": 150,
					width: "50%", 
					height: "50%",
				}}
			>
				<div style={{ 
					"text-align": "center" 
					}}
				>
					<div className="heading-2">Login User</div>
					<div className="paragraph">Hello, Friend! Lorem ipsum dolor sit amet, consectetur adipiscing</div>
				</div><br/>
				<form 
					onSubmit={handleFormSubmit} 
					style={{ 
						"margin-left": 25, 
						"margin-right": 25 
					}}
				>
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
					/><br/><br/>
					<Button color="brand-default" size="small" block>Login</Button><br/>
					<div 
						className="caption" 
						style={{ 
							"text-align": "center" 
						}}
					>
						Don't have an account yet? Sign up
					</div>
				</form>
			</div>
			<div style={{ width: "50%", height: "50%" }}>
				<img src="/images/cat.jpg" alt="cat" style={{ height: "100%", width: "100%", "object-fit": "contain" }} />
			</div>
		</div>
	)
}

export default UserLoginPage;