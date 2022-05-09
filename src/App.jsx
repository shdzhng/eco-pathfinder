import React, { Component } from "react";
import "./style.css";
import Map from "./Map";
import InputTable from "./InputTable";
import { useSelector, useDispatch } from "react-redux";
import { renderMap } from "./app/features/mapSlice";

export default function App() {
  const mapData = useSelector((state) => state.map);
  // componentDidMount(){
  //   useDispatch(renderMap())
  //   this.setState({
  //     map: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAKdW7KHxurf0MqG2goZ9d1Z01Sefs6Uck&callback=initMap&v=weekly",
  //   });
  // }

  return (
    <div>
      <Map
        startLocation={mapData.value.startLocation}
        map={mapData.value.map}
      />
    </div>
  );
}

// handleChangeState = (stateToChange, value) => {
//   // this.setState({ stateToChange: value });
//   console.log("hello");
// };

// async handleRequest(startLocation, endLocation) {
//   await axios
//     .get(
//       `https://httpbin.org/get?startLocation=${startLocation}&endLocation=${endLocation}`
//     )
//     .then((res) =>
//       console.log(
//         `From ${res.data.args.startLocation} to ${res.data.args.endLocation}`
//       )
//     );
// }
