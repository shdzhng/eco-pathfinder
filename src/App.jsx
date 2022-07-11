import React, { useEffect, useMemo } from 'react';
import './styles/style.css';
import Map from './components/GoogleMap';
import SearchBar from './components/SearchBar';
import DirectionsList from './components/DirectionsListDisplay';
import DirectionSingleDisplay from './components/DirectionSingleDisplay';
import { GoogleApiWrapper } from 'google-maps-react';
import { useSelector } from 'react-redux';

function App() {
  const { selectedDirection, haveSelectedDirection, haveSearched } =
    useSelector((state) => state.map).value;

  const sidebarBody = useMemo(() => {
    if (haveSelectedDirection) {
      return <DirectionSingleDisplay />;
    } else {
      return <DirectionsList />;
    }
  }, [haveSelectedDirection]);

  return (
    <div id="container">
      <div id="sidebarContainer">
        <SearchBar />
        {sidebarBody}
      </div>
      <Map />
    </div>
  );
}
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(App);
