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
  haveSearched: false,
  haveSelectedDirection: false,
  selectedDirection: {},
  directionsList: [],
  totalEmission: 0,
};

export const mapSlice = createSlice({
  name: "locations",
  initialState: {
    value: initialState,
  },
  reducers: {
    updateHaveSearched: (state) => {
      state.value.haveSearched = true;
    },
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
    updateSelectedDirection: (state, action) => {
      state.value.selectedDirection = action.payload[0];
      state.value.totalEmission = action.payload[1];
    },
    resetSelectedDirection: (state) => {
      state.value.selectedDirection = null;
      state.value.totalEmission = 0;
    },
    toggleHaveSelectedDirection: (state, action) => {
      state.value.haveSelectedDirection = !state.value.haveSelectedDirection;
    },
    updateTotalEmission: (state, action) => {
      state.value.totalEmission = action.payload;
    },
    toggleEcoMode: (state) => {
      state.value.ecoMode = !state.value.ecoMode;
    },
    clearDirectionsList: (state, action) => {
      state.value.directionsList = [];
    },
    addToDirectionsList: (state, action) => {
      state.value.directionsList = [
        ...state.value.directionsList,
        action.payload,
      ];
    },
  },
});

export const {
  resetSelectedDirection,
  clearDirectionsList,
  addToDirectionsList,
  updateStartLocation,
  updateDestination,
  toggleHaveSelectedDirection,
  updateMap,
  updateSelectedDirection,
  updateDirections,
  toggleEcoMode,
  updateTotalEmission,
  updateHaveSearched,
} = mapSlice.actions;

export default mapSlice.reducer;
