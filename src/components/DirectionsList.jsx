import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDirections } from "../app/features/mapSlice";
import leaf from "../images/leaf.svg";

export default function DirectionsList() {
  const dispatch = useDispatch();
  const { directionsList } = useSelector((state) => state.map).value;

  const handleOnClick = (direction) => {
    dispatch(updateDirections(direction));
  };

  const reformatTravelModeChara = (travelMode) => {
    return travelMode.charAt(0) + travelMode.substring(1).toLowerCase();
  };

  return (
    <div id="directionListContainer">
      {directionsList.map((route, i) => {
        let [travelMode, emission, direction] = route;
        const duration = direction.routes[0].legs[0].duration.text;
        travelMode = reformatTravelModeChara(travelMode);
        return (
          <div
            onClick={() => {
              handleOnClick(direction);
            }}
            key={i}
            className="singleDirectionContainer"
          >
            <h1 className="travelMode">
              {travelMode}{" "}
              {emission ? (
                ""
              ) : (
                <img
                  className="sustainability-icon"
                  alt="sustainabile option"
                  src={leaf}
                />
              )}
            </h1>

            <p className="small">
              {" "}
              (
              {emission
                ? emission.toFixed(2) + " pounds of CO2"
                : "No Emissions!"}
              )
            </p>

            <p className="travelDuration">Duration: {duration}</p>
            <p className="carpoolAlternative">
              {travelMode === "DRIVING"
                ? `${(emission * 0.7).toFixed(2)}  pounds of CO2 if you carpool`
                : ""}
            </p>
          </div>
        );
      })}
    </div>
  );
}
