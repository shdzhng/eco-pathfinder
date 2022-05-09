import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startLocation: {
    lat: 37.776596,
    lng: -122.391953,
  },
  endLocation: {
    lat: 0,
    lng: 0,
  },
  /** @type google.maps.Map */
  map: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAKdW7KHxurf0MqG2goZ9d1Z01Sefs6Uck&callback=initMap&v=weekly",
  directions: {},
};

export const mapSlice = createSlice({
  name: "locations",
  initialState: {
    value: initialState,
  },
  reducers: {
    updateStartLocation: (state, action) => {
      state.value.startLocation = action.payload;
    },
    updateEndLocation: (state, action) => {
      state.value.endLocation = action.payload;
    },
    updateMap: (state, action) => {
      state.value.map = action.payload;
    },
  },
});

export const { updateStartLocation, updateEndLocation, updateMap } =
  mapSlice.actions;

export default mapSlice.reducer;
