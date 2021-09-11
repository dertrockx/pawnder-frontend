import React from "react";
import Button from "components/Button";
import HR from "components/HR";
import Dropdown from "components/Dropdown";
import styles from "./Profile.module.css";
import Input from "./Input";

function Profile() {
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
					<div className={styles.fields}>
						<div className={styles.field}>
							<p className="paragraph">Pet Name</p>
							<Input type="text" placeholder="I am a placeholder" />
						</div>
						<div className={styles.field}>
							<p className="paragraph">Breed</p>
							<Input type="text" placeholder="I am a placeholder" />
						</div>
						<div className={styles.field}>
							<p className="paragraph">Animal Type</p>
							<Dropdown
								renderOptions={() => (
									<>
										<option value="" disabled selected hidden>
											Please Choose...
										</option>
										<option value="dogs">Dog</option>
										<option value="cats">Cat</option>
										<option value="fish and aquariums">
											Reptile / Amphibian
										</option>
										<option value="reptiles and amphibians">
											Reptile / Amphibian
										</option>
										<option value="exotic pets">Reptile / Amphibian</option>
										<option value="rabbits">Reptile / Amphibian</option>
										<option value="rodents">Reptile / Amphibian</option>
									</>
								)}
							/>
						</div>
						<div className={styles.field}>
							<p className="paragraph">Pet Name</p>
							<Input type="text" placeholder="I am a placeholder" />
						</div>
						<div className={styles.field}>
							<p className="paragraph">Pet Name</p>
							<Input type="text" placeholder="I am a placeholder" />
						</div>
						<div className={styles.field}>
							<p className="paragraph">Pet Name</p>
							<Input type="text" placeholder="I am a placeholder" />
						</div>
						<div className={styles.field}>
							<p className="paragraph">Pet Name</p>
							<Input type="text" placeholder="I am a placeholder" />
						</div>
						<div className={styles.field}>
							<p className="paragraph">Pet Name</p>
							<Input type="text" placeholder="I am a placeholder" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
