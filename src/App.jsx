import React, { Component } from "react";
import "./style.css";
import Map from "./Map";
import { useSelector, useDispatch } from "react-redux";
import { renderMap } from "./app/features/mapSlice";

export default function App() {
  const mapData = useSelector((state) => state.map);

  return (
    <div>
      <Map
        startLocation={mapData.value.startLocation}
        map={mapData.value.map}
      />
    </div>
  );
}
