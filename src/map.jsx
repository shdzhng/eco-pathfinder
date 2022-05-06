import React from "react";
import {
  Marker,
  GoogleMap,
  useJsApiLoader,
  panTo,
  Autocomplete,
} from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
  border: "2px solid black",
  marginTop: "2rem",
};

function MyComponent(props) {
  const { mapOnLoad, center, map, pan } = props;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAKdW7KHxurf0MqG2goZ9d1Z01Sefs6Uck",
    libraries: ["places"],
  });

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          zoomControl: false,
        }}
        onLoad={(map) => mapOnLoad(map)}
      >
        <Marker position={center} />

        {/* Child components, such as markers, info windows, etc. */}
      </GoogleMap>
      <button onClick={() => pan({ center })}>Return to Center</button>
    </>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
