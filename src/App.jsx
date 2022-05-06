import React, { Component } from "react";
import axios from "axios";
import "./style.css";
import Testmap from "./testmap";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startingPoint: "",
      destination: "",
      map: "",
    };
  }

  async handleRequest(startingPoint, destination) {
    await axios
      .get(
        `https://httpbin.org/get?startingPoint=${startingPoint}&destination=${destination}`
      )
      .then((res) =>
        console.log(
          `From ${res.data.args.startingPoint} to ${res.data.args.destination}`
        )
      );
  }

  componentDidMount() {
    this.setState({
      map: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAKdW7KHxurf0MqG2goZ9d1Z01Sefs6Uck&callback=initMap&v=weekly",
    });
  }

  handleSubmit = (e) => {
    const startingPoint = e.target.startingPoint.value;
    const destination = e.target.destination.value;
    this.handleRequest(startingPoint, destination);
    this.setState(); //PICK UP WORK HERE!
    console.log(this.state.startingPoint);
    console.log(this.state.destination);
    e.preventDefault();
  };

  render() {
    let Map;
    if (this.state.map) {
      Map = this.state.map;
    }
    console.log(this.state);

    return (
      <div>
        <form action="" onSubmit={this.handleSubmit}>
          <label htmlFor="startingPoint">Starting Point</label>
          <input type="text" id="startingPoint" name="startingPoint"></input>
          <label htmlFor="destination">Destination</label>
          <input type="text" id="destination" name="destination"></input>
          <button type="submit">Go!</button>
        </form>
        {Map}
        <Testmap />
      </div>
    );
  }
}
