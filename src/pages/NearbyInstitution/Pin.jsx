import React from "react";
import PropTypes from "prop-types";
import { Marker } from "react-map-gl";
import blueMarker from "assets/mapbox-marker-icon-blue.svg";
import redMarker from "assets/mapbox-marker-icon-red.svg";
function Pin(props) {
	const { longitude, latitude, onClick = () => {}, color } = props;
	return (
		<Marker
			longitude={longitude}
			latitude={latitude}
			onClick={onClick}
			// captureClick={false}
		>
			<img src={color === "red" ? redMarker : blueMarker} alt="blue marker" />
		</Marker>
	);
}

Pin.propTypes = {
	longitude: PropTypes.number.isRequired,
	latitude: PropTypes.number.isRequired,
	onClick: PropTypes.func,
	color: PropTypes.oneOf(["blue", "red"]),
};

export default Pin;
