import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Select, Textarea, Spinner } from "@chakra-ui/react";
import Button from "components/Button";
import HR from "components/HR";
import styles from "./Profile.module.css";
import {
	updatePet,
	updatePhoto,
	createPhoto,
	deletePhoto,
} from "redux/actions/petActions";
import EditableImage, { ImagePlaceholder } from "components/EditableImage";

function Profile() {
	const { fetching, petId, pets, updating } = useSelector((s) => s.pet);
	const dispatch = useDispatch();
	const [mainPhoto, setMainPhoto] = useState(null);
	const [otherPhotos, setOtherPhotos] = useState([null, null, null, null]);
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

	useEffect(() => {
		if (pets && petId) {
			console.log("setting info");
			const pet = pets[petId];
			setInfo({
				...pet,
			});
			const { photos } = pet;
			// separate main photo from other photo
			let mainPhoto = null;
			let otherPhotos = [];
			photos.forEach((photo) => {
				if (photo.type !== "main") otherPhotos.push(photo);
				else mainPhoto = photo;
			});
			if (otherPhotos.length <= 4) {
				// append blank stuff
				otherPhotos = [
					...otherPhotos,
					...Array(4 - otherPhotos.length).fill(null),
				];
			}
			setMainPhoto(mainPhoto);
			setOtherPhotos(otherPhotos);
		}

		// eslint-disable-next-line
	}, [pets, petId]);

	function handleChange(e) {
		setInfo({ ...info, [e.target.name]: e.target.value });
	}

	function handleSave() {
		dispatch(updatePet(petId, info));
	}

	function handleUpload(photoId, formData) {
		dispatch(updatePhoto(photoId, formData));
	}

	function handleNewUpload(formData) {
		dispatch(createPhoto(formData));
	}

	function handleDelete(photoId) {
		dispatch(deletePhoto(photoId));
	}

	if (fetching || !petId) return <Spinner />;

	const {
		name,
		breed,
		animalType,
		sex,
		height,
		weight,
		age,
		medicalHistory,
		otherInfo,
		action,
	} = info;

	return (
		<div>
			<h3 className="heading-3">Main picture</h3>
			<p className="caption" style={{ marginTop: 7 }}>
				Upload your pet’s main picture to be displayed on screen
			</p>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					// justifyContent: "space-between",
					gap: 52,
					margin: "30px 0",
				}}
			>
				{mainPhoto && (
					<EditableImage
						photo={mainPhoto}
						loading={updating}
						handleUpdate={handleUpload}
						handleDelete={handleDelete}
						noDelete
					/>
				)}
				<p className="caption">
					*Hover on the picture and click the button to edit it*
				</p>
			</div>
			<h3 className="heading-3">Other Pictures</h3>
			<div className={styles.halfField}>
				<p className="caption">
					Upload your pet’s other pictures. Can be more than one, maximum of 4
					pictures.
				</p>
				<div className={styles.pictures}>
					{otherPhotos.map((otherPhoto, idx) => (
						<React.Fragment key={idx}>
							{otherPhoto ? (
								<EditableImage
									photo={otherPhoto}
									loading={updating}
									handleUpdate={handleUpload}
									handleDelete={handleDelete}
								/>
							) : (
								<ImagePlaceholder
									handleUpload={handleNewUpload}
									loading={updating}
								/>
							)}
						</React.Fragment>
					))}
					{/* <img
						src="https://picsum.photos/229/201"
						style={{ objectFit: "cover", width: 229, height: 201 }}
						alt=""
					/>
					<img
						src="https://picsum.photos/229/201"
						style={{ objectFit: "cover", width: 229, height: 201 }}
						alt=""
					/>
					<img
						src="https://picsum.photos/229/201"
						style={{ objectFit: "cover", width: 229, height: 201 }}
						alt=""
					/>
					<img
						src="https://picsum.photos/229/201"
						style={{ objectFit: "cover", width: 229, height: 201 }}
						alt=""
					/> */}
				</div>
			</div>
			<HR />

			<div style={{ marginTop: 60 }}>
				<h3 className="heading-3">Pet information</h3>
				<div className={styles.halfField}>
					<p className="caption">
						Upload your pet’s basic information to be displayed on their profile
					</p>
					<div>
						<div className={styles.twoFields}>
							<div className={styles.field}>
								<p className="paragraph">Pet Name</p>
								<Input
									type="text"
									placeholder="I am a placeholder"
									focusBorderColor="brand.100"
									name="name"
									onChange={handleChange}
									value={name}
									disabled={updating}
								/>
							</div>
							<div className={styles.field}>
								<p className="paragraph">Breed</p>
								<Input
									type="text"
									placeholder="I am a placeholder"
									focusBorderColor="brand.100"
									name="breed"
									onChange={handleChange}
									value={breed}
									disabled={updating}
								/>
							</div>
							<div className={styles.field}>
								<p className="paragraph">Animal type</p>
								<Select
									placeholder="Select option"
									focusBorderColor="brand.100"
									name="animalType"
									onChange={handleChange}
									value={animalType}
									disabled={updating}
								>
									<option value="dogs">Dog</option>
									<option value="cats">Cat</option>
									<option value="fish and aquariums">Fish and Aquariums</option>
									<option value="reptiles and amphibians">
										Reptile / Amphibian
									</option>
									<option value="exotic pets">Exotic pet</option>

									<option value="rabbits">Rabbit</option>
									<option value="rodents">Rodent</option>
								</Select>
							</div>
							<div className={styles.field}>
								<p className="paragraph">Sex</p>
								<Select
									placeholder="Select option"
									focusBorderColor="brand.100"
									name="sex"
									onChange={handleChange}
									value={sex}
									disabled={updating}
								>
									<option value="m">Male</option>
									<option value="f">Female</option>
								</Select>
							</div>
							<div className={styles.field}>
								<p className="paragraph">Weight (kg)</p>
								<Input
									type="text"
									placeholder="I am a placeholder"
									focusBorderColor="brand.100"
									name="weight"
									onChange={handleChange}
									value={weight}
									disabled={updating}
								/>
							</div>
							<div className={styles.field}>
								<p className="paragraph">Height (kg)</p>
								<Input
									type="text"
									placeholder="I am a placeholder"
									focusBorderColor="brand.100"
									name="height"
									onChange={handleChange}
									value={height}
									disabled={updating}
								/>
							</div>
							<div className={styles.field}>
								<p className="paragraph">Age (in months)</p>
								<Input
									type="text"
									focusBorderColor="brand.100"
									name="age"
									onChange={handleChange}
									value={age}
									disabled={updating}
								/>
							</div>
						</div>
						<div className={styles.oneField} style={{ marginTop: 20 }}>
							<div className={styles.field}>
								<p className="paragraph">Medical History</p>
								<Textarea
									type="text"
									placeholder="I am a placeholder"
									focusBorderColor="brand.100"
									rows={3}
									name="medicalHistory"
									onChange={handleChange}
									value={medicalHistory}
									disabled={updating}
								/>
							</div>
							<div className={styles.field}>
								<p className="paragraph">Other information</p>
								<Textarea
									type="text"
									placeholder="I am a placeholder"
									focusBorderColor="brand.100"
									rows={3}
									name="otherInfo"
									onChange={handleChange}
									value={otherInfo}
									disabled={updating}
								/>
							</div>
							<div className={styles.field}>
								<p className="paragraph">Open for...</p>
								<Select
									placeholder="Select option"
									focusBorderColor="brand.100"
									name="action"
									onChange={handleChange}
									value={action}
									disabled={updating}
								>
									<option value="adopt">Adoption</option>
									<option value="foster">Foster</option>
								</Select>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Button
				block
				color="brand-default"
				disabled={updating}
				onClick={handleSave}
			>
				Save
			</Button>
		</div>
	);
}

export default Profile;