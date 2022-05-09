import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateStartLocation,
  updateEndLocation,
} from "./app/features/mapSlice";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { GoogleApiWrapper, google } from "google-maps-react";
import axios from "axios";
import { geocodeByAddress } from "react-google-places-autocomplete";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStartingPoint = e.target.startingPoint.value;
    const newDestination = e.target.destination.value;
    const originGeocode = await geocodeByAddress(newStartingPoint);
    const destinationGeocode = await geocodeByAddress(newDestination);
    const origion = {
      lat: originGeocode[0].geometry.viewport.Ab.g,
      lng: originGeocode[0].geometry.viewport.Ra.g,
    };
    const destination = {
      lat: destinationGeocode[0].geometry.viewport.Ab.g,
      lng: destinationGeocode[0].geometry.viewport.Ra.g,
    };
    if (origion && destination) {
      getDirections(origion, destination);
    } else {
      alert("cannot have empty input");
    }
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAKdW7KHxurf0MqG2goZ9d1Z01Sefs6Uck",
    libraries: "places",
  });

  const getDirections = async (newStartingPoint, newDestination) => {
    dispatch(updateStartLocation(newStartingPoint));
    dispatch(updateEndLocation(newDestination));
    // const directionService = new google.maps.directionService();
    const request = {
      origin: newStartingPoint,
      destination: newDestination,
      // travelMode: google.maps.TravelMode.DRIVING,
      // unitSyste: google.maps.unitsystem.IMPERIAL,
    };
    // console.log("results: " + request);
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
          <label htmlFor="startingPoint">Starting Point</label>
          <Autocomplete onPlaceSelected={(place) => console.log(place)}>
            <input type="text" id="startingPoint" name="startingPoint"></input>
          </Autocomplete>
          <label htmlFor="destination">Destination</label>
          <Autocomplete onPlaceSelected={(place) => console.log(place)}>
            <input type="text" id="destination" name="destination"></input>
          </Autocomplete>
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
