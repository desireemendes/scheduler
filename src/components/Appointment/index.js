import "components/Appointment/styles.scss";
import React from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

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

  function cancelInterview(id) {
    transition(DELETING);
    props.cancelInterview(props.id).then(() => transition(EMPTY));
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
      {mode === "SHOW" && props.interview && (
        <Show
          interview={props.interview}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === "CREATE" && (
        <Form
          onCancel={onCancel}
          interviewers={props.interviewers}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && ( <Confirm
        onCancel={() => back()}
        message={"Are you sure you want to delete?"}
        onConfirm={cancelInterview}
      />)}
    </article>
  );
}
