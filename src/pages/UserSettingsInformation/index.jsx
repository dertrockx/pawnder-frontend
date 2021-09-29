import React, { useState } from "react";

import BasicDescription from "components/BasicDescription";
import BasicHR from "components/BasicHR";
import BasicImageInput from "components/BasicImageInput";
import BasicLabel from "components/BasicLabel";
import BasicInput from "components/BasicInput";
import Button from "components/Button";
import BasicSideBar from "components/BasicSideBar";

import styles from "./UserSettingsInformation.module.css";
import { IoSettingsSharp } from "react-icons/io5";

function UserSettingsInformation() {
  const sample = "Sample"
  const [ isChangePasswordClicked, setIsChangePasswordClicked ] = useState(false);
  const [ value, setValue ] = useState({
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

  const handleChange = (e) => {
		setValue({
			...value,
			[e.target.name]: e.target.value,
		});
	}

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
  }

  function imageHandler(e) {
		const selected = e.target.files[0];
		const ALLOWED_TYPES=['image/png', 'image/jpg', 'image/jpeg'];
		if(selected && ALLOWED_TYPES.includes(selected.type)) {
			const reader = new FileReader();
			reader.onload = () => {
				if(reader.readyState === 2) {
					setValue({
						...value,
						[e.target.name]: reader.result,
					})
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

  return (
    <div>
      <div className={`
        heading-2
        ${styles.header}
        `}>
          Settings
      </div>
      <div>
        <div className={styles.outerRow}>

          <BasicSideBar />

          <div className={styles.container}>

            <div className={styles.row}>
              <div>
                <BasicDescription title="Display Picture" body="Upload your display picture to share in public." />
              </div>
              <div>
                <BasicImageInput label="Change Picture" image={value.image} onChange={imageHandler} imagePreviewError={imagePreviewError}/>
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
                      value={value.firstName}
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
                      value={value.lastName}
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
                      value={value.middleName}
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
                      value={value.birthDate}
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
                      value={value.contactNumber}
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
                      value={value.email}
                      placeholder="Email"
                    />
                  </div>
                </div>
              </div>
            </div>

            <BasicHR />
            {/* <HR /> */}

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
                        <div className={styles.input}>
                          <Button onClick={() => setIsChangePasswordClicked(true)} color="brand-default" size="small">Edit</Button>
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
                              value={value.currentPassword}
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
                              value={value.newPassword}
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
                              value={value.confirmPassword}
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

            <Button onClick={handleSubmit} color="brand-default" size="small" block>Save</Button>

          </div>        
        </div>

      </div>

    </div>
  )
}

export default UserSettingsInformation;