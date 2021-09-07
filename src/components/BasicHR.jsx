import React from "react";

function BasicHR() {

  return (
    <hr 
      style={{ 
        width: "100%", 
        height: 1,
        "border-height": 0,
        // color: "var(--color-brand-default)",
        border: "1px solid var(--color-brand-default)",
        // "background-color": "var(--color-brand-default)",
      }}>
    </hr>
  )
}

export default BasicHR;