import { useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then( all => {
      setState(prev => ({ ...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data}))
    })
    .catch(err => console.log(err))
  }, [])

  const updateDays = (state, appointments) => {
    // Get the day object and its position in the state.days array
    const index = state.days.findIndex(d => d.name === state.day);
    const dayObj = state.days[index];

    // Count how many appointments in the day objects are null
    let spots = 0;
    for (const id of dayObj.appointments) {
      if (!(appointments[id].interview)) {
        spots++;
      }
    }

    // Copy and update with the spots info
    const newDays = [...state.days];
    newDays[index] = {...dayObj, spots};

    return newDays;
  }

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState({...state, appointments});
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateDays(state, appointments)
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({...state, appointments, days});
    })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}