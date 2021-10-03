import React, { useState } from "react";
import styles from "./SignUpPage.module.css";
import Button from "components/Button";
import useSignUp from "./useSignUp";
import validate from "./validateSignUpInfo";
import logo from "assets/logo.svg";
import showPassword from "assets/showPassword.svg";
import hidePassword from "assets/hidePassword.svg";
import useMediaQuery from "hooks/useMediaQuery";
import LoadingPage from "pages/LoadingPage";

const FormSignup = ({ submitForm }) => {
	const { handleChange, values, handleSubmit, errors, isSubmitting } = useSignUp(
		submitForm,
		validate
	);
	const matches = useMediaQuery("(min-width: 800px)");
	const [passwordShown, setPasswordShown] = useState(false);
	const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	const toggleConfirmPasswordVisiblity = () => {
		setConfirmPasswordShown(confirmPasswordShown ? false : true);
	};

	return (
		<div className={styles.formContentRight}>
			<form className={styles.form} onSubmit={handleSubmit}>
			{isSubmitting ? <LoadingPage /> : 
			<> 
				<img
					src={logo}
					alt="logo"
					className={matches ? styles.logo : styles.logo2}
				/>
				<h1 className="heading-1">Create an account</h1>
				<p className="caption">Setup a new institution account</p>
				<div className={styles.formInputs}>
					<label className="paragraph" id={styles.firstLabel}>
						Email
						{errors.email && (
							<span className="bold-text" id={styles.error}>
								{errors.email}
							</span>
						)}
						{errors.emailExist && !errors.email && (
							<span className="bold-text" id={styles.error}>
								{errors.emailExist}
							</span>
						)}
					</label>
					<input
						className={errors.email || errors.emailExist ? styles.formInputError : styles.formInput}
						type="email"
						name="email"
						placeholder="Enter your email"
						value={values.email}
						onChange={handleChange}
					/>
				</div>
				<div className={styles.formInputs2}>
					<label className="paragraph">
						Password
						{errors.password && (
							<span className="bold-text" id={styles.error}>
								{errors.password}
							</span>
						)}
					</label>
					<input
						className={
							errors.password ? styles.formInputError : styles.formInput
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
						alt=""
					/>
				</div>
				<div className={styles.formInputs}>
					<label className="paragraph">
						Confirm Password
						{errors.password2 && (
							<span className="bold-text" id={styles.error}>
								{errors.password2}
							</span>
						)}
					</label>
					<input
						className={
							errors.password2 ? styles.formInputError : styles.formInput
						}
						type={confirmPasswordShown ? "text" : "password"}
						name="password2"
						placeholder="Confirm your password"
						value={values.password2}
						onChange={handleChange}
					/>
					<img
						className={matches ? styles.eye : styles.eye2}
						onClick={toggleConfirmPasswordVisiblity}
						src={confirmPasswordShown ? hidePassword : showPassword}
						alt="show"
					/>
				</div>
				<Button color="brand-default" id={styles.signUpButton} type="submit">
					Sign Up
				</Button>
			</>
			}
			</form>
		</div>
	);
};

export default FormSignup;
