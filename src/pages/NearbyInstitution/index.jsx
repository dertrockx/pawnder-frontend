import React, { useState, useEffect, useMemo } from "react";
import ReactMapGL from "react-map-gl";
import Pin from "./Pin";
import PolylineOverlay from "./PolylineOverlay";
import Button from "components/Button";
import axios from "utils/axios";

import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./NearbyInstitution.module.css";

// TODO: move access token to .env file
// const accessToken =
// 	"pk.eyJ1IjoiZGVydHJvY2t4IiwiYSI6ImNrMXcwZHB0bjBmb2gzY216ODA0NDZ3MWsifQ.IoDpTejvyHpWvvj_cjjRlw";
const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function NearbyInstitution({ history }) {
	const [center, setCenter] = useState({
		lat: 13.961703,
		lng: 122.542972,
	});

	const [route, setRoute] = useState([]);

	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(true);
	const [location] = useState(true);

	const [viewport, setViewport] = useState({
		width: 400,
		height: 400,
		latitude: 13.961703,
		longitude: 122.542972,
		zoom: 14,
	});
	const [institutions, setInstitutions] = useState({});
	const [focusedInsti, setFocusedInsti] = useState(null);
	/*
  {
    photoUrl: "",
    header: "Card header",
    caption: "Card caption"
  } 
  */

	useEffect(() => {
		const getInstitutions = async (lat, long, distance = 100) => {
			try {
				const res = await axios.get(
					`/api/0.1/institution?nearby=true&centerLat=${lat}&centerLong=${long}&distance=${distance}`
				);
				const { institutions } = res.data;
				const converted = {};
				Object.assign(
					converted,
					institutions.reduce((a, v) => ({ ...a, [v.id]: v }), {})
				);
				setInstitutions(converted);
			} catch (err) {
				console.log(err);
			}
		};

		navigator.geolocation.getCurrentPosition((position) => {
			const { latitude, longitude } = position.coords;

			const parsedLat = parseFloat(latitude.toFixed(6));
			const parsedLng = parseFloat(longitude.toFixed(6));
			getInstitutions(parsedLat, parsedLng);
			console.log(parsedLat, parsedLng);

			setCenter({
				lat: parsedLat,
				lng: parsedLng,
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
			Object.keys(institutions).map((id) => {
				const { locationLat: lat, locationLong: lng } = institutions[id];
				return (
					<Pin
						key={id}
						longitude={lng}
						latitude={lat}
						onClick={() => handleMarkerClick(lng, lat, id)}
					/>
				);
			}),
		// eslint-disable-next-line
		[institutions]
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
		setFocusedInsti(null);
	}

	async function handleMarkerClick(lng, lat, id) {
		const route = await getRoute([center.lng, center.lat], [lng, lat]);

		setRoute(route);
		setShow(true);
		setFocusedInsti(id);
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
			{show && focusedInsti && (
				<div className={styles.floatingCard}>
					<img
						src={
							institutions[focusedInsti].photoUrl ||
							"https://assets2.rappler.com/2352E1D5E07A40DE92D51BBBB1C9AF0D/img/60D351305CAA415D8053E6143FCC7344/duterte-kiss-skor_copy.jpg"
						}
						alt=""
					/>
					<div className={styles.imgOverlay}></div>
					<div className={styles.content}>
						<h2 className="heading-2">{institutions[focusedInsti].name}</h2>
						<p className="caption">I am a caption</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default NearbyInstitution;
