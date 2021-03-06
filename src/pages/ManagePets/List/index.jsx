import React, { useEffect, useState } from "react";
import styles from "./List.module.css";
import bg from "assets/vector-bg-1.svg";
import { IoAdd } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { useDisclosure } from "@chakra-ui/hooks";
import { Spinner } from "@chakra-ui/react";
import LoadingPage from "pages/LoadingPage";
import CreatePetModal from "./CreatePetModel";
import { getPets, createPet } from "redux/actions/petActions";
import Card from "./PetCard";
import history from "utils/history";

function getPetImage(pet) {
	const defaultUrl = "https://picsum.photos/id/237/350/370";
	if (
		!pet ||
		!pet.photos ||
		(typeof pet.photos === "object" && pet.photos.length === 0)
	)
		return defaultUrl;
	const { photos = [] } = pet;
	const mainPhoto = photos.filter((photo) => photo.type === "main");
	if (mainPhoto.length === 0) return defaultUrl;
	return mainPhoto[0].url;
}

function ManagePetsList() {
	const { model = {}, isAuthenticated } = useSelector((s) => s.auth);
	const { pets, fetching, creating } = useSelector((s) => s.pet);
	// const [pets, setPets] = useState(null);
	// const [loading, setLoading] = useState(true);
	const [errors, setErrors] = useState([]);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [file, setFile] = useState(null);
	const [others, setOthers] = useState({});
	const dispatch = useDispatch();

	const [info, setInfo] = useState({
		name: "",
		breed: "",
		animalType: "dogs",
		sex: "m",
		weight: "",
		height: "",
		age: "",
		medicalHistory: "",
		otherInfo: "",
		action: "adopt",
	});

	const clearState = () => {
		setInfo({
			name: "",
			breed: "",
			animalType: "",
			sex: "",
			weight: "",
			height: "",
			age: "",
			medicalHistory: "",
			otherInfo: "",
			action: "",
		});
		setFile(null);
		setOthers(null);
	};

	function handleChange(e) {
		const numNames = ["ageM", "ageY", "height", "width"];
		const filteredErrors = errors.filter((error) => error !== e.target.name);
		setErrors([...filteredErrors]);
		setInfo({
			...info,
			[e.target.name]: numNames.includes(e.target.name)
				? parseFloat(e.target.value)
				: e.target.value,
		});
	}

	function uploadHandler(e) {
		const filteredErrors = errors.filter((error) => error !== e.target.name);
		setErrors([...filteredErrors]);
		if (e.target.name === "main") setFile(e.target.files[0]);
		else setOthers({ ...others, [e.target.name]: e.target.files[0] });
	}

	function handleCreate() {
		onOpen();
	}

	function handleCardClick(petId) {
		history.push(`/institution/manage-pets/${petId}`);
		console.log("Push to history");
	}

	useEffect(() => {
		// if (loading) return;

		if (isAuthenticated) {
			dispatch(getPets());
		}

		// eslint-disable-next-line
	}, [isAuthenticated]);

	function onSave() {
		const formData = new FormData();
		const hasErrors = [];
		Object.keys(info).forEach((key) => {
			const value = info[key];
			if (!value) hasErrors.push(key);
			else formData.append(key, info[key]);
		});
		if (!file) hasErrors.push("main");
		if (!Object.keys(others).includes("other1")) hasErrors.push("other1");
		if (hasErrors.length > 0) {
			setErrors([...hasErrors]);
			return;
		}

		formData.append("mainPhoto", file);
		Object.values(others).forEach((otherPhoto) => {
			formData.append("others", otherPhoto);
		});

		formData.append("institutionId", model.id);

		// formData.append("others", others);

		console.log(...formData);
		dispatch(createPet(formData)).then(() => {
			clearState();
			onClose();
		});
	}

	if (!pets) {
		return <LoadingPage />;
	}

	return (
		<>
			<img src={bg} className={styles.bg} alt="bg-pets" />
			<div className={styles.container}>
				<h2 className="heading-2">Manage my pets</h2>
				<p className="paragraph" style={{ marginTop: 15, marginBottom: 40 }}>
					Add a new pet or edit / delete the ones you have
				</p>
				<div className={styles.cards}>
					<Card onClick={handleCreate}>
						<IoAdd size={80} />
						<h3 className="heading-3">Add new pet</h3>
					</Card>
					{!fetching && pets ? (
						Object.keys(pets).map((id) => {
							const pet = pets[id];
							return (
								<Card key={id} onClick={() => handleCardClick(id)}>
									<img src={getPetImage(pet)} alt="" />
									<div className={styles.imgOverlay}></div>
									<div className={styles.content}>
										<h2 className="heading-2">{pet.name}</h2>
										<p className="caption">{pet.breed}</p>
										<p className="caption">
											Edited last {new Date(pet.updatedAt).toDateString()}
										</p>
									</div>
								</Card>
							);
						})
					) : (
						<Spinner />
					)}
				</div>
			</div>
			{/* <UserInformationModal
					isOpen={isOpen}
					onClose={onClose}
					underReview={true}
				/> */}
			<CreatePetModal
				isOpen={isOpen}
				onClose={onClose}
				info={info}
				handleChange={handleChange}
				onSave={onSave}
				loading={creating}
				file={file}
				uploadHandler={uploadHandler}
				others={others}
				errors={errors}
			/>
		</>
	);
}

export default ManagePetsList;
