import React from "react";

import styles from "./BasicDescription.module.css"

function BasicDescription(props) {
  const {
    title,
    body
  } = props;

  return (
    <div className={styles.container}>
      <div className="heading-3">
        {title}
      </div>
      <div className="paragraph">
        {body}
      </div>
    </div>
  )
}

export default BasicDescription;