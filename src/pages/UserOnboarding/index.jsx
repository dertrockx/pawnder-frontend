import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { IoLocationSharp, IoArrowBack } from 'react-icons/io5';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast
} from '@chakra-ui/react';

import Button from 'components/Button';
import BasicInputUser from 'components/BasicInputUser';
import Checkbox from 'components/Checkbox';
import Radio from 'components/Radio';

import logo from "assets/logo.svg";
import dogAdopting from "assets/dogAdopting.png";
import catFostering from "assets/catFostering.png";
import noPhoto from "assets/noPhoto.png";
import bg from "assets/userOnboardingBackground.png";
import styles from "./UserOnboarding.module.css";

const UserOnboarding = () => {
  // fetch user id here from redux login
  const id = 4;

  const history = useHistory();
  const toast = useToast();
  
  const current = new Date().toISOString().split("T")[0];

  // Might remove these two states as I don't use their values.
  const [imagePreviewError, setImagePreviewError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  
  const [preferredAnimalsArr, setPreferredAnimalsArr] = useState([]); // user model only allows string, but will be disabling this since checkbox isn't used
  
  const [imagePreview, setImagePreview] = useState(`${noPhoto}`);
  const [step, setStep] = useState(1);
  const [isDisabled, setIsDisabled] = useState(false); // set to false when testing and comment out useEffect
  const [distance, setDistance] = useState(''); // for Chakra-UI NumberInput
  const [values, setValues] = useState({
    avatarPhoto: '',
    firstName: '',
    middleName: '',
    lastName: '',
    birthDate: '',
    sex: '',
    contactNumber: '',
    locationLat: '',
    locationLong: '',
    action: '',
    preferredAnimal: '', // to match backend
    preferredDistance: '',
  });

  // For disabling buttons
  // useEffect(() => {
  //   // If step 1, check photo, first and last names, bday, sex, number, and loc coordinates
  //   // If step 2, check action
  //   // If step 3, check preferred animals and distance

  //   if (step === 1) {
  //     if (values.avatarPhoto !== '' && values.firstName !== '' && values.lastName !== '' && values.birthDate !== '' && values.sex !== '' && values.contactNumber !== '' && values.contactNumber.match(/^\d{10}$/) && values.locationLat !== '' && values.locationLong !== '') {
  //       setIsDisabled(false);
  //     } else {
  //       setIsDisabled(true);
  //     }
  //     setImagePreviewError(false);
  //     setLocationError(false);
  //   } else if (step === 2) {
  //     if (values.action !== '') {
  //       setIsDisabled(false);
  //     } else {
  //       setIsDisabled(true);
  //     }
  //   } else if (step === 3) {
  //     if (preferredAnimalsArr.length !== 0 && values.preferredDistance !== '') {
  //       setIsDisabled(false);
  //     } else {
  //       setIsDisabled(true);
  //     }
  //   }
  // }, [values, step]);

  // For checkboxes
  const animals = [
    { text: 'dogs', value: 'dogs' },
    { text: 'cats', value: 'cats' },
    { text: 'fish & aquariums', value: 'fish and aquariums' },
    { text: 'reptiles & amphibians', value: 'reptiles and amphibians' },
    { text: 'exotic pets', value: 'exotic pets' },
    { text: 'rabbits', value: 'rabbits' },
    { text: 'rodents', value: 'rodents' }
  ];

  const AnimalOptions = ({options}) => {
    return (
      <> 
        {options.map((choice, index) => (
        <div className={styles.checkboxItem} key={index}>
          {/* <Checkbox
            id={choice.value}
            label={choice.text}
            onChange={handleCheck}
            checked={preferredAnimalsArr.includes(`${choice.value}`)}
          /> */}
          <Radio 
            name="preferredAnimal"
            value={choice.value}
            label={choice.text}
            onChange={handleChange}
            checked={values.preferredAnimal === `${choice.value}`}
          />
        </div>
      ))}
      </>
    );
  }

<<<<<<< HEAD
  const handleSubmit = (e) => {
    e.preventDefault(); 

    // This is where to put the axios thingy with multipart/form-data put request
    
    // Redirect to feed after onboarding, put inside .then when successful
    // history.push('/feed');

	// For input of types text or radio
	const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});

		// For testing
		console.log(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Redirect to feed after onboarding, put inside .then when successful
		// history.push('/feed');
=======
  // For input of types text or radio
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
}

// For input of type checkbox
// const handleCheck = (e) => {
//   let newArray = [...preferredAnimalsArr, e.target.id];
//   if (preferredAnimalsArr.includes(e.target.id)) {
//     newArray = newArray.filter(animal => animal !== e.target.id);
//   }
//   setPreferredAnimalsArr(newArray);
//   setValues({
//     ...values, 
//     preferredAnimal: newArray.join(', '), // using newArr becayse preferredAnimalsArr holds the prev state of newArr
//   });
// };
>>>>>>> Connect onboarding to backend (no image yet)

const handleImageChange = (e) => {
  const selected = e.target.files[0];
  const ALLOWED_TYPES=['image/png', 'image/jpg', 'image/jpeg'];
  if (selected && ALLOWED_TYPES.includes(selected.type)) {
    let reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(`${reader.result}`)
    }
    setValues({
      ...values,
      avatarPhoto: selected
    });
    reader.readAsDataURL(selected);
    setImagePreviewError(false);
  } else {
    /** 
     * Selecting a file and cancelling returns undefined to selected.
     * So if you select a file and cancel, the imagePreviewError would be set to true.
     * We don't want that so we check if selected === undefined. If it's true, then we don't give out any errors.
     */       
    if (selected === undefined) {
      return;
    }
    setImagePreviewError(true);
    toast({
      title: 'We don\'t support that file type.',
      status: 'error',
      position: 'top',
      duration: 5000,
      isClosable: true,
    });
  }
}

  /**
   * This handler is solely for Chakra-UI's NumberInput since it doesn't return an event object.
   * See: https://github.com/chakra-ui/chakra-ui/issues/617
   */
  const handleNumberChange = (distance) => {
    setDistance(distance);
    setValues({
      ...values, 
      preferredDistance: distance
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
    /**
     * All buttons inside a form trigger the submit event.
     * By using the preventDefault() method, the submit event will be canceled,
     * thus, allowing multiple buttons inside a form.
     */
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

  const handleSubmit = (e) => {
    e.preventDefault(); 
    // This is where to put the axios thingy with multipart/form-data put request

    const formData = new FormData();

    // for (const key in values) {
    //   formData.append(`${key}`, values[key])
    //   console.log(`${key}: ${values[key]}`)
    // }

    formData.append('avatarPhoto', values.avatarPhoto);
    formData.append('firstName', values.firstName);
    formData.append('middleName', values.middleName);
    formData.append('lastName', values.lastName);
    formData.append('birthDate', values.birthDate);
    formData.append('sex', values.sex);
    formData.append('contactNumber', values.contactNumber);
    formData.append('locationLat', values.locationLat);
    formData.append('locationLong', values.locationLong);
    formData.append('action', values.action);
    formData.append('preferredAnimal', values.preferredAnimal);
    formData.append('preferredDistance', values.preferredDistance);

    axios.put('http://localhost:8081/api/0.1/user/' + id, formData)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })

    //   // Redirect to feed after onboarding, put inside .then when successful
    //   // history.push('/feed');
    // })
    // .catch(err => {
    //   console.log(err);
    // })


    // console.log("values", values);
  }


  return (
    <div className={styles.page}>
      <div className={styles.topItems}>
        <img src = {logo} alt = "logo" className={styles.logo} />
        {step > 1 && (<Button className={styles.backButton} size="small" onClick={() => setStep(step - 1)}><IoArrowBack /></Button>)}
      </div>
      <div className={styles.content}>
        <form onSubmit={handleSubmit}> 
          {step === 1 && (
          <div className={styles.formGroup}>
            <h2 className="heading-2">Welcome! Let's create your profile</h2>
            <div className={styles.imageContainer}>
              <img src={imagePreview} alt="" className={styles.img}/>
              <input className={styles.hideImageInput} type="file" accept="image/jpeg, image/jpg, image/png" id="image" onChange={handleImageChange} />
                <label className={styles.imageUploadButton} htmlFor="image"> {/* Cannot use button as label for adding photo. */}
                  Choose Photo
                </label>
            </div>
            <div className={styles.formFields}>
              <div>
                <label className="bold-text">First Name</label>
                  <BasicInputUser
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    value={values.firstName}
                    placeholder="First Name"
                  />
              </div>
              <div>
                <label className="bold-text">Middle Name</label>
                <BasicInputUser
                  type="text"
                  name="middleName"
                  onChange={handleChange}
                  value={values.middleName}
                  placeholder="Middle Name (optional)"
                />
              </div>
              <div>
                <label className="bold-text">Last Name</label>
                <BasicInputUser
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  value={values.lastName}
                  placeholder="Last Name"
                />
              </div>
              <div className={styles.formItemSex}>
                <label className="bold-text">Sex</label>
                <div className={styles.formItemSexOptions}>
                  <Radio 
                    name="sex"
                    value="m"
                    label="Male"
                    onChange={handleChange}
                    checked={values.sex === "m"}
                  />
                  <Radio 
                    name="sex"
                    value="f"
                    label="Female"
                    onChange={handleChange}
                    checked={values.sex === "f"}
                  />
                </div>
              </div>
              <div>
                <label className="bold-text">Date of Birth</label>
                <BasicInputUser
                  type="date"
                  name="birthDate"
                  onChange={handleChange}
                  value={values.birthDate}
                  max={current}
                />
              </div>
              <div>
                <label className="bold-text">Contact Number</label>
                <BasicInput
                  type="tel"
                  name="contactNumber"
                  onChange={handleChange}
                  value={values.contactNumber}
                  fontFamily="Raleway"
                  borderWidth="2px"
                  borderColor={"var(--color-light-grey)"}
                  _hover={{borderColor: "var(--color-grey)"}}
                  _focus={{borderColor: "brand.100", borderWidth: "2px"}}
                  />
              </InputGroup>
              </div>
              <div>
                <label className="bold-text">Location</label>
                {(values.locationLat !== '' && values.locationLong !== '') ? <Button size="small" color="brand-default" onClick={handleLocation}> <span>Location enabled</span><IoLocationSharp /> </Button> : <Button size="small" color="brand-default" onClick={handleLocation} variant="outline"><IoLocationSharp /> <span>Enable location</span></Button> }
              </div>
            </div>
          </div>)}
          {step === 2 && (
          <div className={styles.formGroup}>
            <h2 className="heading-2">What brings you to Pawnder?</h2>
            <div className={styles.cardDisplay}> 
              <label>
                <div className={values.action !== 'adopt' ? styles.cardPreferences : styles.cardPreferencesSelected}>
                  <img src={dogAdopting} alt="" className={styles.cardImage} />
                  <h3 className="heading-3">I'm adopting</h3>
                  <p className="paragraph">Give an animal a second chance by providing a loving furrever home.</p>
                  <input
                    type="radio"
                    name="action"
                    value="adopt"
                    onChange={handleChange}
                    checked={values.action === 'adopt'}
                  />
                </div>
              </label>
              <label>
                <div className={values.action !== 'foster' ? styles.cardPreferences : styles.cardPreferencesSelected}>
                  <img src={catFostering} alt="" className={styles.cardImage} />
                  <h3 className="heading-3">I'm fostering</h3>
                  <p className="paragraph">Temporarily care for a furry friend in need until a suitable home is found.</p>
                  <input
                    type="radio"
                    name="action"
                    value="foster"
                    onChange={handleChange}
                    checked={values.action === 'foster'}
                  />
                </div>
              </label>
            </div>
          </div>)}
          {step === 3 && (
          <div className={styles.formGroup}>
            <h2 className="heading-2">Which animal would you like to see?</h2>
            <p className="paragraph">You can only select one</p>
            <div className={styles.checkboxesContainer}> 
              <AnimalOptions options={animals}/>
            </div>
            <h2 className="heading-2">How far are you willing to go?</h2>
            <NumberInput fontFamily="Raleway" focusBorderColor="brand.100" min={1} value={distance} onChange={handleNumberChange}>
              <NumberInputField placeholder="km" />
              <NumberInputStepper color="rgb(109, 125, 139)">
                <NumberIncrementStepper _active={{ color: "rgb(255, 165, 0)" }} />
                <NumberDecrementStepper _active={{ color: "rgb(255, 165, 0)" }} />
              </NumberInputStepper>
            </NumberInput>
          </div>)}
        {step === 3 && <Button type="submit" color="brand-default" block disabled={isDisabled}>SUBMIT</Button>}
        </form>
        {step < 3 && <Button type="button" color="brand-default" block onClick={() => setStep(step + 1)} disabled={isDisabled}>NEXT</Button>}
        <div className={styles.bg}>
          <img src={bg} alt=""/>
        </div>
      </div>
    </div>
  );
}

export default UserOnboarding;
