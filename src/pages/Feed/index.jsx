import React from "react";
import Button from "components/Button";
import feedPage from "./Feed.module.css";
import { IoHeart, IoClose } from "react-icons/io5";

function Feed() {
	function handlePass() {
		alert("Pass");
	}

	function handleLike() {
		alert("Like");
	}

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
