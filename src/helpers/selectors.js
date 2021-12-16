// Finds obj in state.days array that matches name of day, loops through appointments and returns value
export function getAppointmentsForDay(state, day) {
  const filterDay = state.days.filter(match => match.name === day)[0];
  if (!state.days.length || !filterDay) {
    return [];
  } else{
    return filterDay.appointments.map((id) => state.appointments[id])
  }
}

// Gets student and interviewer
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerNumber = interview.interviewer;
  
  return {
    interviewer: state.interviewers[interviewerNumber],
    student: interview.student
  }
}

export function getInterviewersForDay(state, day) {

  const filterDay = state.days.filter(match => match.name === day)[0];

  if (!state.days.length || !filterDay) {
    return [];
  } else{
    return filterDay.interviewers.map((id) => state.interviewers[id])
  }
}