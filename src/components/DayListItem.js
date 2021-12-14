import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const dayListItemClass = classNames(
    "day-list__item",
    {'day-list__item--selected': props.selected},
    {'day-list__item--full': props.spots === 0},
  )
  const handleClick = () => props.onChange(props.name)
  const formatSpots = (spots) => {
    if (!spots) {
      return `no spots remaining`;
    }
    if (spots === 1) {
      return `1 spot remaining`;
    }
    return `${props.spots} spots remaining`;
  }

  return (
    <li className={dayListItemClass} >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
