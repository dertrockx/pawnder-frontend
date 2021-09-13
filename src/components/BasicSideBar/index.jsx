import React from "react"
import { Link } from "react-router-dom";
import styles from "./BasicSideBar.module.css"

function BasicSideBar() {

  return (
    <div className={`
      heading-3
      ${styles.sidebar}
    `}>
      <Link to="/user/settings/information">
        <div className={`
          ${styles.items}
          ${styles.activeLink}
        `}>
          Information
        </div>
      </Link>
      <Link to="/user/settings/preferences">
        <div className={`
          ${styles.items}
          ${styles.activeLink}
        `}>
          Preferences
        </div>
      </Link>
      
    </div>
  )
}

export default BasicSideBar;