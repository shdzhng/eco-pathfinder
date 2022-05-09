import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateStartLocation,
  updateEndLocation,
} from "./app/features/mapSlice";
import {
  Marker,
  GoogleMap,
  useJsApiLoader,
  panTo,
  Autocomplete,
} from "@react-google-maps/api";

import { GoogleApiWrapper } from "google-maps-react";

const containerStyle = {
  width: "400px",
  height: "400px",
  border: "2px solid black",
  marginTop: "2rem",
};

function Map() {
  const { startLocation, map, endLocation } = useSelector(
    (state) => state.map
  ).value;
  const mapData = useSelector((state) => state.map);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAKdW7KHxurf0MqG2goZ9d1Z01Sefs6Uck",
  });

  if (!isLoaded) {
    return <h1> Map is Loading, thank you for your patience</h1>;
  }

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={startLocation}
        zoom={15}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          zoomControl: false,
        }}
        // onLoad={useDispatch(renderMap(map)}
      >
        <Marker position={startLocation} />
      </GoogleMap>
      {/* <button onClick={() => pan({ startLocation })}>Return to Center</button> */}
    </>
  );
}

// export default React.memo(Map);
export default GoogleApiWrapper({
  apiKey: "AIzaSyAKdW7KHxurf0MqG2goZ9d1Z01Sefs6Uck",
})(Map);
