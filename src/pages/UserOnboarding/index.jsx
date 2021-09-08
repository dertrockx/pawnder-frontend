import React, { useState } from 'react';
import { IoLocationSharp, IoArrowBack } from 'react-icons/io5';

import Button from 'components/Button';
import BasicInput from 'components/BasicInput';
import Checkbox from 'components/Checkbox';
import Radio from 'components/Radio';

import logo from 'assets/logo.svg';
import dogAdopting from 'assets/dogAdopting.png';
import catFostering from 'assets/catFostering.png';
import noPhoto from 'assets/noPhoto.png';

import styles from './UserOnboarding.module.css';
import { useHistory } from 'react-router';

const UserOnboarding = () => {
  const current = new Date().toISOString().split("T")[0];
  const [imagePreview, setImagePreview] = useState(`${noPhoto}`);
  const [imagePreviewError, setImagePreviewError] = useState(false);
  const [step, setStep] = useState(1);
  const history = useHistory();
  const [value, setValue] = useState({
    photo: '', // or photoURL?
    firstName: '',
    middleName: '',
    lastName: '',
    birthDate: '',
    sex: '',
    contactNumber: '',
    address: '', // when reverse geocoded
    locationLat: '',
    locationLong: '',
    action: '',
    preferredAnimals: [],
    preferredDistance: '',
  });

  // Create custom hook for accessing user's location
  // if ("geolocation" in navigator) {
  //   console.log('Available');
  // } else {
  //   console.log('Unavailable');
  // }

  // navigator.geolocation.getCurrentPosition((position) => {
  //   console.log("Latitude: " + position.coords.latitude);
  //   console.log("Longitude: " + position.coords.longitude);
  // })

  const animals = [
    { text: 'dogs', value: 'dogs' },
    { text: 'cats', value: 'cats' },
    { text: 'fish & aquariums', value: 'fish' },
    { text: 'reptiles & amphibians', value: 'reptilesAndAmphibians' },
    { text: 'exotic pets', value: 'exoticPets' },
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
            checked={value.preferredAnimals.includes(`${choice.value}`)}
          />
        </div>
      ))}
      </>
    );
  }

  // For input of type checkbox
  const handleCheck = (e) => {
    let newArray = [...value.preferredAnimals, e.target.id];
    if (value.preferredAnimals.includes(e.target.id)) {
      newArray = newArray.filter(animal => animal !== e.target.id);
    }
    setValue({
      ...value, 
      preferredAnimals: newArray
    });
  };

  // For input of types text or radio
  const handleChange = (e) => {
      setValue({
        ...value,
        [e.target.name]: e.target.value,
      });
  
    // For testing
    console.log(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    // Redirect to feed after onboarding, put this inside .then when successful
    // history.push('/feed');

    // For testing
    console.log(value);
  }

  // There is no handleStepDown as the button for going back is outside the form.
  const handleStepUp = (e) => {
    /*
      All buttons inside a form trigger the submit event.
      By using the preventDefault() method, the submit event will be canceled,
      thus, allowing multiple buttons inside a form.
    */
    e.preventDefault();
    setStep(step + 1);
  }
  
  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    const ALLOWED_TYPES=['image/png', 'image/jpg', 'image/jpeg'];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(`${reader.result}`)
      }
      setValue({
        ...value,
        photo: selected
      });
      reader.readAsDataURL(selected);
      setImagePreviewError(false);
    } else {
      /* 
        Selecting a file and cancelling returns undefined to selected.
        So if you select a file and cancel, the imagePreviewError would be set to true.
        We don't want that so we check if selected === undefined. If it's true, then we don't give out any errors.
      */
      if (selected === undefined) {
        return;
      }
      setImagePreviewError(true);
    }
  }

  return (
    <div>
      <div className="{styles.topItems}" >
        <img src = {logo} alt = "logo" className = "{styles.logo}" />
        {step > 1 && (<Button size="small" onClick={() => setStep(step - 1)}><IoArrowBack /></Button>)}
      </div>
      <div className="{styles.formContainer}" >
        <form className="form" onSubmit={handleSubmit}>
          {step === 1 && (
          <div className="{styles.formGroup}" >
            <h2 className="heading-2">Welcome! Let's create your profile</h2>
            <div className={styles.imageContainer}>
              <div className="{styles.imageHolder}">
                <img src={imagePreview} alt="" className={styles.img}/>
              </div>
              <input className={styles.hideInput} type="file" accept="image/jpeg, image/jpg, image/png" id="image" onChange={handleImageChange} />
              {/* Cannot use button as label for adding photo */}
              <div>
                <label className={styles.imageUploadLabel} htmlFor="image">
                  Choose Photo
                </label>
                {imagePreviewError === true && (<p className="paragraph">We don't support that file type.</p>)}
              </div>
            </div>
            <div className="{styles.formItem}" >
              <label className="bold-text">First Name</label>
                <BasicInput
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  value={value.firstName}
                  placeholder="First Name"
                />
            </div>
            <div className="{styles.formItem}" >
              <label className="bold-text">Middle Name</label>
              <BasicInput
                type="text"
                name="middleName"
                onChange={handleChange}
                value={value.middleName}
                placeholder="Middle Name (optional)"
              />
            </div>
            <div className="{styles.formItem}" >
              <label className="bold-text">Last Name</label>
              <BasicInput
                type="text"
                name="lastName"
                onChange={handleChange}
                value={value.lastName}
                placeholder="Last Name"
              />
            </div>
            <div>
              <label className="bold-text">Sex</label>
              <Radio 
                name="sex"
                value="male"
                label="Male"
                onChange={handleChange}
                checked={value.sex === "male"}
              />
              <Radio 
                name="sex"
                value="female"
                label="Female"
                onChange={handleChange}
                checked={value.sex === "female"}
              />
            </div>
            <div className="{styles.formItem}" >
              <label className="bold-text">Date of Birth</label>
              <BasicInput
                type="date"
                name="birthDate"
                onChange={handleChange}
                value={value.birthDate}
                max={current}
              />
            </div>
            <div className="{styles.formItem}" >
              <label className="bold-text">Contact Number</label>
              <BasicInput
                type="text"
                name="contactNumber"
                onChange={handleChange}
                value={value.contactNumber}
                placeholder="Contact Number"
              />
            </div>
            <div className="{styles.formItem}" >
              <label className="bold-text">Address</label>
              <BasicInput
                type="text"
                name="address"
                onChange={handleChange}
                value={value.address} 
                placeholder="Address"
              />
              {/* <Button size="small" color="brand-default"><IoLocationSharp /></Button> */}
            </div>
          </div>)}
          {step === 2 && (
          <div className="{styles.formGroup}" >
            <h2 className="heading-2">What brings you to Pawnder?</h2>
            <div className="{styles.actionCardsContainer}"> 
              <label>
                <div className="{value.action !== 'adopting' ? styles.actionCard : styles.actionCardSelected}" >
                  <img src={dogAdopting} alt="" className="{styles.actionCardImage}" />
                  <h3 className="heading-3">I'm adopting</h3>
                  <p className="paragraph">Give an animal a second chance by providing a loving furrever home.</p>
                  <input
                    type="radio"
                    name="action"
                    value="adopting"
                    onChange={handleChange}
                    checked={value.action === 'adopting'}
                  />
                </div>
              </label>
              <label>
                <div className="{value.action !== 'fostering' ? styles.cardPreferences : styles.cardPreferencesSelected}">
                  <img src={catFostering} alt="" className="{styles.actionCardImage}" />
                  <h3 className="heading-3">I'm fostering</h3>
                  <p className="paragraph">Temporarily care for a furry friend in need until a suitable home is found.</p>
                  <input
                    type="radio"
                    name="action"
                    value="fostering"
                    onChange={handleChange}
                    checked={value.action === 'fostering'}
                  />
                </div>
              </label>
            </div>
          </div>)}
          {step === 3 && (
          <div className="{styles.formGroup}">
            <h2 className="heading-2">Which animal/s would you like to see?</h2>
            <p className="paragraph">You can select multiple</p>
            <div className="{styles.checkboxesContainer}"> 
              <AnimalOptions options={animals}/>
            </div>
            <h2 className="heading-2">How far are you willing to go?</h2>
            <BasicInput
              type="number"
              min="1"
              name="preferredDistance"
              onChange={handleChange}
              value={value.preferredDistance}
              placeholder="Distance in km"
            />
          </div>)}
        {step < 3 ? (<Button type="button" color="brand-default" block onClick={handleStepUp} >NEXT</Button>) : (<Button type="submit" color="brand-default" block>SUBMIT</Button>)}
      </form>
      </div>
    </div>
  );
}

export default UserOnboarding;