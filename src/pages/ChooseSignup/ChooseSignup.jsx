import React from "react";
import styles from "./style.module.css";
import bg from "assets/bg2.png";
import Button from "components/Button";
import history from "utils/history";

function ChooseSignup() {
	function goToInsti() {
		history.push("/institution/signup");
	}

	function goToUser() {
		history.push("/user/signup");
	}
	return (
		<div
			className={styles.container}
			style={{
				background: `url(${bg}) no-repeat`,
				backgroundSize: "cover",
			}}
		>
			<div className={styles.content}>
				<h1 className="heading-1">Adoption made easier</h1>
				<p className="paragraph">Join us now</p>
				<div className={styles.buttons}>
					<Button color="brand-default" onClick={goToInsti}>
						Sign up as organization
					</Button>
					<Button color="white" variant="outline" onClick={goToUser}>
						Sign up as user
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ChooseSignup;
