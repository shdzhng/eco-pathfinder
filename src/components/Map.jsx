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
      >
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                strokeColor: "#ff00bf",
              },
            }}
          />
        )}

        <Marker position={center} />
      </GoogleMap>

      <div id="directionListContainer">
        {directionsList.map((route, i) => {
          let [travelMode, emission, direction] = route;
          const duration = direction.routes[0].legs[0].duration.text;
          emission = emission === 0 ? 0 : emission;
          return (
            <div key={i} id="singleDirectionContainer">
              <h3 className="travelMode">{travelMode}</h3>
              <p className="travelDuration">Duration: {duration}</p>
              <p className="travelEmission">
                {emission
                  ? emission.toFixed(2) + " pounds of CO2"
                  : "No Emissions!"}
              </p>
              <p className="carpoolAlternative">
                {travelMode === "DRIVING"
                  ? `${(emission * 0.7).toFixed(2)}  pounds of CO2 with Carpool`
                  : ""}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(Map);
