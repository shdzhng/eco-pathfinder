import React from "react";

export default function InputTable(props) {
  const { handleChangeState, startingPoint, destination, handleRequest } =
    props;

  const handleSubmit = (e) => {
    const newStartingPoint = e.target.startingPoint.value;
    const newDestination = e.target.destination.value;
    console.log(newStartingPoint, newDestination);
    e.preventDefault();

    // this.setState(); //PICK UP WORK HERE!
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
