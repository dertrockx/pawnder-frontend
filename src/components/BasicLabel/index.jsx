import React from "react";

function BasicLabel(props) {
  const {
    label
  } = props;

  return (
    <label style={{ width: 100 }} className="input-text">
      {label}
    </label>
  )
}

export default BasicLabel;