import FormSignup from "pages/InstitutionSignUpPage/InstitutionSignUpForm";
import styles from "./SignUpPage.module.css";
import React, { useState } from "react";
import design from "assets/dogDesign.png";
import { Link } from "react-router-dom";
import useMediaQuery from "hooks/useMediaQuery";

const InstitutionSignUpPage = () => {
	const [, setIsSubmitted] = useState(false);
	const matches = useMediaQuery("(min-width: 800px)");

	function submitForm() {
		setIsSubmitted(true);
	}
	return (
		<>
			{matches ? (
				<div className={styles.formContainerBig}>
					<div className={styles.formContentLeft}>
						<img
							className={styles.formImg}
							src="https://petpawshub.com/wp-content/uploads/2021/03/domestic-cute-dog-1024x1536.jpg"
							alt="dog"
						/>
						<h1 className={styles.greeting}>Hello World!</h1>
						<p className={styles.greetingCaption}>
							Find your pets a new home today!
						</p>
						<p className="paragraph" id={styles.formInputLogin}>
							Already have an account?{" "}
							<Link to={"/institution/login"} className={styles.link}>
								Login
							</Link>
						</p>
					</div>
					<FormSignup submitForm={submitForm} />
					<img src={design} alt="dog" className={styles.bgDesignBig} />
				</div>
			) : (
				<div className={styles.formContainerSmall}>
					<div className={styles.upper}>
						<img
							className={styles.formImg}
							src="https://petpawshub.com/wp-content/uploads/2021/03/domestic-cute-dog-1024x1536.jpg"
							alt="dog"
						/>
						<h1 className={styles.greeting}>Hello World!</h1>
						<p className={styles.greetingCaption}>
							Find your pets a new home today!
						</p>
						<p className="paragraph" id={styles.formInputLogin}>
							Already have an account?{" "}
							<Link to={"/institution/login"} className={styles.link}>
								Login
							</Link>
						</p>
					</div>
					<div className={styles.lower}>
						<FormSignup submitForm={submitForm} />
						<img src={design} alt="dog" className={styles.bgDesignSmall} />
					</div>
				</div>
			)}
		</>
	);
};

export default InstitutionSignUpPage;
