import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import BasicInput from "components/BasicInput";
import Button from "components/Button";
import BasicLink from "components/BasicLink";
import BasicPasswordInput from "components/BasicPasswordInput/";

import styles from "./UserLogin.module.css"

function UserLoginPage() {
	const history = useHistory();

	const [ email, setEmail ] = useState(null);
	const [ password, setPassword ] = useState(null);
	const [ isLoggedIn, setIsLoggedIn ] = useState(false);
	const [ inputError, setInputError ] = useState(false);
	const [ isPasswordShown, setIsPasswordShown ] = useState(false);

	function handleValueChange(e, valueCb) {
			const newValue = e.target.value;
			valueCb(newValue);
			if(inputError) setInputError(false);
	}
	
	function handleFormSubmit(e) {
			e.preventDefault();

			//send a POST request here to validate inputs and authenticate

			setIsLoggedIn(true);
			console.log(setIsLoggedIn);
			console.log(email, password);
	}

	function togglePassword() {
		setIsPasswordShown(isPasswordShown ? false : true);
	}

	useEffect(() => {
		if(isLoggedIn) {
			
			//clears the fields of the form
			const form = document.getElementsByName("login-form");
			form[0].reset();

			history.replace("/")		//must be redirected to user feed page
		} else {
			// setInputError(true);
		}
	}, [isLoggedIn]);

	return (
		<div className={styles.page}>
			<div 
				className={`
					input-label
					${styles.right}
				`}
			>
				<img src="/images/logo.png" alt="logo" className={styles.logo}/>
				<div className={styles.header}>
					<div className="heading-2">Login User</div>
					<div className="paragraph">Hello, Friend! Lorem ipsum dolor sit amet, consectetur adipiscing</div>
				</div><br/>
				<form 
					name="login-form"
					onSubmit={handleFormSubmit} 
				>
					{inputError && <div className={`${styles.error} ${styles.header}`}>Email and password combination invalid</div>}
					<label>Email</label>
					<BasicInput 
							type="email"
							name="email"
							onChange={(e) => handleValueChange(e, setEmail)}
							placeholder="Email"
							required="true"
							outline={inputError ? "red" : "gray"}
					/><br/>
					Password
					<BasicPasswordInput 
						placeholder="Password" 
						outline={inputError ? "red" : "gray"}
						name="password"
						onChange={(e) => handleValueChange(e, setPassword)}
						required
					/><br />
					<Button onClick={handleFormSubmit} color="brand-default" size="small" block>Login</Button><br/>
					<div 
						className={`
							caption
							${styles.header}
						`} 
					>
						Don't have an account yet? <BasicLink to="/user/signup" label="Sign up"/>
					</div>
				</form>
			</div>
			<div className={styles.left}>
				<img src="/images/cat.png" alt="cat" className={styles.img} />
			</div>
		</div>
	)
}

export default UserLoginPage;