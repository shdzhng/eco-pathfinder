import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateStartLocation,
  updateEndLocation,
} from "./app/features/mapSlice";

export default function InputTable(props) {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    const newStartingPoint = e.target.startingPoint.value;
    const newDestination = e.target.destination.value;
    dispatch(updateStartLocation(newStartingPoint));
    dispatch(updateEndLocation(newDestination));
    e.preventDefault();
  };

  return (
    <div>
      <form
        action=""
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label htmlFor="startingPoint">Starting Point</label>
        <input type="text" id="startingPoint" name="startingPoint"></input>
        <label htmlFor="destination">Destination</label>
        <input type="text" id="destination" name="destination"></input>
        <button type="submit">Go!</button>
      </form>
    </div>
  );
}
