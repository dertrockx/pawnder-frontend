import React from 'react';
import styles from './Radio.module.css';

function Radio(props) {
  const {
    name,
    value,
    label,
    onChange,
    checked,
  } = props;

  return (
    <label className={checked ? styles.containerChecked : styles.container}>{label}
      <input
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
        className={styles.Radio}
      />
      <span className={styles.checkmark}></span>
    </label>
  );
}

export default Radio;