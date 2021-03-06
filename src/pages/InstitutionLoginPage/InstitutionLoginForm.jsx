import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import Button from "components/Button";
import logo from "assets/logo.svg";
import showPassword from "assets/showPassword.svg";
import hidePassword from "assets/hidePassword.svg";
import useMediaQuery from "hooks/useMediaQuery";
import { useSelector } from "react-redux";

const FormSignup = ({ handleSubmit, errors, values, handleChange }) => {
	const { loginError } = useSelector((state) => state.auth);

	const matches = useMediaQuery("(min-width: 800px)");
	const [passwordShown, setPasswordShown] = useState(false);

	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	return (
		<div className={styles.formContentLeft}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<img
					src={logo}
					alt="logo"
					className={matches ? styles.logo : styles.logo2}
				/>
				<h1 className="heading-1" id={styles.title}>
					Institution Login
				</h1>
				{errors.invalidInput && (
					<span className="bold-text" id={styles.error}>
						{errors.invalidInput}
					</span>
				)}
				{loginError && (
					<span className="bodl-text" id={styles.error}>
						{loginError}
					</span>
				)}
				<div className={styles.formInputs}>
					<label className="paragraph" id={styles.firstLabel}>
						Email
					</label>
					<input
						className={
							errors.invalidInput ? styles.formInputError : styles.formInput
						}
						type="email"
						name="email"
						placeholder="Enter your email"
						value={values.email}
						onChange={handleChange}
					/>
				</div>
				<div className={styles.formInputs}>
					<label className="paragraph">Password</label>
					<input
						className={
							errors.invalidInput ? styles.formInputError : styles.formInput
						}
						type={passwordShown ? "text" : "password"}
						name="password"
						placeholder="Enter your password"
						value={values.password}
						onChange={handleChange}
					/>
					<img
						className={matches ? styles.eye : styles.eye2}
						onClick={togglePasswordVisiblity}
						src={passwordShown ? hidePassword : showPassword}
						alt="show"
					/>
				</div>
				<Button color="brand-default" id={styles.signUpButton} type="submit">
					Login
				</Button>
			</form>
		</div>
	);
};

export default FormSignup;
