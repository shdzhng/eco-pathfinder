import { configureStore } from "@reduxjs/toolkit";
import mapSlice from "./features/mapSlice";

export const store = configureStore({
  reducer: {
    map: mapSlice,
  },
});
