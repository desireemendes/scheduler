import "components/Appointment/styles.scss";
import React from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    if (!name || !interviewer) {
      return;
    }
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW)
      }).catch(() => transition(ERROR_SAVE, true));
  };



  function cancelInterview(id) {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }

  const onAdd = () => transition(CREATE);
  const onCancel = () => back();

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === "EMPTY" && <Empty onAdd={onAdd} />}
      {mode === "SHOW" && props.interview && (
        <Show
          student={props.interview.student}
          interview={props.interview}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === "CREATE" && (
        <Form
          interviewers={props.interviewers}
          onCancel={onCancel}
          onSave={save}
        />
      )}

      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => back()}
          message={"Are you sure you want to delete?"}
          onConfirm={cancelInterview}
        />
      )}

      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error message="Could not update appointment" onClose={back} />
      )}

      {mode === ERROR_DELETE && (
        <Error message="Could not delete appointment" onClose={back} />
      )}
    </article>
  );
}
