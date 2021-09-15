import React, { useState } from 'react';
import PasswordInput from 'components/BasicPasswordInput'; 
import styles from "./Security.module.css";


const Security = () => {
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "", 
    newPassword2: "", // for checking if they match
  });

  return (
    <div>
      <h3 className="heading-3">Change your password</h3>
      <div className={styles.halfField}>
        <p className="caption">
          Update your password for security purposes
        </p>
        <div className={styles.oneField}>
          <div>
            <p className="paragraph">Current Password</p>
            <PasswordInput />
          </div>
          <div>
            <p className="paragraph">New Password</p>
            <PasswordInput />
          </div>
          <div>
            <p className="paragraph">Confirm New Password</p>
            <PasswordInput />
          </div>
      </div>
      </div>
    </div>
  );
}
 
export default Security;