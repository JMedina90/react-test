import { configureStore } from "@reduxjs/toolkit";
import appointmentSlice from './appointmentSlice';

export default configureStore({
  reducer: {
    appointments: appointmentSlice
  }
})