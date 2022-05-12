import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleHaveSelectedDirection } from "../app/features/mapSlice";
import leaf from "../images/leaf.svg";

export default function DirectionSingleDisplay() {
  const dispatch = useDispatch();
  const { totalEmission, selectedDirection } = useSelector(
    (state) => state.map
  ).value;

  const handleOnClick = () => {
    dispatch(toggleHaveSelectedDirection(false));
  };

  const travelMode = selectedDirection.request.travelMode;
  const travelModeElement =
    travelMode.charAt(0) + travelMode.substring(1).toLowerCase();

  const emissionElement = totalEmission ? (
    `${totalEmission.toFixed(2)} pounds of CO2`
  ) : (
    <img className="sustainability-icon" alt="sustainabile option" src={leaf} />
  );

  return (
    <div id="directionSingleDisplayContainer">
      <h1>
        {travelModeElement} {emissionElement}
      </h1>
      {selectedDirection.routes[0].legs[0].steps.map((step, i) => {
        return (
          <div
            className="direction"
            key={i}
            dangerouslySetInnerHTML={{ __html: step.instructions }}
          />
        );
      })}
      <button
        onClick={() => {
          handleOnClick();
        }}
      >
        Choose Another Route
      </button>
    </div>
  );
}
