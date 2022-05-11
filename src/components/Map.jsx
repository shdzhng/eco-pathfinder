import React from "react";
import mapStyles from "../styles/mapStyles";
import { useSelector, useDispatch } from "react-redux";
import { updateDirections } from "../app/features/mapSlice";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { GoogleApiWrapper } from "google-maps-react";
import Search from "./Search";
import { Loader } from "@googlemaps/js-api-loader";
import leaf from "../images/leaf.svg";

function Map() {
  const { mapData } = useSelector((state) => state.map.value);
  const dispatch = useDispatch();

  const { startLocation, directions, totalEmission, directionsList } =
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

  const handleOnClick = (direction) => {
    dispatch(updateDirections(direction));
  };

  const reformatTravelModeChara = (travelMode) => {
    return travelMode.charAt(0) + travelMode.substring(1).toLowerCase();
  };

  return (
    <div id="container">
      <div id="sidebarContainer">
        <Search />
        <div id="directionListContainer">
          {directionsList.map((route, i) => {
            let [travelMode, emission, direction] = route;
            const duration = direction.routes[0].legs[0].duration.text;
            travelMode = reformatTravelModeChara(travelMode);
            return (
              <div
                onClick={() => {
                  handleOnClick(direction);
                }}
                key={i}
                className="singleDirectionContainer"
              >
                <h1 className="travelMode">
                  {travelMode}{" "}
                  {emission ? (
                    ""
                  ) : (
                    <img
                      className="sustainability-icon"
                      alt="sustainabile option"
                      src={leaf}
                    />
                  )}
                </h1>

                <p className="small">
                  {" "}
                  (
                  {emission
                    ? emission.toFixed(2) + " pounds of CO2"
                    : "No Emissions!"}
                  )
                </p>

                <p className="travelDuration">Duration: {duration}</p>
                <p className="carpoolAlternative">
                  {travelMode === "DRIVING"
                    ? `${(emission * 0.7).toFixed(
                        2
                      )}  pounds of CO2 if you carpool`
                    : ""}
                </p>
              </div>
            );
          })}
        </div>
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
