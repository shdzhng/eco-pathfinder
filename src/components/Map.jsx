import React from "react";
import mapStyles from "../styles/mapStyles";
import { useSelector, useDispatch } from "react-redux";
import { updateSelectedLocation } from "../app/features/mapSlice";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { GoogleApiWrapper } from "google-maps-react";
import Search from "./Search";
import { Loader } from "@googlemaps/js-api-loader";

function Map() {
  const { mapData } = useSelector((state) => state.map.value);
  const dispatch = useDispatch();

  const {
    startLocation,
    map,
    destination,
    ecoMode,
    selectedLocation,
    directions,
    totalEmission,
  } = useSelector((state) => state.map).value;

  const onMapClick = React.useCallback((e) => {
    const newLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    dispatch(updateSelectedLocation(newLocation));
  }, []);

  const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    version: "weekly",
    libraries: ["places"],
  }).load();

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
  };

  const containerStyle = {
    width: "100vw",
    height: "100vh",
  };

  const center = {
    lat: 37.776596,
    lng: -122.391953,
  };

  return (
    <div id="navContainer">
      <Search />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        options={options}
        onClick={onMapClick}
      >
        {directions && <DirectionsRenderer directions={directions} />}

        <Marker position={center} />
        <Marker position={selectedLocation} />
      </GoogleMap>
      <ul id="instructionContainer">

        {directions &&
          directions.routes[0].legs[0].steps.map((step, i) => {
            return (
              <li key={i}>
                {step.instructions} ({step.distance.text})
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(Map);
