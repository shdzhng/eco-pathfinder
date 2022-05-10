import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateStartLocation,
  updateEndLocation,
} from "./app/features/mapSlice";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { GoogleApiWrapper, google } from "google-maps-react";
import axios from "axios";

const containerStyle = {
  width: "400px",
  height: "400px",
  border: "2px solid black",
  marginTop: "2rem",
};

function Map() {
  const mapData = useSelector((state) => state.map);
  const dispatch = useDispatch();
  const { startLocation, map, endLocation } = useSelector(
    (state) => state.map
  ).value;
  let latestOrigin = "";
  let latestDestination = "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    latestOrigin = e.target.startingPoint.value;
    latestDestination = e.target.destination.value;
    e.target.destination.value = "";
    e.target.startingPoint.value = "";

    const findLatLng = async (address, location) => {
      const result = await getGeocode({ address });
      const { lat, lng } = await getLatLng(result[0]);

      if ((location = "origin")) {
        dispatch(updateStartLocation({ lat, lng }));
      } else {
        dispatch(updateEndLocation({ lat, lng }));
      }

      // dispatch(updateEndLocation(destination));
      return lat + "," + lng;
    };

    const origin = await findLatLng(latestOrigin, "origin");
    const destination = await findLatLng(latestDestination, "destination");

    if (origin && destination) {
      getDirections(origin, destination);
    } else {
      alert("cannot have empty input");
    }
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAKdW7KHxurf0MqG2goZ9d1Z01Sefs6Uck",
    libraries: "places",
  });

  const getDirections = async (origin, destination) => {
    const response = await axios
      .post(
        `/maps/api/directions/json?key=AIzaSyAKdW7KHxurf0MqG2goZ9d1Z01Sefs6Uck&origin=${origin}&destination=${destination}`
      )
      .then((response) => {
        console.log(response.data);
        console.log(mapData);
      });

    // const directionService = new google.maps.DirectionsService();
    //     const result = await directionService(request);
  };

  if (!isLoaded) {
    return <h1> Map is Loading, thank you for your patience</h1>;
  }

  return (
    <>
      <div>
        <form
          action=""
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <label htmlFor="startingPoint">Starting Point:{latestOrigin}</label>
          <Autocomplete>
            <input type="text" id="startingPoint" name="startingPoint"></input>
          </Autocomplete>
          <br />
          <label htmlFor="destination">Destination:</label>
          <Autocomplete>
            <input type="text" id="destination" name="destination"></input>
          </Autocomplete>
          <br />
          <button type="submit">Show me de wey</button>
        </form>
      </div>
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
      >
        <Marker position={startLocation} />
      </GoogleMap>
    </>
  );
}

// export default React.memo(Map);
export default GoogleApiWrapper({
  apiKey: "AIzaSyAKdW7KHxurf0MqG2goZ9d1Z01Sefs6Uck",
})(Map);
