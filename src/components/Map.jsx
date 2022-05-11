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

  const { selectedLocation, directions, totalEmission, directionsList } =
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

      <div id="directionListContainer">
        {directionsList.map((route) => {
          let [travelMode, emission, direction] = route;
          const duration = direction.routes[0].legs[0].duration.text;
          emission = emission === 0 ? 0 : emission;
          return (
            <>
              <h3>{travelMode}</h3>
              <p>Duration: {duration}</p>
              <p>
                {emission ? emission.toFixed(2) + " pounds of CO2" : "ZERO!"}
              </p>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(Map);
