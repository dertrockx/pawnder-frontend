import { useState } from "react";
import history from "utils/history";
import BasicInput from "components/BasicInput";
import Button from "components/Button";
import BasicLink from "components/BasicLink";
import styles from "./UserSignup.module.css";
// import { IoConstructOutline } from "react-icons/io5";

function UserSignupPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [emailAlreadyExistsError, setEmailAlreadyExistsError] = useState(false);
	const [isRequired, setIsRequired] = useState(false);

	function handleValueChange(e, valueCb) {
		const newValue = e.target.value;
		valueCb(newValue);
		if (isRequired) setIsRequired(false);
		if (emailError && e.target.name === "email") setEmailError(false);
		if (emailAlreadyExistsError) setEmailAlreadyExistsError(false);
		if (
			passwordError &&
			(e.target.name === "password" || e.target.name === "confirmPassword")
		)
			setPasswordError(false);
	}

	function handleFormSubmit(e) {
		e.preventDefault();

		if (
			!/\S+@\S+\.\S+/.test(email) ||
			password !== confirmPassword ||
			password === "" ||
			confirmPassword === "" ||
			email === ""
		) {
			if (password !== confirmPassword) setPasswordError(true);
			if (!/\S+@\S+\.\S+/.test(email)) setEmailError(true);
			if (password === "" || confirmPassword === "" || email === "")
				setIsRequired(true);
		} else {
			//sends a POST request for signing up
			//if success, user must be redirected to /user/onboarding
			//else, error message must be displayed
			//if email already exists, setEmailAlreadyExistsError(true);

			fetch(
				`${
					process.env.REACT_APP_BACKEND_URL || "http://localhost:8081"
				}/api/0.1/user`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: email,
						password: password,
					}),
				}
			)
				.then((response) => {
					if (response.status === 201) {
						//clears the fields of the form
						const form = document.getElementsByName("signup-form");
						form[0].reset();

						//redirect somewhere
						history.replace("/user/login");
					}
					return response.json();
				})
				.then((data) => {
					if (data.code) {
						setEmailAlreadyExistsError(true);
					}
				});
		}
	}

	return (
		<div className={styles.page}>
			<div className={styles.right}>
				<img src="/images/dog.png" alt="dog" className={styles.img} />
			</div>

			<div
				className={`
					input-label
					${styles.left}
				`}
			>
				<img src="/images/logo.png" alt="logo" className={styles.logo} />
				<div className={styles.header}>
					<div className="heading-2">Create an account</div>
					<div className="paragraph">
						Welcome! Enter your personal details and give a home to these
						adorable pets.
					</div>
				</div>
				<form
					name="signup-form"
					onSubmit={handleFormSubmit}
					className={styles.form}
				>
					{isRequired ? (
						<div className={`${styles.error} ${styles.rightAlign}`}>
							All fields required
						</div>
					) : (
						<br />
					)}
					<label>
						{emailAlreadyExistsError && (
							<div className={styles.error}>Email address already exists!</div>
						)}
					</label>
					<div className={styles.row}>
						<label className={`${styles.column} ${styles.colleft}`}>
							Email
						</label>
						{emailError && (
							<div
								className={`${styles.error} ${styles.column} ${styles.colright}`}
							>
								Incorrect email format!
							</div>
						)}
					</div>
					<BasicInput
						type="email"
						name="email"
						onChange={(e) => handleValueChange(e, setEmail)}
						placeholder="Email"
						required="true"
						outline={emailError || emailAlreadyExistsError ? "red" : "gray"}
					/>
					<br />
					<label className={`${styles.column} ${styles.colleft}`}>
						Password{" "}
					</label>
					{passwordError && (
						<div
							className={`${styles.error} ${styles.column} ${styles.colright}`}
						>
							Password does not match!
						</div>
					)}
					<BasicInput
						type="password"
						name="password"
						onChange={(e) => handleValueChange(e, setPassword)}
						placeholder="Password"
						outline={passwordError ? "red" : "gray"}
						required="true"
					/>
					<br />
					<label>Confirm Password</label>
					<BasicInput
						type="password"
						name="confirmPassword"
						onChange={(e) => handleValueChange(e, setConfirmPassword)}
						placeholder="Confirm Password"
						outline={passwordError ? "red" : "gray"}
						required="true"
					/>
					<br />
					<br />
					<Button
						onClick={handleFormSubmit}
						color="brand-default"
						size="small"
						block
					>
						Signup
					</Button>
					<br />
					<div
						className={`
							caption
							${styles.header}
						`}
					>
						Already have an account?{" "}
						<BasicLink to="/user/login" label="Log in" />
					</div>
				</form>
			</div>
		</div>
	);
}

export default UserSignupPage;
