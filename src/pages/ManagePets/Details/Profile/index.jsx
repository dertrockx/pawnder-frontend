import React, { useState } from "react";
import { Input, Select, Textarea } from "@chakra-ui/react";
import Button from "components/Button";
import HR from "components/HR";
import styles from "./Profile.module.css";

function Profile() {
	function handleSave() {
		alert("Saving");
	}

	const [info, setInfo] = useState({
		name: "",
		breed: "",
		animalType: "",
		sex: "",
		weight: "",
		height: "",
		ageY: "",
		ageM: "",
		medicalHistory: "",
		otherInfo: "",
		action: "",
	});

	function handleChange(e) {
		setInfo({ ...info, [e.target.name]: e.target.value });
	}

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
				<img
					src="https://picsum.photos/481/245"
					style={{ objectFit: "cover", width: 481, height: 245 }}
					alt=""
				/>
				<div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
					<Button size="small" color="brand-default">
						Change Picture
					</Button>
					<Button size="small" color="brand-default" variant="outline">
						Remove Picture
					</Button>
				</div>
			</div>
			<h3 className="heading-3">Other Pictures</h3>
			<div className={styles.halfField}>
				<p className="caption">
					Upload your pet’s other pictures. Can be more than one, maximum of 4
					pictures.
				</p>
				<div className={styles.pictures}>
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
					/>
					<img
						src="https://picsum.photos/229/201"
						style={{ objectFit: "cover", width: 229, height: 201 }}
						alt=""
					/>
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
								/>
							</div>
							<div className={styles.field}>
								<p className="paragraph">Animal type</p>
								<Select
									placeholder="Select option"
									focusBorderColor="brand.100"
									name="animalType"
									onChange={handleChange}
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
								/>
							</div>
							<div className={styles.field}>
								<p className="paragraph">Age (years)</p>
								<Input
									type="text"
									placeholder="I am a placeholder"
									focusBorderColor="brand.100"
									name="ageY"
									onChange={handleChange}
								/>
							</div>
							<div className={styles.field}>
								<p className="paragraph">Age (months)</p>
								<Input
									type="text"
									placeholder="I am a placeholder"
									focusBorderColor="brand.100"
									name="ageM"
									onChange={handleChange}
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
								/>
							</div>
							<div className={styles.field}>
								<p className="paragraph">Open for...</p>
								<Select
									placeholder="Select option"
									focusBorderColor="brand.100"
									name="action"
									onChange={handleChange}
								>
									<option value="adopt">Adoption</option>
									<option value="foster">Foster</option>
								</Select>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Button block color="brand-default" onClick={handleSave}>
				Save
			</Button>
		</div>
	);
}

export default Profile;