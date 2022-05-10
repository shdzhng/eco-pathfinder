import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateStartLocation,
  updateDestination,
  updateDirections,
} from "../app/features/mapSlice";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { Autocomplete } from "@react-google-maps/api";
import axios from "axios";

export default function Search() {
  const { startLocation, map, destination, selectedLocation, directions } =
    useSelector((state) => state.map).value;

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const latestOrigin = e.target.startingPoint.value;
    const latestDestination = e.target.destination.value;
    const origin = await findLatLng(latestOrigin, "origin");
    const destination = await findLatLng(latestDestination, "destination");

    e.target.destination.value = "";
    e.target.startingPoint.value = "";

    if (origin && destination) {
      getDirections(origin, destination);
    } else {
      alert("cannot have empty input");
    }
  };

  const findLatLng = async (address, location) => {
    const result = await getGeocode({ address });
    const { lat, lng } = await getLatLng(result[0]);

    const position = {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    };

    if ((location = "origin")) {
      dispatch(updateStartLocation(position));
    }

    if ((location = "destination")) {
      dispatch(updateDestination(position));
    }

    return lat + "," + lng;
  };

  const getDirections = async (origin, destination) => {
    const response = await axios
      .post(
        `/maps/api/directions/json?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&origin=${origin}&destination=${destination}`
      )
      .then((response) => {
        return response.data;
      });

    const req = {
      origin,
      destination,
      travelMode: "DRIVING",
    };

    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.__proto__.route(req);
    await dispatch(updateDirections(results));
  };

  return (
    <form
      action=""
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <label htmlFor="startingPoint">Starting Point:</label>
      <Autocomplete>
        <input type="text" id="startingPoint" name="startingPoint"></input>
      </Autocomplete>
      <br />
      <label htmlFor="destination">Destination:</label>
      <Autocomplete>
        <input type="text" id="destination" name="destination"></input>
      </Autocomplete>
      <br />
      <button type="submit">Take Me!</button>
    </form>
  );
}
