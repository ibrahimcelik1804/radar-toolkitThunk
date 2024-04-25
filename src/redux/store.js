import { configureStore } from "@reduxjs/toolkit";
import flightSlice from "./selices/flightSlice";

export default configureStore({ reducer: flightSlice });
