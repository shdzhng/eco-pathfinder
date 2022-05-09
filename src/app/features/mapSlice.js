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
  map: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAKdW7KHxurf0MqG2goZ9d1Z01Sefs6Uck&callback=initMap&v=weekly",
};

export const mapSlice = createSlice({
  name: "locations",
  initialState: {
    value: initialState,
  },
  reducers: {
    updateStartLocation: (state, action) => {
      state.startLocation = action.payload;
    },
    updateEndLocation: (state, action) => {
      state.endLocation = action.payload;
    },
    updateMap: (state, action) => {
      state.map = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateStartLocation, updateEndLocation, updateMap } =
  mapSlice.actions;

export default mapSlice.reducer;
