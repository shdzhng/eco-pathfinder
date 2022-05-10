import React from "react";
import mapStyles from "./mapStyles";
import { useSelector, useDispatch } from "react-redux";
import {
  updateStartLocation,
  updateEndLocation,
  updateSelectedLocation,
} from "./app/features/mapSlice";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
  InfoBox,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { GoogleApiWrapper, google } from "google-maps-react";
import axios from "axios";

function Map() {
  const { mapData } = useSelector((state) => state.map.value);
  const dispatch = useDispatch();

  const { startLocation, map, endLocation, selectedLocation } = useSelector(
    (state) => state.map
  ).value;

  const onMapClick = React.useCallback((e) => {
    const newLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    dispatch(updateSelectedLocation(newLocation));
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    console.log(map);
    mapRef.current = map;
  }, []);

  /////// render map //////

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Map is Loading";

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
  };

  const containerStyle = {
    width: "100vw",
    height: "100vh",
  };

  return (
    <div id="navContainer">
      <Search />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={startLocation}
        zoom={15}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <Marker position={startLocation} />
        <Marker position={selectedLocation} />
      </GoogleMap>
    </div>
  );
}

function Search() {
  const { startLocation, map, endLocation, selectedLocation } = useSelector(
    (state) => state.map
  ).value;
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

    if ((location = "origin")) {
      dispatch(updateStartLocation({ lat, lng }));
    } else {
      dispatch(updateEndLocation({ lat, lng }));
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

    const directionService = new google.maps.DirectionsService();
    const result = await directionService.route(req);
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

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(Map);
