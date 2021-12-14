import React from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import { useState } from 'react';


export default function Form(props) {
const [student, setStudent] = useState(props.student || "");
const [interviewer, setInterviewer] = useState(props.interviewer || null);
const [error, setError] = useState('');

const reset = () => {
  setStudent("");
  setInterviewer(null);
}

const cancel = () => {
  reset();
  props.onCancel();
}

const validation = () => {
  if (student === '') {
    setError("Name cannot be left blank.");
    return;
  }
  if (interviewer === '') {
    setError("No interviewer selected.");
    return;
  }
  props.onSave(student,interviewer);
}


  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name={props.student}
        type="text"
        placeholder="Enter Student Name"
        value={student}
        onChange={(event) => setStudent(event.target.value)}
      />
    </form>
    <InterviewerList 
      interviewers={props.interviewers}
      value={interviewer}
      onChange={setInterviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={validation}>Save</Button>
    </section>
  </section>
</main>
  )
}