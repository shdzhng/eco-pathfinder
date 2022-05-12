import React, { useEffect } from "react";
import "./styles/style.css";
import Map from "./components/GoogleMap";
import SearchBar from "./components/SearchBar";
import DirectionsList from "./components/DirectionsListDisplay";
import DirectionSingleDisplay from "./components/DirectionSingleDisplay";
import { Loader } from "@googlemaps/js-api-loader";
import { GoogleApiWrapper } from "google-maps-react";
import { useSelector } from "react-redux";

const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  version: "weekly",
  libraries: ["places"],
}).load();

function App() {
  const { selectedDirection, haveSelectedDirection, haveSearched } =
    useSelector((state) => state.map).value;

  const checkWhatToRender = () => {
    if (haveSearched && haveSelectedDirection) {
      return <DirectionSingleDisplay />;
    } else {
      return <DirectionsList />;
    }
  };

  useEffect(() => {
    checkWhatToRender();
  }, [selectedDirection]);

  return (
    <div id="container">
      <div id="sidebarContainer">
        <SearchBar />
        {checkWhatToRender()}
      </div>
      <Map />
    </div>
  );
}
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(App);
