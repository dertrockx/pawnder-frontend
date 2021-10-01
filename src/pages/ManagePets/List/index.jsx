import React, { useEffect, useState } from "react";
import styles from "./List.module.css";
import bg from "assets/vector-bg-1.svg";
import { IoAdd } from "react-icons/io5";
import axios from "utils/axios";
import { useSelector } from "react-redux";
import { useDisclosure } from "@chakra-ui/hooks";
import LoadingPage from "pages/LoadingPage";
import CreatePetModal from "./CreatePetModel";
import Card from "./PetCard";

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
	const {
		token = {},
		model = {},
		isAuthenticated,
	} = useSelector((s) => s.auth);
	const [pets, setPets] = useState([]);
	const [loading, setLoading] = useState(true);
	const [pending, setPending] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [file, setFile] = useState(null);
	const [others, setOthers] = useState({});

	const [info, setInfo] = useState({
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
		setInfo({
			...info,
			[e.target.name]: numNames.includes(e.target.name)
				? parseFloat(e.target.value)
				: e.target.value,
		});
	}

	function uploadHandler(e) {
		if (e.target.name === "main") setFile(e.target.files[0]);
		else setOthers({ ...others, [e.target.name]: e.target.files[0] });
	}

	function handleCreate() {
		onOpen();
	}

	function handleCardClick() {}

	useEffect(() => {
		// if (loading) return;
		if (isAuthenticated) {
			axios
				.get(`/api/0.1/pet?institutionId=${model.id || ""}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					const { pets } = res.data;
					setPets(pets);
				})
				.catch((err) => console.log(err));
			setLoading(false);
		}

		// eslint-disable-next-line
	}, [isAuthenticated]);

	function onSave() {
		setPending(true);
		const formData = new FormData();
		Object.keys(info).forEach((key) => {
			formData.append(key, info[key]);
		});
		formData.append("institutionId", model.id);
		formData.append("mainPhoto", file);
		Object.values(others).forEach((otherPhoto) => {
			formData.append("others", otherPhoto);
		});
		// formData.append("others", others);

		console.log(...formData);
		axios
			.request({
				method: "POST",
				url: "api/0.1/pet",
				data: formData,
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				const { pet, images } = res.data;
				setPets([{ ...pet, photos: images }, ...pets]);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setPending(false);
				onClose();
				clearState();
			});
	}

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<>
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
					{pets &&
						pets.length > 0 &&
						pets.map((pet) => (
							<Card key={pet.id} onClick={handleCardClick}>
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
						))}
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
				loading={pending}
				file={file}
				uploadHandler={uploadHandler}
				others={others}
			/>
		</>
	);
}

export default ManagePetsList;
