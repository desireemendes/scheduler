import "components/Appointment/styles.scss"
import React from "react"
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

export default function Appointment(props) {
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = 'CREATE';

const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
);

const onAdd = () => transition(CREATE);
const onCancel = () => back();


  return (
    <article className="appointment">
    <Header time={props.time} />
    {/* {props.interview ? 
    <Show 
    student={props.interview.student}
    interviewer={props.interview.interviewer} /> : <Empty />} */}
        {mode === 'EMPTY' && <Empty onAdd={onAdd} />}
      {mode === 'SHOW' && <Show interview={props.interview} /> }
      {mode === 'CREATE' && <Form onCancel={onCancel}/>}
  </article>
  )
}