import "components/Appointment/styles.scss";
import React from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
     transition(SAVING);
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    });
  }

  const onAdd = () => transition(CREATE);
  const onCancel = () => back();

  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* {props.interview ? 
    <Show 
    student={props.interview.student}
    interviewer={props.interview.interviewer} /> : <Empty />} */}
      {mode === "EMPTY" && <Empty onAdd={onAdd} />}
      {mode === "SHOW" && <Show 
      interview={props.interview} 
      interviewer={props.interview.interviewer}
      />}
      {mode === "CREATE" && (
        <Form
          onCancel={onCancel}
          interviewers={props.interviewers}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
    </article>
  );
}
