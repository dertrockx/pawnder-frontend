import React, { useState } from 'react';
import PasswordInput from 'components/PasswordInput'; 

import styles from './Security.module.css';

const Security = () => {
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "", 
    confirmNewPassword: "", // for checking if they match
  });

  return (
    <div className={styles.halfField}>
      <div>
        <h3 className="heading-3">Change your password</h3>
        <p className="caption">Update your password for security purposes</p>
      </div>
      <div>
        <div className={styles.twoFields}>
          <p className="paragraph">Current Password</p>
          <PasswordInput />
        </div>
        <div className={styles.twoFields}>
          <p className="paragraph">New Password</p>
          <PasswordInput />
        </div>
        <div className={styles.twoFields}>
          <p className="paragraph">Confirm New Password</p>
          <PasswordInput />
        </div>
      </div>
    </div>
  );
}
 
export default Security;