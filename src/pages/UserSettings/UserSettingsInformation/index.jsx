  import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import BasicDescription from "components/BasicDescription";
import BasicHR from "components/BasicHR";
import BasicImageInput2 from "components/BasicImageInput2";
import BasicLabel from "components/BasicLabel";
import BasicInput from "components/BasicInput";
import Button from "components/Button";
import styles from "./UserSettingsInformation.module.css";
import { IoLocationSharp } from 'react-icons/io5';
import {
  Radio, 
  RadioGroup,
  Stack,
  useToast,
} from "@chakra-ui/react";

function UserSettingsInformation() {
  const noPhoto = '/images/Avatar.png';
  const toast = useToast();
  const [ values, setValues ] = useState({
    photoUrl: null,
    firstName: null,
    middleName: null,
    lastName: null,
    sex: null,
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
    sex: null,
    birthDate: null,
    contactNumber: null,
    locationLat: "",
    locationLong: ""
  });
  const [ BDAY, setBDAY ] = useState(null);
	const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
	const loginType = useSelector((s) => s.auth.loginType);
	const [ imagePreviewError, setImagePreviewError ] = useState(false);
  const [ imagePreview, setImagePreview ] = useState(`${noPhoto}`);
	const [ locationError, setLocationError ] = useState(false);
  const [ isSaveDisabled , setIsSaveDisabled ] = useState(false);
  const [ isSaveClicked, setIsSaveClicked ] = useState(false);
  const [ isRequired, setIsRequired ] = useState(false);
  const [ contactNumberError, setContactNumberError ] = useState(false);
  var bday;

  //checks if user is authenticated
  useEffect(() => {
    // if(!isAuthenticated && loginType !== "USER") history.replace("/user/login")
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
        console.log(`from db: ${body.user.birthDate}`)
        var myDate = document.querySelector('input[type="date"]');
        var today = new Date(body.user.birthDate);
        myDate.value = today.toISOString().substr(0, 10);
        setBDAY(myDate.value)

        bday = BDAY;

        setValues({
          photoUrl: body.user.photoUrl,
          firstName: body.user.firstName,
          middleName: body.user.middleName,
          lastName: body.user.lastName,
          sex: body.user.sex,
          birthDate: BDAY,
          contactNumber: body.user.contactNumber,
          locationLat: body.user.locationLat,
          locationLong: body.user.locationLat
        })

        setCurrentValues({
          photoUrl: body.user.photoUrl,
          firstName: body.user.firstName,
          middleName: body.user.middleName,
          lastName: body.user.lastName,
          sex: body.user.sex,
          birthDate: BDAY,
          contactNumber: body.user.contactNumber,
          locationLat: body.user.locationLat,
          locationLong: body.user.locationLat
        })
    })

  }, [isSaveClicked])

  function checkObjects(keys1){
    for (let key of keys1) {
      if (values[key] !== currentValues[key]) {
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    const keys1 = Object.keys(values);
    if (checkObjects(keys1)) setIsSaveDisabled(true);
    else setIsSaveDisabled(false);
  })

  const handleChange = (e) => {
    console.log(`e.target.name: ${e.target.name}`)
    console.log(`e.target.value: ${e.target.value}`)
    if(e.target.name === "contactNumber" && contactNumberError) setContactNumberError(false)
    setValues({
      ...values,
			[e.target.name]: e.target.value,
		});
    if (e.target.name !== "birthDate" && values.birthDate === currentValues.birthDate) {
      setValues({ ...values, "birthDate": bday })
    }
    if(isRequired) setIsRequired(false)

	}

  const handleSubmit = (e) => {
    
    if (values.firstName === "" || values.lastName === "" || values.contactNumber === "") return setIsRequired(true)
    if (values.contactNumber.length !== 11 || isNaN(values.contactNumber)) return setContactNumberError(true);


    if (values.photoUrl !== currentValues.photoUrl || values.photoUrl !== null) {

      const data = new FormData()
      data.append("photoUrl", values.photoUrl);
      // data.append("tags", `codeinfuse, medium, gist`);
      // data.append("upload_preset", "pvhilzh7");    // Replace the preset name with your own
      // data.append("api_key", "522121975193432");   // Cloudinary key
      // data.append("timestamp", (Date.now() / 1000) | 0);
      try {
  
        fetch(
            "https://api.cloudinary.com/v1_1/dbky7zvuf/image/upload",       // change to https://api.cloudinary.com/v1_1/dbky7zvuf/image/upload
          {
            method: "POST", 
            headers: {
              "Content-Type": "multipart/form-data",
              'Accept': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(response => {
            if(response.status === 200) {
              console.log(response.status);
            }
            return response.json()
          })
          .then(data => {
            console.log(data)
            const fileURL = data.secure_url // You should store this URL for future references in your app
            console.log(fileURL);
            setValues({ ...values, "photoUrl": fileURL })
            console.log(data);
          })
  
      } catch (err) {
        console.log(err);
        // setErrMsg("Something went wrong!");
      }

    } else {
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
    }


    setIsSaveClicked(true);
    // window.location.reload(false);  //auto-reload to render the changes in the state but it needs the refresh token
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
      [e.target.name]: null
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
    toast({
			title: 'Access to location allowed.',
			status: 'success',
			position: 'top',
			duration: 5000,
			isClosable: true,
		});
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

  function handleCancel(e) {
    e.preventDefault();
    setValues(currentValues);
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
                outline={isRequired ? "red": "gray"}
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
                outline={isRequired ? "red": "gray"}
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
              <BasicLabel label="Sex"/>
            </div>
            <div className={styles.input}>
              <RadioGroup 
                name="sex" 
                onChange={handleChange} 
                value={values.sex}
              >
                <Stack spacing={8} direction="row">
                  <Radio isDisabled name="sex" variantColor="brand.100" value="m">Male</Radio>
                  <Radio isDisabled name="sex" variantColor="brand.100" value="f">Female</Radio>
                </Stack>
              </RadioGroup>
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
                outline={isRequired ? "red": "gray"}
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
                type="tel"
                name="contactNumber"
                maxlength="11"
                outline={contactNumberError || isRequired ? "red" : "gray"}
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
              {(values.locationLat !== currentValues.locationLat && values.locationLong !== currentValues.locationLong) ? <Button size="small" color="brand-default" onClick={handleLocation}> <span>Location updated</span><IoLocationSharp /> </Button> : <Button size="small" color="brand-default" onClick={handleLocation} variant="outline"><IoLocationSharp /> <span>Update location</span></Button> }
              {locationError !== '' && <p className="paragraph">{locationError}</p>}
            </div>
          </div>
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
              <Button onClick={handleCancel} color="brand-default" variant="outline" size="small" block>Cancel</Button>
            </div>
            <div style={{ width: 190, 'margin-left': 10 }}>
              <Button onClick={handleSubmit} color="brand-default" size="small" block disabled={isSaveDisabled}>Save</Button>
            </div>
          </div>
        </div>

      </div>
      <br /><br />
    </div>

  )
}

export default UserSettingsInformation;