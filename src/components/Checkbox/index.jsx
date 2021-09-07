import React from 'react';
import styles from './Checkbox.module.css';


function Checkbox(props) {
  const {
    name, // no need for this but pwede namang gamitin, e.g. name="preferredAnimals"
    id,
    label,
    onChange,
    checked,
  } = props;
  
  return (
    
      <label className={checked ? styles.containerChecked : styles.container}>
        {label}
      <input
        type="checkbox"
        name={name}
        id={id}
        onChange={onChange}
        checked={checked}
        className={styles.Checkbox}
      />
      <span className={styles.checkmark}></span>
      </label>
  );
}
  

export default Checkbox;
