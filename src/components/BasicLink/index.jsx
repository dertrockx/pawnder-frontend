import React from "react";
import { Link } from "react-router-dom";
import styles from "./BasicLink.module.css";

function BasicLink(props) {
  const { to, label } = props;

  return (
    <Link to={to} className={styles.baseStyles}>{label}</Link>
  )
}

export default BasicLink;