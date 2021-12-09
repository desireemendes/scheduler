import React from "react"
export default function empty() {
  return (
<main className="appointment__add">
  <img
    className="appointment__add-button"
    src="images/add.png"
    alt="Add"
    onClick={this.props.onAdd}
  />
</main>
  )
}