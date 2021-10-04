import { useState, useEffect } from "react";
import history from "utils/history";
import { useSelector, useDispatch } from "react-redux";

import { login } from "redux/actions/authActions";

import BasicInput from "components/BasicInput";
import Button from "components/Button";
import BasicLink from "components/BasicLink";
import BasicPasswordInput from "components/BasicPasswordInput/";

import styles from "./UserLogin.module.css";

function UserLoginPage() {
	const loginPending = useSelector((s) => s.auth.loginPending);
	const loginError = useSelector((s) => s.auth.loginError);
	const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
	const model = useSelector((s) => s.auth.model);

	const dispatch = useDispatch();

	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [isRequired, setIsRequired] = useState(false);

	function handleValueChange(e, valueCb) {
		const newValue = e.target.value;
		valueCb(newValue);
		setIsRequired(false);
	}

	function handleFormSubmit(e) {
		e.preventDefault();

		//send a POST request here to validate inputs and authenticate

		if (email && password) {
			dispatch(login(email, password, "USER"));
		} else {
			setIsRequired(true);
		}
	}

	useEffect(() => {
		if (isAuthenticated) {
			//clears the fields of the form
			const form = document.getElementsByName("login-form");
			form[0].reset();
			// console.log(`model : ${model.values()}`)
			// console.log(`model.id : ${Object.values(model)[0]}`)

			// const modelFirstName = Object.values(model)[4];
			// if (modelFirstName === null) history.replace("/user/onboarding");
			// else history.replace("/feed");
		} else {
			// may server error or wrong credentials
			// setInputError(true);
		}
		// eslint-disable-next-line
	}, [isAuthenticated]);

	return (
		<div className={styles.page}>
			<div
				className={`
					input-label
					${styles.right}
				`}
			>
				<img src="/images/logo.png" alt="logo" className={styles.logo} />
				<div className={styles.header}>
					<div className="heading-2">Login User</div>
					<div className="paragraph">
						Hello, Friend! Are you looking for comfort? Adopt or foster now!
					</div>
				</div>
				<br />
				<form name="login-form" onSubmit={handleFormSubmit}>
					{isRequired ? (
						<div className={styles.error}>All fields required</div>
					) : (
						<br />
					)}
					{loginError && (
						<div className={`${styles.error} ${styles.header}`}>
							Email and password combination invalid
						</div>
					)}
					<label>Email</label>
					<BasicInput
						type="email"
						name="email"
						onChange={(e) => handleValueChange(e, setEmail)}
						placeholder="Email"
						required="true"
					/>
					<br />
					Password
					<BasicPasswordInput
						placeholder="Password"
						name="password"
						onChange={(e) => handleValueChange(e, setPassword)}
						required
					/>
					<br />
					<Button
						onClick={handleFormSubmit}
						color="brand-default"
						size="small"
						disabled={loginPending}
						block
					>
						Login
					</Button>
					<br />
					<div
						className={`
							caption
							${styles.header}
						`}
					>
						Don't have an account yet?{" "}
						<BasicLink to="/user/signup" label="Sign up" />
					</div>
				</form>
			</div>
			<div className={styles.left}>
				<img src="/images/cat.png" alt="cat" className={styles.img} />
			</div>
		</div>
	);
}

export default UserLoginPage;
