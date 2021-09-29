  import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import BasicDescription from "components/BasicDescription";
import BasicHR from "components/BasicHR";
import BasicImageInput2 from "components/BasicImageInput2";
import BasicLabel from "components/BasicLabel";
import BasicInput from "components/BasicInput";
import Button from "components/Button";

import styles from "./UserSettingsInformation.module.css";

function UserSettingsInformation() {
  const noPhoto = '/images/Avatar.png';
	const history = useHistory();
  const sample = "Sample"
  const [ isChangePasswordClicked, setIsChangePasswordClicked ] = useState(false);
  const [ values, setValues ] = useState({
    image: null,
    firstName: null,
    middleName: null,
    lastName: null,
    birthDate: null,
    contactNumber: null,
    email: null,
    currentPassword: null,
    newPassword: null,
    confirmPassword: null
  });
	const [ imagePreviewError, setImagePreviewError ] = useState(false);
	const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
  const [imagePreview, setImagePreview] = useState(`${noPhoto}`);
  //checks if user is authenticated
  useEffect(() => {
    // if(!isAuthenticated) history.replace("/user/login")
  }, [])

  const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	}

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  }

  function imageHandler(e) {
		const selected = e.target.files[0];
		const ALLOWED_TYPES=['image/png', 'image/jpg', 'image/jpeg'];
		if(selected && ALLOWED_TYPES.includes(selected.type)) {
			const reader = new FileReader();
			reader.onload = () => {
				if(reader.readyState === 2) {
					setValues({
						...values,
						[e.target.name]: reader.result,
					})
          setImagePreview(`${reader.result}`)
				}
			}
			reader.readAsDataURL(e.target.files[0]);
		} else {
			if (selected === undefined) {
				return;
			}
			setImagePreviewError(true);
		}
  }

  const handleImageRemove = (e) => {
    setImagePreview(`${noPhoto}`);
    setValues({
      ...values,
      [e.target.name]: ''
    });
  }

  return (
    <div className={styles.container}>

      <div className={styles.row}>
        <div>
          <BasicDescription title="Display Picture" body="Upload your display picture to share in public." />
        </div>
        <div>
          <BasicImageInput2 src={imagePreview} label="Change Picture" onChange={imageHandler} onClick={handleImageRemove} imagePreviewError={imagePreviewError}/>
        </div>
      </div>

      <BasicHR />

      <div className={styles.row}>
        <div>
          <BasicDescription title=" Basic Information" body="Update your basic information to display on your profile." />
        </div>
        <div>
          <div className={styles.row}>
            <div className={styles.label}>
              <BasicLabel label="First Name" />
            </div>
            <div className={styles.input}>
              <BasicInput
                type="text"
                name="firstName"
                onChange={handleChange}
                value={values.firstName}
                placeholder={sample}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>
              <BasicLabel label="Last Name" />
            </div>
            <div className={styles.input}>
              <BasicInput
                type="text"
                name="lastName"
                onChange={handleChange}
                value={values.lastName}
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>
              <BasicLabel label="Middle Name (Optional)" />
            </div>
            <div className={styles.input}>
              <BasicInput
                type="text"
                name="middleName"
                onChange={handleChange}
                value={values.middleName}
                placeholder="Middle Name"
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>
              <BasicLabel label="Birthdate" />
            </div>
            <div className={styles.input}>
              <BasicInput
                type="date"
                name="birthDate"
                onChange={handleChange}
                value={values.birthDate}
                placeholder="Birthdate"
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>
              <BasicLabel label="Contact Number" />
            </div>
            <div className={styles.input}>
              <BasicInput
                type="text"
                name="contactNumber"
                onChange={handleChange}
                value={values.contactNumber}
                placeholder="Contact Number"
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>
              <BasicLabel label="Email" />
            </div>
            <div className={styles.input}>
              <BasicInput
                type="text"
                name="email"
                onChange={handleChange}
                value={values.email}
                placeholder="Email"
              />
            </div>
          </div>
        </div>
      </div>

      <BasicHR />

      <div className={styles.row}>
        <div>
          <BasicDescription title="Change Password" body="Update your password for security purposes." />
        </div>
        <div>
            {
              !isChangePasswordClicked && (
                <div className={styles.row}>
                  <div className={styles.label}>
                    <BasicLabel label="Password"/>
                  </div>
                  <div className={styles.row}>
                    <div style={{ width: 190, 'margin-right': 10 }}>
                      <Button onClick={() => setIsChangePasswordClicked(true)} color="brand-default" size="small" block>Edit</Button>
                    </div>
                    <div style={{ width: 190, 'margin-left': 10 }}></div>
                  </div>
                </div>
              )
            }
            {
              isChangePasswordClicked && (
                <>
                  <div className={styles.row}>
                    <div className={styles.label}>
                      <BasicLabel label="Current Password"/>
                    </div>
                    <div className={styles.input}>
                      <BasicInput
                        type="password"
                        name="currentPassword"
                        onChange={handleChange}
                        value={values.currentPassword}
                        placeholder="Current Password"
                      />
                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.label}>
                      <BasicLabel label="New Password"/>
                    </div>
                    <div className={styles.input}>
                      <BasicInput
                        type="password"
                        name="newPassword"
                        onChange={handleChange}
                        value={values.newPassword}
                        placeholder="New Password"
                      />
                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.label}>
                      <BasicLabel label="Confirm Password"/>
                    </div>
                    <div className={styles.input}>
                      <BasicInput
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        value={values.confirmPassword}
                        placeholder="Confirm Password"
                      />
                    </div>
                  </div>
                </>
              )
            }
        </div>
      </div>

      <BasicHR />

      <div className={styles.row}>
        <div>
          <BasicDescription />
        </div>
        <div className={styles.row}>
          <div className={styles.label}></div>
          <div className={styles.row}>
            <div style={{ width: 190, 'margin-right': 10 }}>
              <Button color="brand-default" variant="outline" size="small" block>Cancel</Button>
            </div>
            <div style={{ width: 190, 'margin-left': 10 }}>
              <Button onClick={handleSubmit} color="brand-default" size="small" block>Save</Button>
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}

export default UserSettingsInformation;