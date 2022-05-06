import React, { Component } from "react";
import "./style.css";
import MyComponent from "./Map";
import InputTable from "./InputTable";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startingPoint: "",
      destination: "",
      map: "",
      center: {
        lat: 37.802891,
        lng: -122.266571,
      },
    };

    this.mapOnLoad = this.mapOnLoad.bind(this);
    this.pan = this.pan.bind(this);
  }

  componentDidMount() {
    this.handleChangeState = this.handleChangeState(this);
  }

  mapOnLoad(newMap) {
    this.setState({ map: newMap });
    console.log(this.handleChangeState);
  }

  handleChangeState = (stateToChange, value) => {
    // this.setState({ stateToChange: value });
    console.log("hello");
  };

  pan = () => {
    this.state.map.panTo(this.state.center);
  };

  render() {
    return (
      <div>
        <InputTable />
        <MyComponent
          center={this.state.center}
          map={this.state.map}
          mapOnLoad={this.mapOnLoad}
          pan={this.pan}
        />
      </div>
    );
  }
}

// async handleRequest(startingPoint, destination) {
//   await axios
//     .get(
//       `https://httpbin.org/get?startingPoint=${startingPoint}&destination=${destination}`
//     )
//     .then((res) =>
//       console.log(
//         `From ${res.data.args.startingPoint} to ${res.data.args.destination}`
//       )
//     );
// }

// componentDidMount() {
//   this.setState({
//     map: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAKdW7KHxurf0MqG2goZ9d1Z01Sefs6Uck&callback=initMap&v=weekly",
//   });
// }
