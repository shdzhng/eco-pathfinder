import React from "react";
import mapStyles from "../styles/mapStyles";
import { useSelector, useDispatch } from "react-redux";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { GoogleApiWrapper } from "google-maps-react";
import Search from "./SearchBar";
import { Loader } from "@googlemaps/js-api-loader";
import DirectionsList from "./DirectionsList";

function Map() {
  const dispatch = useDispatch();

  const { startLocation, directions } = useSelector((state) => state.map).value;

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
    <div id="container">
      <div id="sidebarContainer">
        <Search />
        <DirectionsList />
      </div>
      <GoogleMap
        id="mapContainer"
        mapContainerStyle={containerStyle}
        center={startLocation}
        zoom={15}
        options={options}
      >
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                strokeColor: "#ff00bf",
              },
              preserveViewport: true,
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(Map);
