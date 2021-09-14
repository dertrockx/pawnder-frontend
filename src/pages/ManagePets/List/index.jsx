import React from "react";
import PropTypes from "prop-types";
import styles from "./List.module.css";
import bg from "assets/vector-bg-1.svg";
import { IoAdd } from "react-icons/io5";

const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function Card(props) {
	const { children, onClick = () => {} } = props;
	return (
		<div className={styles.card} onClick={onClick}>
			{children}
		</div>
	);
}

Card.propTypes = {
	children: PropTypes.elementType,
	onClick: PropTypes.func,
};

function ManagePetsList() {
	function handleCreate() {}

	function handleCardClick() {}

	return (
		<div className={styles.container}>
			<img src={bg} className={styles.bg} alt="bg-pets" />
			<h2 className="heading-2">Manage my pets</h2>
			<p className="paragraph" style={{ marginTop: 15, marginBottom: 40 }}>
				Add a new pet or edit / delete the ones you have
			</p>
			<div className={styles.cards}>
				<Card onClick={handleCreate}>
					<IoAdd size={80} />
					<h3 className="heading-3">Add new pet</h3>
				</Card>
				{dummy.map((_, idx) => (
					<Card key={idx} onClick={handleCardClick}>
						<img src="https://picsum.photos/id/237/350/370" alt="" />
						<div className={styles.imgOverlay}></div>
						<div className={styles.content}>
							<h2 className="heading-2">Pet name</h2>
							<p className="caption">Breed</p>
							<p className="caption">Edited last Apr 7, 2021</p>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}

export default ManagePetsList;
