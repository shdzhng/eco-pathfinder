import { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        style={{
          border: "2px solid black",
          marginTop: "2rem",
          width: "50%",
          height: "50%",
        }}
        zoom={10}
        initialCenter={{
          lat: 50.51197519999999,
          lng: 19.9449891,
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAKdW7KHxurf0MqG2goZ9d1Z01Sefs6Uck",
})(MapContainer);
