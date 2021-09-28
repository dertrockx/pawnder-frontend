  import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import BasicDescription from "components/BasicDescription";
import BasicHR from "components/BasicHR";
import BasicImageInput2 from "components/BasicImageInput2";
import BasicLabel from "components/BasicLabel";
import BasicInput from "components/BasicInput";
import Button from "components/Button";
import { useToast } from '@chakra-ui/react';
import styles from "./UserSettingsInformation.module.css";
import { IoLocationSharp } from 'react-icons/io5';

function UserSettingsInformation() {
  const noPhoto = '/images/Avatar.png';
	const history = useHistory();
  const toast = useToast();
  const [ clickSubmit, setClickSubmit ] = useState(true);
  const [ isChangePasswordClicked, setIsChangePasswordClicked ] = useState(false);
  const [ values, setValues ] = useState({
    photoUrl: null,
    firstName: null,
    middleName: null,
    lastName: null,
    birthDate: null,
    contactNumber: null,
    locationLat: "",
    locationLong: ""
  });
  const [currentValues, setCurrentValues ] = useState({
    photoUrl: null,
    firstName: null,
    middleName: null,
    lastName: null,
    birthDate: null,
    contactNumber: null,
    locationLat: "",
    locationLong: ""
  });
	const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
	const [ imagePreviewError, setImagePreviewError ] = useState(false);
  const [ imagePreview, setImagePreview ] = useState(`${noPhoto}`);
	const [ locationError, setLocationError ] = useState(false);
  const [ isSaveDisabled , setIsSaveDisabled ] = useState(false);

  //checks if user is authenticated
  useEffect(() => {
    // if(!isAuthenticated) history.replace("/user/login")
    fetch(
      `http://localhost:8081/api/0.1/user/` + `12`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      if (response.status === 200){
        return response.json();
      }
    })
    .then(body => {
      // console.log(body.user)
      setValues(body.user)
      setCurrentValues(body.user)
    })

    setValues({
      locationLat: "",
      locationLong: ""
    })

    console.log(values)

  }, [])

  function checkObjects(keys1){
    for (let key of keys1) {
      if (values[key] !== currentValues[key]) {
        // console.log("False");
        return false;
      }
    }
    // console.log("True");
    return true;
  }

  useEffect(() => {
    const keys1 = Object.keys(values);
    if (checkObjects(keys1)) setIsSaveDisabled(true);
    else setIsSaveDisabled(false);
  })

  const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
    console.log(values.birthDate);
	}

  const handleSubmit = (e) => {

    fetch(
      `http://localhost:8081/api/0.1/user/` + `12`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      }
    )
    .then(response => {
      if(response.status === 200) {
        console.log(response.status);
      }
    })
    // window.location.reload(false);  //auto-reload to render the changes in the state but it needs the refresh token
    setClickSubmit(true);
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

  // For location
	const onSuccess = (position) => {
		setValues({
			...values,
			locationLat: position.coords.latitude,
			locationLong: position.coords.longitude,
		});
		setLocationError(false);
	}
	
	const onError = () => {
		setLocationError(true);
		toast({
			title: 'Unable to retrieve your location. Please enable permissions.',
			status: 'error',
			position: 'top',
			duration: 5000,
			isClosable: true,
		});
	}

	const handleLocation = (e) => {
		/* See note in image handler. */
		e.preventDefault();
		if (!navigator.geolocation) {
		setLocationError(true);
		toast({
			title: 'Geolocation is not supported by your browser. Please use another.',
			status: 'error',
			position: 'top',
			duration: 5000,
			isClosable: true,
		});
		} else {
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
		}
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
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>
              <BasicLabel label="Address" />
            </div>
            <div className={styles.input}>
              {(values.locationLat !== '' && values.locationLong !== '') ? <Button size="small" color="brand-default" onClick={handleLocation}> <span>Location updated</span><IoLocationSharp /> </Button> : <Button size="small" color="brand-default" onClick={handleLocation} variant="outline"><IoLocationSharp /> <span>Update location</span></Button> }
              {locationError !== '' && <p className="paragraph">{locationError}</p>}
              {/* <BasicInput
                type="text"
                name="email"  
                onChange={handleChange}
                value={values.email}
                placeholder={currentValues.email}
              /> */}
            </div>
          </div>
        </div>
      </div>

      {/* <BasicHR />

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
      </div> */}

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
              <Button onClick={handleSubmit} color="brand-default" size="small" block disabled={isSaveDisabled}>Save</Button>
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}

export default UserSettingsInformation;