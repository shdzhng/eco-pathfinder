import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startLocation: {
    lat: 37.776596,
    lng: -122.391953,
  },
  destination: {
    lat: 37.779210641767285,
    lng: -122.39620161907959,
  },
  directions: null,
  selectedLocation: {},
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
    updateDestination: (state, action) => {
      state.value.destination = action.payload;
    },
    updateMap: (state, action) => {
      state.value.map = action.payload;
    },
    updateDirections: (state, action) => {
      state.value.directions = action.payload;
    },
    updateSelectedLocation: (state, action) => {
      state.value.selectedLocation = action.payload;
    },
  },
});

export const {
  updateStartLocation,
  updateDestination,
  updateMap,
  updateSelectedLocation,
  updateDirections,
} = mapSlice.actions;

export default mapSlice.reducer;
