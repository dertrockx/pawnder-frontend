import React, { useState } from 'react';
import Button from 'components/Button'; 
import HR from 'components/HR';
import PasswordInput from 'components/PasswordInput'; 

import { Tooltip } from '@chakra-ui/react';

import styles from './Security.module.css';

const Security = () => {
  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '', 
    confirmNewPassword: '', // for checking if they match
  });

  const handleCancel = () => {
    alert("Cancelled");

    // Set all values to their initial state
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    // Should check contact number for pattern before submitting lol
    // values.contactNumber.match(/^\d{10}$/)
    
    // Redirect to feed after onboarding, put inside .then when successful
    // history.push('/feed');

    // For testing
    console.log(password);
  }

  return (
    <div>
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
      <HR />
      <div style={{margin: "60px 0px"}} className={styles.bottomButtons} >
        <Button size="small" type="submit" color="brand-default" variant="outline" onClick={handleCancel} block disabled={true}>Cancel</Button>
        <Button size="small" type="submit" color="brand-default" onClick={handleSubmit} block disabled={true}>Save</Button>
      </div>
    </div>
  );
}
 
export default Security;