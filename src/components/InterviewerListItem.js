import React from "react";
import "components/InterviewerListItem";
import classNames from "classnames";

export default function InterviewerListItem (props) {

  const InterviewerListItemClass = classNames(
    "interviewers__item", 
    {"interviewers__item--selected": props.selected});

  return (
    <li className={InterviewerListItemClass} onClick={props.onChange}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}

//1. replace hardcoded values with props
// interviewer props = id, name, avatar
//2. add event listener to the li, each item should be clickable and setInterviewer function should run,
//taking interview id as a parameter
//3. interviewers__item--selected should only be applied if interviewer is selected
