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
  directions: [],
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
    updateEndLocation: (state, action) => {
      state.value.endLocation = action.payload;
    },
    updateMap: (state, action) => {
      state.value.map = action.payload;
    },
    updateDirections: (state, action) => {
      state.value.directions = action.payload;
      console.log(action.payload);
    },
    updateSelectedLocation: (state, action) => {
      state.value.selectedLocation = action.payload;
    },
  },
});

export const {
  updateStartLocation,
  updateEndLocation,
  updateMap,
  updateSelectedLocation,
  updateDirections,
} = mapSlice.actions;

export default mapSlice.reducer;
