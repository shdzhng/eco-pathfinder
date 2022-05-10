import React from "react";
import mapStyles from "../mapStyles";
import { useSelector, useDispatch } from "react-redux";
import {
  updateStartLocation,
  updateEndLocation,
  updateSelectedLocation,
} from "../app/features/mapSlice";
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
  DirectionsService,
} from "@react-google-maps/api";
import { GoogleApiWrapper, google } from "google-maps-react";
import axios from "axios";
import Search from "./Search";

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

  // const mapRef = React.useRef();
  // const onMapLoad = React.useCallback((map) => {
  //   mapRef.current = map;
  // }, []);

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
        // onLoad={onMapLoad}
      >
        <Marker position={startLocation} />
        <Marker position={selectedLocation} />
      </GoogleMap>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(Map);
