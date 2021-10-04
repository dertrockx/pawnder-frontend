import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
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

const getUser = (userId, token) => {
	const request = axios.get(`/api/0.1/user/${userId}`, {
		headers: { Authorization: `Bearer ${token}` },
	});
	return request
		.then((res) => {
			const { user } = res.data;
			console.log(user);
			return user;
		})
		.catch((err) => {
			console.log(err);
			return Promise.reject(err);
		});
};
const getInstitutions = (lat, long, distance = 100, token) => {
	const request = axios.get(
		`/api/0.1/institution?nearby=true&centerLat=${lat}&centerLong=${long}&distance=${distance}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	return request
		.then((res) => {
			const { institutions } = res.data;
			const converted = {};
			Object.assign(
				converted,
				institutions.reduce((a, v) => ({ ...a, [v.id]: v }), {})
			);
			// setInstitutions(converted);
			return converted;
		})
		.catch((err) => {
			console.log(err);
			return Promise.reject(err);
		});
};

function NearbyInstitution({ history }) {
	const { token, model } = useSelector((s) => s.auth);
	const [center, setCenter] = useState({
		lat: 13.961703,
		lng: 122.542972,
	});

	const [route, setRoute] = useState([]);

	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(true);
	const [location, setLocation] = useState(true);

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
		const exec = async () => {
			try {
				const user = await getUser(model.id, token);
				const {
					locationLat: lat,
					locationLong: lng,
					preferredDistance: distance,
				} = user;
				if (lat === null || lng === null || distance === null)
					setLocation(false);
				const institutions = await getInstitutions(lat, lng, distance, token);
				setInstitutions(institutions);
				setCenter({ lat, lng });
				setViewport({ ...viewport, latitude: lat, longitude: lng });
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		if (
			Object.keys(institutions).length === 0 &&
			Object.getPrototypeOf(institutions) === Object.prototype
		) {
			exec();
		}

		// eslint-disable-next-line
	}, [token, model]);

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
		// console.log(json);
		const { routes } = json;

		if (!routes || routes.length === 0) return;
		const data = routes[0];

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
		history.push("/user/settings/information");
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
			{institutions &&
				show &&
				focusedInsti &&
				(institutions[focusedInsti].photoUrl ? (
					<div className={styles.floatingCard}>
						{institutions[focusedInsti].photoUrl && (
							<img
								src={
									institutions[focusedInsti].photoUrl ||
									"https://assets2.rappler.com/2352E1D5E07A40DE92D51BBBB1C9AF0D/img/60D351305CAA415D8053E6143FCC7344/duterte-kiss-skor_copy.jpg"
								}
								alt=""
							/>
						)}

						<div className={styles.imgOverlay}></div>
						<div className={styles.content}>
							<h2 className="heading-2">{institutions[focusedInsti].name}</h2>
							{/* <p className="caption">I am a caption for text only</p> */}
						</div>
					</div>
				) : (
					<div className={styles.floatingCardWithNoImage}>
						<div className={styles.content}>
							<h2 className="heading-2">{institutions[focusedInsti].name}</h2>
							{/* <p className="caption">I am a caption for text only</p> */}
						</div>
					</div>
				))}
		</div>
	);
}

export default NearbyInstitution;
