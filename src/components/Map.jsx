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

  const { startLocation, map, destination, selectedLocation, directions } =
    useSelector((state) => state.map).value;

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

  return (
    <div id="navContainer">
      <Search />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={startLocation}
        zoom={15}
        options={options}
        onClick={onMapClick}
      >
        {console.log(origin)}
        {console.log(destination)}
        {console.log(directions)}
        {directions && <DirectionsRenderer directions={directions} />}
        <Marker position={startLocation} />
        <Marker position={destination} />
        <Marker position={selectedLocation} />
      </GoogleMap>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(Map);
