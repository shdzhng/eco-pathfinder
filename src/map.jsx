import React, { useState, useRef } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

export default function MapComponent() {
  const [map, setMap] = React.useState([]);
  const [status, setStatus] = React.useState("");
  const ref = React.useRef(null);

  const Map: React.FC<{}> = () => {};

  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  return (
    <>
      <Wrapper apiKey={"YOUR_API_KEY"} render={"hello"}>
        {/* <YourComponent /> */}
      </Wrapper>
      ;
    </>
  );
}
