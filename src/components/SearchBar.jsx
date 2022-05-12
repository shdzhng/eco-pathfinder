import React from "react";
import { useDispatch } from "react-redux";
import {
  updateStartLocation,
  updateDestination,
  updateDirections,
  addToDirectionsList,
  toggleHaveSelectedDirection,
  clearDirectionsList,
  updateHaveSearched,
} from "../app/features/mapSlice";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { Autocomplete } from "@react-google-maps/api";

export default function SearchBar() {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateHaveSearched());
    // dispatch(toggleHaveSelectedDirection());
    const latestOrigin = e.target.startingPoint.value;
    const latestDestination = e.target.destination.value;
    const origin = await findLatLng(latestOrigin, "origin");
    const destination = await findLatLng(latestDestination, "destination");
    e.target.destination.value = "";
    e.target.startingPoint.value = "";

    if (origin && destination) {
      dispatch(clearDirectionsList());
      await getDirections(origin, destination, "DRIVING");
      await getDirections(origin, destination, "TRANSIT");
      await getDirections(origin, destination, "BICYCLING");
      await getDirections(origin, destination, "WALKING");
    } else {
      alert("cannot have empty input");
    }
  };

  const getDirections = async (origin, destination, travelMode) => {
    const req = {
      origin,
      destination,
      travelMode,
    };

    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.__proto__.route(req);
    const totalEmission = await calculateEmissions(results);

    if (travelMode === "TRANSIT") {
      const stepsArr = [];
      results.routes[0].legs[0].steps.forEach((step) => {
        stepsArr.push(step.travel_mode);
      });

      if (stepsArr.includes("TRANSIT")) {
        dispatch(addToDirectionsList([travelMode, totalEmission, results]));
      }
      dispatch(updateDirections(results));
    } else {
      dispatch(addToDirectionsList([travelMode, totalEmission, results]));
    }
  };

  const findLatLng = async (address, location) => {
    const result = await getGeocode({ address });
    const { lat, lng } = await getLatLng(result[0]);
    const position = {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    };
    if ((location = "origin")) dispatch(updateStartLocation(position));
    if ((location = "destination")) dispatch(updateDestination(position));

    return lat + "," + lng;
  };

  const calculateEmissions = async (results) => {
    let totalEmission = 0;

    await results.routes[0].legs[0].steps.forEach((step) => {
      let [distance, measurement] = step.distance.text.split(" ");
      if (measurement === "ft") distance = distance * 0.000189394;
      distance = parseFloat(distance);

      if (step.transit) {
        switch (step.transit.line.vehicle.type) {
          case "BUS":
            totalEmission += 0.18 * distance;
            break;
          case "RAIL":
            totalEmission += 0.14 * distance;
            break;
          case "SUBWAY":
            totalEmission += 0.14 * distance;
            break;
          case "TRAIN":
            totalEmission += 0.11 * distance;
            break;
          case "TRAM":
            totalEmission += 0.01 * distance;
            break;
        }
      } else if (step.travel_mode === "DRIVING") {
        totalEmission += 0.85 * distance;
      }
    });

    return totalEmission;
  };

  return (
    <form
      action=""
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <label htmlFor="startingPoint">Origin:</label>
      <Autocomplete>
        <input
          type="text"
          id="startingPoint"
          placeholder="go from where?"
          name="startingPoint"
        ></input>
      </Autocomplete>
      <br />
      <label htmlFor="destination">Destination:</label>
      <Autocomplete>
        <input
          type="text"
          placeholder="where are you headed?"
          id="destination"
          name="destination"
        ></input>
      </Autocomplete>
      <br />
      <button type="submit">Let's Go!</button>
    </form>
  );
}
