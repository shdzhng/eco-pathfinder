import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateDirections,
  toggleHaveSelectedDirection,
  updateSelectedDirection,
} from "../app/features/mapSlice";
import leaf from "../images/leaf.svg";

export default function DirectionsList() {
  const dispatch = useDispatch();

  const { directionsList } = useSelector((state) => state.map).value;

  const handleOnClick = (direction, emission) => {
    dispatch(toggleHaveSelectedDirection(true));
    dispatch(updateSelectedDirection([direction, emission]));
    dispatch(updateDirections(direction));
  };

  const reformatTravelModeChara = (travelMode) => {
    return travelMode.charAt(0) + travelMode.substring(1).toLowerCase();
  };

  const emissionElement = (emission) => {
    if (emission) return `${emission.toFixed(2)} pounds of CO2`;

    return (
      <img
        className="sustainability-icon"
        alt="sustainabile option"
        src={leaf}
      />
    );
  };

  const carpoolElement = (travelMode, emission) => {
    if (travelMode === "DRIVING")
      return `${(emission * 0.7).toFixed(2)}  pounds of CO2 if you carpool`;
  };

  return (
    <div id="directionListContainer">
      {directionsList.map((route, i) => {
        let [travelMode, emission, direction] = route;
        const duration = direction.routes[0].legs[0].duration.text;
        return (
          <div
            onClick={() => {
              handleOnClick(direction, emission);
            }}
            key={i}
            className="singleDirectionContainer"
          >
            <h1 className="travelMode">
              {reformatTravelModeChara(travelMode)}
              <span>{emissionElement(emission)}</span>
            </h1>

            <p className="travelDuration">Duration: {duration}</p>

            <p className="carpoolAlternative">
              {carpoolElement(travelMode, emission)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
