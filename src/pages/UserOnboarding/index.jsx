import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { IoLocationSharp, IoArrowBack } from 'react-icons/io5';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
} from '@chakra-ui/react';

import Button from 'components/Button';
import BasicInput from 'components/BasicInput';
import Checkbox from 'components/Checkbox';
import Radio from 'components/Radio';

import logo from 'assets/logo.svg';
import dogAdopting from 'assets/dogAdopting.png';
import catFostering from 'assets/catFostering.png';
import noPhoto from 'assets/noPhoto.png';
import bg from 'assets/userOnboardingBackground.png'
import styles from './UserOnboarding.module.css';


const UserOnboarding = () => {
  const current = new Date().toISOString().split("T")[0];
  const [imagePreview, setImagePreview] = useState(`${noPhoto}`);
  const [imagePreviewError, setImagePreviewError] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [step, setStep] = useState(1);
  const [isDisabled, setIsDisabled] = useState(true); // set to false when testing and comment out useEffect
  const history = useHistory();
  const [distance, setDistance] = useState(''); // for chakra-ui NumberInput
  const [values, setValues] = useState({
    photo: '', // or photoURL?
    firstName: '',
    middleName: '',
    lastName: '',
    birthDate: '',
    sex: '',
    contactNumber: '',
    locationLat: '',
    locationLong: '',
    action: '',
    preferredAnimals: [],
    preferredDistance: '',
  });

  // For disabling buttons
  useEffect(() => {
    // If step 1, check photo, first and last names, bday, sex, number, and loc coordinates
    // If step 2, check action
    // If step 3, check preferred animals and distance

    if (step === 1) {
      if (values.photo !== '' && values.firstName !== '' && values.lastName !== '' && values.birthDate !== '' && values.sex !== '' && values.contactNumber !== '' && values.locationLat !== '' && values.locationLong !== '') {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
      setImagePreviewError(false);
    } else if (step === 2) {
      if (values.action !== '') {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    } else if (step === 3) {
      if (values.preferredAnimals !== [] && values.preferredDistance !== '') {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }
  }, [values, step]);

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
        <div className="{styles.checkboxItem}" key={index} >
          <Checkbox
            id={choice.value}
            label={choice.text}
            onChange={handleCheck}
            checked={values.preferredAnimals.includes(`${choice.value}`)}
          />
        </div>
      ))}
      </>
    );
  }

  // For chakra-ui's number input
  const handleNumberChange = (distance) => {
    setDistance(distance);
    setValues({
      ...values, 
      preferredDistance: distance
    });
  }

  // For input of type checkbox
  const handleCheck = (e) => {
    let newArray = [...values.preferredAnimals, e.target.id];
    if (values.preferredAnimals.includes(e.target.id)) {
      newArray = newArray.filter(animal => animal !== e.target.id);
    }
    setValues({
      ...values, 
      preferredAnimals: newArray
    });
  };

  // For input of types text or radio
  const handleChange = (e) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
  
    // For testing
    console.log(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    // Redirect to feed after onboarding, put inside .then when successful
    // history.push('/feed');

    // For testing
    console.log(values);
  }

  // TASK: If possible, create custom hook
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
        photo: selected
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
        setImagePreviewError(false);
        return;
      }
      setImagePreviewError(true);
    }
  }

  // TASK: Create custom hook for accessing user's location
  const onSuccess = (position) => {
    setValues({
      ...values,
      locationLat: position.coords.latitude,
      locationLong: position.coords.longitude,
    });
    setLocationError('');
  }

  const onError = () => {
    setLocationError('Unable to retrieve your location. Please enable permissions.');
  }

  const handleLocation = (e) => {
    /*
      All buttons inside a form trigger the submit event.
      By using the preventDefault() method, the submit event will be canceled,
      thus, allowing multiple buttons inside a form.
    */
    e.preventDefault();
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
      
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.topItems} >
        <img src = {logo} alt = "logo" className={styles.logo} />
        {step > 1 && (<Button size="small" onClick={() => setStep(step - 1)}><IoArrowBack /></Button>)}
      </div>
      <div className={styles.formContainer} >
        <form className="form" onSubmit={handleSubmit}> 
          {step === 1 && (
          <div className={styles.formGroup} >
            <h2 className="heading-2">Welcome! Let's create your profile</h2>
            <div className={styles.imageContainer}>
              <img src={imagePreview} alt="" className={styles.img}/>
              <input className={styles.hideInput} type="file" accept="image/jpeg, image/jpg, image/png" id="image" onChange={handleImageChange} />
              {/* Cannot use button as label for adding photo. */}
              <div className={styles.imageContainerRight}>
                <label className={styles.imageUploadLabel} htmlFor="image">
                  Choose Photo
                </label>
                {imagePreviewError === true && (<p className="paragraph">We don't support that file type.</p>)}
              </div>
            </div>
            <div className={styles.formFields} >
              <div className={styles.formItem} >
                <label className="bold-text">First Name</label>
                  <BasicInput
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    value={values.firstName}
                    placeholder="First Name"
                  />
              </div>
              <div className={styles.formItem} >
                <label className="bold-text">Middle Name</label>
                <BasicInput
                  type="text"
                  name="middleName"
                  onChange={handleChange}
                  value={values.middleName}
                  placeholder="Middle Name (optional)"
                />
              </div>
              <div className={styles.formItem} >
                <label className="bold-text">Last Name</label>
                <BasicInput
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  value={values.lastName}
                  placeholder="Last Name"
                />
              </div>
              <div className={styles.formItemSex}>
                <label className="bold-text">Sex</label>
                <div style={{marginLeft: "10px", display: "flex", flexFlow: "row", gap: "10px"}}>
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
              <div className={styles.formItem} >
                <label className="bold-text">Date of Birth</label>
                <BasicInput
                  type="date"
                  name="birthDate"
                  onChange={handleChange}
                  value={values.birthDate}
                  max={current}
                />
              </div>
              <div className={styles.formItem} >
                <label className="bold-text">Contact Number</label>
                <BasicInput
                  type="tel"
                  name="contactNumber"
                  onChange={handleChange}
                  value={values.contactNumber}
                  placeholder="Contact Number"
                />
              </div>
              <div className={styles.formItem} >
                <label className="bold-text">Location</label>
                {(values.locationLat !== '' && values.locationLong !== '') ? <Button size="small" color="brand-default" onClick={handleLocation}> <span>Location enabled</span><IoLocationSharp /> </Button> : <Button size="small" color="brand-default" onClick={handleLocation} variant="outline"><IoLocationSharp /> <span>Enable location</span></Button> }
                {locationError !== '' && <p className="paragraph">{locationError}</p>}
              </div>
            </div>
          </div>)}
          {step === 2 && (
          <div className={styles.formGroup} >
            <h2 className="heading-2">What brings you to Pawnder?</h2>
            <div className={styles.cardDisplay}> 
              <label>
                <div className={values.action !== 'adopt' ? styles.cardPreferences : styles.cardPreferencesSelected} >
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
            <h2 className="heading-2">Which animal/s would you like to see?</h2>
            <p className="paragraph">You can select multiple</p>
            <div className={styles.checkboxesContainer}> 
              <AnimalOptions options={animals}/>
            </div>
            <h2 className="heading-2">How far are you willing to go?</h2>
            <NumberInput focusBorderColor="rgb(255, 165, 0)" min={1} value={distance} onChange={handleNumberChange}>
              <NumberInputField />
              <NumberInputStepper color="rgb(109, 125, 139)">
                <NumberIncrementStepper _active={{ color: "rgb(255, 165, 0)" }} />
                <NumberDecrementStepper _active={{ color: "rgb(255, 165, 0)" }} />
              </NumberInputStepper>
            </NumberInput>
          </div>)}
        {step === 3 && <Button type="submit" color="brand-default" block disabled={isDisabled}>SUBMIT</Button>}
      </form>
      {step < 3 && <Button type="button" color="brand-default" block onClick={() => setStep(step + 1)} disabled={isDisabled} >NEXT</Button>}
      </div>
      <div className={styles.bg}>
        <img src={bg} />
      </div>
    </div>
  );
}

export default UserOnboarding;