import React from "react";
import { useSelector } from "react-redux";
import styles from "./style.module.css";
import bg from "assets/bg.png";
import Button from "components/Button";
import history from "utils/history";
import { model } from "constants/EntityType";

function ChooseLogin() {
	const { token, loginType } = useSelector((s) => s.auth);
	React.useEffect(() => {
		if (token)
			history.push(
				loginType === model.INSTITUTION ? "/institution/dashboard" : "/feed"
			);
		// eslint-disable-next-line
	}, [token]);
	function goToInsti() {
		history.push("/institution/login");
	}

	function goToUser() {
		history.push("/user/login");
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
				<h1 className="heading-1">Login</h1>
				<p className="paragraph">Join us now</p>
				<div className={styles.buttons}>
					<Button color="brand-default" onClick={goToInsti}>
						Login as organization
					</Button>
					<Button color="white" variant="outline" onClick={goToUser}>
						Login as user
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ChooseLogin;
