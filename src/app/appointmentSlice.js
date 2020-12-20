import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointmentData: null,
};

export const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    INIT_DATA: (state, action) => {
      state.appointmentData = action.payload;
    },
    CONFIRM_APPOINTMENT: (state, action) => {
      const appt = action.payload;
      
      state.appointmentData = appt ;
    },
    RESCHEDULE_APPOINTMENT: (state, action) => {
      const appt = action.payload;
      state.appointmentData = { ...state.appointmentData, appt };
    },
  },
});

export const { INIT_DATA, CONFIRM_APPOINTMENT, RESCHEDULE_APPOINTMENT } = appointmentSlice.actions;

export const initData = (data) => {
  return async (dispatch) => {
    dispatch(INIT_DATA(data));
  };
};

export const confirmAppointment = (data) => {
  return async (dispatch) =>{
    dispatch(CONFIRM_APPOINTMENT(data))
  }
}

export const rescheduleAppointment = (data) => {
  return async (dispatch) =>{
    dispatch(RESCHEDULE_APPOINTMENT(data))
  }
}


export default appointmentSlice.reducer;
