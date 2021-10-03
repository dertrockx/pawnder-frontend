import React, { useEffect, useState } from "react";
import Button from "components/Button";
import feedPage from "./Feed.module.css";
import { IoHeart, IoClose } from "react-icons/io5";
import axios from "utils/axios";
import { useSelector } from "react-redux";
import LoadingPage from "pages/LoadingPage";

function Feed() {
	const { token, model } = useSelector((s) => s.auth);
	const [loading, setLoading] = useState(true);
	const [pets, setPets] = useState(null);
	const [count, setCount] = useState(1);
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
						`/api/0.1/pet?nearby=true&centerLat=${lat}&centerLong=${long}&distance=${distance}&userId=${userId}`,
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
					<Button variant="outline" color="brand-default" onClick={handleLike}>
						<IoHeart />
						<span>Like</span>
					</Button>
				</div>
			</div>
			<div className={feedPage.pictures}>
				<img
					src="https://static.dw.com/image/42966137_303.jpg"
					alt=""
					className={feedPage.main}
				/>
				<img
					src="https://images.wsj.net/im-25878?width=1280&size=1"
					alt=""
					className={feedPage.other1}
				/>
				<img
					src="https://s.wsj.net/public/resources/images/BN-VM338_3fH28_M_20171009022138.jpg"
					alt=""
					className={feedPage.other2}
				/>
				<img
					src="https://sa.kapamilya.com/absnews/abscbnnews/media/2020/news/01/13/duterte.jpg"
					alt=""
					className={feedPage.other3}
				/>
				<img
					src="https://cdn.i-scmp.com/sites/default/files/d8/images/methode/2020/03/12/a38fed4e-6404-11ea-8e9f-2d196083a37c_image_hires_121929.JPG"
					alt=""
					className={feedPage.other4}
				/>
			</div>
			<h3 className="heading-3">Description</h3>
			<div className={feedPage.description}>
				{/* long-test part */}
				<div className={feedPage.longText}>
					<div className={feedPage.card}>
						<p className="bold-text">Medical history</p>
						<p className="paragraph" style={{ marginTop: 10 }}>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit.
							Voluptatem quia libero impedit qui cumque ipsum iure aperiam
							consectetur consequatur numquam? Ut quisquam vel excepturi
							assumenda ratione accusantium non quo nisi?
						</p>
					</div>
					<div className={feedPage.card}>
						<p className="bold-text">Other info</p>
						<p className="paragraph" style={{ marginTop: 10 }}>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit.
							Voluptatem quia libero impedit qui cumque ipsum iure aperiam
							consectetur consequatur numquam? Ut quisquam vel excepturi
							assumenda ratione accusantium non quo nisi?
						</p>
					</div>
				</div>
				<div>
					<div className={`${feedPage.card} ${feedPage.shortInfo}`}>
						<div className={feedPage.labelText}>
							<p className="bold-text">Animal type</p>
							<p className="paragraph">Dog</p>
						</div>
						<div className={feedPage.labelText}>
							<p className="bold-text">Pet name</p>
							<p className="paragraph">Du30</p>
						</div>
						<div className={feedPage.labelText}>
							<p className="bold-text">Age</p>
							<p className="paragraph">1 year and 6 months</p>
						</div>
						<div className={feedPage.labelText}>
							<p className="bold-text">Weight</p>
							<p className="paragraph">30kg</p>
						</div>
						<div className={feedPage.labelText}>
							<p className="bold-text">Height</p>
							<p className="paragraph">30cm</p>
						</div>
						<div className={feedPage.labelText}>
							<p className="bold-text">Breed</p>
							<p className="paragraph">Chinese tuta</p>
						</div>
						<div className={feedPage.labelText}>
							<p className="bold-text">Sex</p>
							<p className="paragraph">Male</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Feed;
