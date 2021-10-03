import React, { useEffect, useState } from "react";
import Button from "components/Button";
import feedPage from "./Feed.module.css";
import { IoHeart, IoClose } from "react-icons/io5";
import axios from "utils/axios";
import { monthsToYearMonth } from "utils/date";
import { useSelector } from "react-redux";
import LoadingPage from "pages/LoadingPage";
import ReactMarkdown from "react-markdown";
import animalTypeMapper from "utils/animalTypeMapper";

function Feed() {
	const { token, model } = useSelector((s) => s.auth);
	const [loading, setLoading] = useState(true);
	const [pets, setPets] = useState(null);
	// set current pet id
	const [stack, setStack] = useState([]);
	useEffect(() => {
		if (token && !pets) {
			const getPets = async () => {
				try {
					const { id: userId } = model;
					const userRes = await axios.get(`/api/0.1/user/${userId}`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					const { user } = userRes.data;
					const {
						locationLat: lat,
						locationLong: long,
						preferredDistance: distance,
					} = user;
					console.log(userId);
					const res = await axios.get(
						`/api/0.1/pet?${
							lat && long && distance
								? `nearby=true&centerLat=${lat}&centerLong=${long}&distance=${distance}&`
								: ""
						}userId=${userId}`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					const { pets } = res.data;
					let petMap = {};
					pets.forEach((pet) => {
						const { id, ...rest } = pet;
						Object.assign(petMap, { [id]: rest });
					});
					setPets(petMap);
					setStack(Object.keys(petMap).reverse());
					setLoading(false);
				} catch (error) {
					console.log(error);
				}
			};
			getPets();
		}
		// eslint-disable-next-line
	}, [token]);
	function popTop() {
		let stackCopy = [...stack];
		const top = stackCopy.shift();
		setStack(stackCopy);
		return top;
	}
	function handlePass() {
		const top = popTop();
		const { id: userId } = model;
		const payload = {};
		Object.assign(payload, { userId, petId: top });
		axios
			.post(`/api/0.1/ignore`, payload, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => console.log(err));
	}

	function handleLike() {
		const top = popTop();
		const { id: userId } = model;
		const payload = {};
		Object.assign(payload, { userId, petId: top });
		axios
			.post(`/api/0.1/application`, payload, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => console.log(err));
	}
	if (loading) return <LoadingPage />;
	function renderMarkdown(content) {
		// return <ReactMarkdown className="paragraph">{content}</ReactMarkdown>;
		return <ReactMarkdown className="paragraph" children={content} />;
	}
	function renderContent() {
		const pet = pets[stack[0]];
		const { photos, ...info } = pet;
		let mainPhoto = null;
		const otherPhotos = [];
		photos.forEach((photo) => {
			if (photo.type === "main") mainPhoto = photo;
			else otherPhotos.push(photo);
		});

		const [ageY, ageM] = monthsToYearMonth(info.age);

		return (
			<div className={feedPage.container}>
				<h2 className="heading-2">Recommended just for you</h2>
				{/* dynamic content part */}
				<div className={feedPage.header}>
					<div className={feedPage.leftItems}>
						<h4 className="heading-4">Breed</h4>
						<span
							style={{
								height: 3,
								width: 3,
								background: "#000",
								borderRadius: "50%",
								display: "block",
							}}
						/>
						<p className="paragraph">1 year and 6 months</p>
						<span
							style={{
								height: 3,
								width: 3,
								background: "#000",
								borderRadius: "50%",
								display: "block",
							}}
						/>
						<p className="paragraph">Tagkawayan, Quezon</p>
					</div>
					<div className={feedPage.rightItems}>
						<Button variant="outline" color="black" onClick={handlePass}>
							<IoClose />
							<span>Pass</span>
						</Button>
						<Button
							variant="outline"
							color="brand-default"
							onClick={handleLike}
						>
							<IoHeart />
							<span>Like</span>
						</Button>
					</div>
				</div>
				<div className={feedPage.pictures}>
					<img
						src={mainPhoto && mainPhoto.url}
						alt=""
						className={feedPage.main}
					/>
					<div className={feedPage.others}>
						{otherPhotos.length > 0 &&
							otherPhotos.map((photo, idx) => (
								<img src={photo && photo.url} alt="" />
							))}
					</div>
				</div>
				<h3 className="heading-3">Description</h3>
				<div className={feedPage.description}>
					{/* long-test part */}
					<div className={feedPage.longText}>
						<div className={feedPage.card}>
							<p className="bold-text">Medical history</p>
							<div style={{ marginTop: 10 }}>
								{info && renderMarkdown(info.medicalHistory)}
							</div>

							{/* <p className="paragraph" style={{ marginTop: 10 }}>
								
							</p> */}
						</div>
						<div className={feedPage.card}>
							<p className="bold-text">Other info</p>
							<div style={{ marginTop: 10 }}>
								{info && renderMarkdown(info.otherInfo)}
							</div>
						</div>
					</div>
					<div>
						<div className={`${feedPage.card} ${feedPage.shortInfo}`}>
							<div className={feedPage.labelText}>
								<p className="bold-text">Animal type</p>
								<p className="paragraph">
									{info && animalTypeMapper(info.animalType)}
								</p>
							</div>
							<div className={feedPage.labelText}>
								<p className="bold-text">Pet name</p>
								<p className="paragraph">{info && info.name}</p>
							</div>
							<div className={feedPage.labelText}>
								<p className="bold-text">Age</p>
								<p className="paragraph">{`${ageY} years ${
									ageM > 0 ? `${ageM} month${ageM > 1 ? "s" : ""}` : ""
								}`}</p>
							</div>
							<div className={feedPage.labelText}>
								<p className="bold-text">Weight</p>
								<p className="paragraph">{info && `${info.weight}kg`}</p>
							</div>
							<div className={feedPage.labelText}>
								<p className="bold-text">Height</p>
								<p className="paragraph">{info && `${info.height}cm`}</p>
							</div>
							<div className={feedPage.labelText}>
								<p className="bold-text">Breed</p>
								<p className="paragraph">{info && `${info.breed}`}</p>
							</div>
							<div className={feedPage.labelText}>
								<p className="bold-text">Sex</p>
								<p className="paragraph">
									{info && `${info.sex === "f" ? "Female" : "Male"}`}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<>{stack.length > 0 ? renderContent() : <h1>Refresh to see more</h1>}</>
	);
}

export default Feed;
