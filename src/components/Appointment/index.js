import "components/Appointment/styles.scss"
import React from "react"
import { Fragment } from "react";
import header from "./header";
import empty from "./empty";
import show from "./show";


export default function Appointment(props) {
  return (
    <article className="appointment">
      <header time={props.time}/>
      {props.interview ? <show interview={props.interview}/> : <empty />}
    </article>
  )
}