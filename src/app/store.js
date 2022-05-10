import { configureStore } from "@reduxjs/toolkit";
import mapSlice from "./features/mapSlice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    map: mapSlice,
  },
});
