import React, { useState, useEffect, useMemo } from "react";
import ReactMapGL from "react-map-gl";
import Pin from "./Pin";
import PolylineOverlay from "./PolylineOverlay";
import Button from "components/Button";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./NearbyInstitution.module.css";

// TODO: move access token to .env file
const accessToken =
	"pk.eyJ1IjoiZGVydHJvY2t4IiwiYSI6ImNrMXcwZHB0bjBmb2gzY216ODA0NDZ3MWsifQ.IoDpTejvyHpWvvj_cjjRlw";

const randomPoints = [
	[122.539, 13.9623],
	[122.5453, 13.9572],
	[122.5396, 13.9685],
	[122.5318, 13.9697],
	[122.5423, 13.9775],
];

const cardInfos = [
	{
		photoUrl:
			"https://media.philstar.com/photos/2019/05/10/panelo-meme_2019-05-10_10-13-16.jpg",
		header: "Panelo's House of Mysteries",
		caption: "600m away from you",
	},
	{
		photoUrl:
			"https://d1mf53gmgg2cqd.cloudfront.net/wp-content/uploads/2021/08/SEC.-DUQUE-1.jpg",
		header: "Duque Destruction Dungeon",
		caption: "700m away from you",
	},
	{
		photoUrl:
			"https://assets2.rappler.com/2352E1D5E07A40DE92D51BBBB1C9AF0D/img/60D351305CAA415D8053E6143FCC7344/duterte-kiss-skor_copy.jpg",
		header: "Du30's Penthouse",
		caption: "60m away from you",
	},
	{
		photoUrl:
			"https://media.philstar.com/photos/2019/05/10/panelo-meme_2019-05-10_10-13-16.jpg",
		header: "Panelo's House of Mysteries",
		caption: "600m away from you",
	},
	{
		photoUrl:
			"https://media.philstar.com/photos/2019/05/10/panelo-meme_2019-05-10_10-13-16.jpg",
		header: "Panelo's House of Mysteries",
		caption: "600m away from you",
	},
];

function NearbyInstitution({ history }) {
	const [center, setCenter] = useState({
		lat: 13.961703,
		lng: 122.542972,
	});

	const [route, setRoute] = useState([]);

	const [show, setShow] = useState(false);

	// TODO: change the ff states kapag na-setup na ang redux
	const [loading, setLoading] = useState(true);
	const [location, setLocation] = useState(true);

	const [viewport, setViewport] = useState({
		width: 400,
		height: 400,
		latitude: 13.961703,
		longitude: 122.542972,
		zoom: 14,
	});
	/*
  {
    photoUrl: "",
    header: "Card header",
    caption: "Card caption"
  } 
  */
	const [cardInfo, setCardInfo] = useState(null);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			const { latitude, longitude } = position.coords;
			setCenter({
				lat: parseFloat(latitude.toFixed(4)),
				lng: parseFloat(longitude.toFixed(4)),
			});

			setViewport({
				...viewport,
				latitude,
				longitude,
			});
		});

		setTimeout(() => setLoading(false), 5000);

		// eslint-disable-next-line
	}, []);

	const pins = useMemo(
		() =>
			randomPoints.map(([lng, lat], idx) => (
				<Pin
					key={idx}
					longitude={lng}
					latitude={lat}
					onClick={() => handleMarkerClick(lng, lat, idx)}
				/>
			)),
		// eslint-disable-next-line
		[]
	);

	async function getRoute(start, end) {
		const query = await fetch(
			`https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${accessToken}`,
			{ method: "GET" }
		);

		const json = await query.json();
		const data = json.routes[0];

		const route = data.geometry.coordinates;
		return route;
	}

	function handleMapClick(evt) {
		setRoute([]);
		setShow(false);
		setCardInfo(null);
	}

	async function handleMarkerClick(lng, lat, idx) {
		const route = await getRoute([center.lng, center.lat], [lng, lat]);

		setRoute(route);
		setShow(true);
		setCardInfo(cardInfos[idx]);
	}

	function goToSettings() {
		history.push("/settings");
	}
	function Placeholder({ children }) {
		return (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					height: "calc(100vh - 83px)",
					gap: 20,
				}}
			>
				{children}
			</div>
		);
	}

	// handle future case where user did not set his location
	if (!location)
		return (
			<Placeholder>
				<h2 className="heading-2">
					Please update your location in your settings
				</h2>
				<Button color="brand-default" onClick={goToSettings}>
					Go to settings
				</Button>
			</Placeholder>
		);

	// handle future case when web app is fetching some data from the back-end
	if (loading)
		return (
			<Placeholder>
				<h1 className="heading-1">Loading</h1>
			</Placeholder>
		);

	return (
		<div className={styles.mapContainer}>
			<ReactMapGL
				{...viewport}
				mapStyle="mapbox://styles/mapbox/dark-v9"
				width="100%"
				height="100%"
				onViewportChange={(nextViewport) => {
					setViewport(nextViewport);
				}}
				mapboxApiAccessToken={accessToken}
				onClick={handleMapClick}
			>
				<Pin longitude={center.lng} latitude={center.lat} color="red" />
				{route && route.length && <PolylineOverlay points={route} />}

				{pins}
			</ReactMapGL>
			{show && cardInfo && (
				<div className={styles.floatingCard}>
					<img src={cardInfo.photoUrl} alt="" />
					<div className={styles.imgOverlay}></div>
					<div className={styles.content}>
						<h2 className="heading-2">{cardInfo.header}</h2>
						<p className="caption">{cardInfo.caption}</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default NearbyInstitution;
