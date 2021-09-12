import React from "react"
import { NavLink } from "react-router-dom";
import styles from "./BasicSideBar.module.css"

function BasicSideBar(props) {
  const {
    clickInformation,
    clickPreferences
  } = props;

  return (
    <div className={`
      heading-3
      ${styles.sidebar}
      ${styles.spacing}
    `}>
      <NavLink exact 
        to="/user/settings/information"
        className="main-nav"
        activeClassName="main-nav-active"
      >
        Information
      </NavLink>
      <NavLink exact 
        to="/user/settings/preferences"
        className="main-nav"
        activeClassName="main-nav-active"
      >
        Preferences
      </NavLink>
    </div>
  )
}

export default BasicSideBar;