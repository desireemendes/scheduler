import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const fetchFreeSpots = (state, appointments) => {
    const appointmentIds = state.days.filter((day) => day.name === state.day);
    const todaysAppointments = appointmentIds[0].appointments;
    const emptyAppointments = todaysAppointments.filter(
      (app) => !appointments[app].interview
    ).length;
    return emptyAppointments;
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = [...state.days];
    const dayIndex = state.days.findIndex((day) =>
      day.appointments.includes(id)
    );
    const spots = fetchFreeSpots(state, appointments);

    const newDay = {
      ...days[dayIndex],
      spots,
    };
    days[dayIndex] = newDay;
    // return days array

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState((prev) => ({ ...prev, appointments, days }));
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = [...state.days];
    const dayIndex = state.days.findIndex((day) =>
      day.appointments.includes(id)
    );
    const spots = fetchFreeSpots(state, appointments);

    const newDay = {
      ...days[dayIndex],
      spots,
    };
    days[dayIndex] = newDay;

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState((prev) => ({ ...prev, appointments, days }));
    });
  }

  const setDay = (day) => setState({ ...state, day });
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
