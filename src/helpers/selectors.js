export function getAppointmentsForDay(state, day) {
  const filterDay = state.days.filter(match => match.name === day)[0];
  if (!state.days.length || !filterDay) {
    return [];
  } else{
    return filterDay.appointments.map((id) => state.appointments[id])
  }
}
