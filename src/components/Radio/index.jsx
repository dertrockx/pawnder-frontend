import React from 'react';
import styles from './Radio.module.css';

function Checkbox(props) {
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
        className={styles.Checkbox}
      />
      <span className={styles.checkmark}></span>
      </label>
  );
}

export default Checkbox;