import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { IoLocationSharp, IoArrowBack } from 'react-icons/io5';
import axios from 'axios';

import Button from 'components/Button';
import BasicInput from 'components/BasicInput';
import Checkbox from 'components/Checkbox';
import Radio from 'components/Radio';

import logo from 'assets/logo.svg';
import dogAdopting from 'assets/dogAdopting.png';
import catFostering from 'assets/catFostering.png';
import noPhoto from 'assets/noPhoto.png';

import styles from './UserOnboarding.module.css';

const UserOnboarding = () => {
  const current = new Date().toISOString().split("T")[0];
  const [imagePreview, setImagePreview] = useState(`${noPhoto}`);
  const [imagePreviewError, setImagePreviewError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [step, setStep] = useState(1);
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();
  const [values, setValues] = useState({
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

  const accessToken =
	"pk.eyJ1IjoiZGVydHJvY2t4IiwiYSI6ImNrMXcwZHB0bjBmb2gzY216ODA0NDZ3MWsifQ.IoDpTejvyHpWvvj_cjjRlw";

  // axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${value.lat},${value.long}.json?access_token=${accessToken}`)
  // .then(({data})) => {}

  const reverseGeocode = async (lat, long) => {
    const query = await fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?types=poi&access_token=${accessToken}`,
			{ method: "GET" }
		);
    console.log(query);
    const json = await query.json();
    console.log(json);
    const address = json.features[0].place_name;
    console.log(address);

    setValues({
      ...values,
      address: address,
    })
  }

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
            checked={values.preferredAnimals.includes(`${choice.value}`)}
          />
        </div>
      ))}
      </>
    );
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
    
    // Redirect to feed after onboarding, put this inside .then when successful
    // history.push('/feed');

    // For testing
    console.log(values);
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
      setValues({
        ...values,
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

  // Create custom hook for accessing user's location || NOTE: It's not precise
  const handleLocation = (e) => {
    e.preventDefault();
    if (!navigator.geolocation) {
      setLocationError(true);
      setValues({
        ...values, 
        address: 'Please enable your location.'
      });
    } else {
      setLocationError(false);
      navigator.geolocation.getCurrentPosition((position) => {
        reverseGeocode(position.coords.latitude, position.coords.longitude);
        setValues({
          ...values,
          locationLat: position.coords.latitude,
          locationLong: position.coords.longitude,
        })
      })
    }

    // if ("geolocation" in navigator) {
    //   setLocationError(false);
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     reverseGeocode(position.coords.latitude, position.coords.longitude);
    //     setValues({
    //       ...values,
    //       locationLat: position.coords.latitude,
    //       locationLong: position.coords.longitude,
    //     })
    //   })
    // } else {
      
    // }
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
              <div className={styles.imageContainerRight}>
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
                  value={values.firstName}
                  placeholder="First Name"
                />
            </div>
            <div className="{styles.formItem}" >
              <label className="bold-text">Middle Name</label>
              <BasicInput
                type="text"
                name="middleName"
                onChange={handleChange}
                value={values.middleName}
                placeholder="Middle Name (optional)"
              />
            </div>
            <div className="{styles.formItem}" >
              <label className="bold-text">Last Name</label>
              <BasicInput
                type="text"
                name="lastName"
                onChange={handleChange}
                value={values.lastName}
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
                checked={values.sex === "male"}
              />
              <Radio 
                name="sex"
                value="female"
                label="Female"
                onChange={handleChange}
                checked={values.sex === "female"}
              />
            </div>
            <div className="{styles.formItem}" >
              <label className="bold-text">Date of Birth</label>
              <BasicInput
                type="date"
                name="birthDate"
                onChange={handleChange}
                value={values.birthDate}
                max={current}
              />
            </div>
            <div className="{styles.formItem}" >
              <label className="bold-text">Contact Number</label>
              <BasicInput
                type="text"
                name="contactNumber"
                onChange={handleChange}
                value={values.contactNumber}
                placeholder="Contact Number"
              />
            </div>
            <div className="{styles.formItem}" >
              <label className="bold-text">Address</label>
              <BasicInput
                type="text"
                name="address"
                onChange={handleChange}
                value={values.address} 
                placeholder="Address"
                disabled
              />
              <Button size="small" color="brand-default" onClick={handleLocation}><IoLocationSharp /></Button>
            </div>
          </div>)}
          {step === 2 && (
          <div className="{styles.formGroup}" >
            <h2 className="heading-2">What brings you to Pawnder?</h2>
            <div className="{styles.actionCardsContainer}"> 
              <label>
                <div className="{values.action !== 'adopting' ? styles.actionCard : styles.actionCardSelected}" >
                  <img src={dogAdopting} alt="" className="{styles.actionCardImage}" />
                  <h3 className="heading-3">I'm adopting</h3>
                  <p className="paragraph">Give an animal a second chance by providing a loving furrever home.</p>
                  <input
                    type="radio"
                    name="action"
                    value="adopting"
                    onChange={handleChange}
                    checked={values.action === 'adopting'}
                  />
                </div>
              </label>
              <label>
                <div className="{values.action !== 'fostering' ? styles.cardPreferences : styles.cardPreferencesSelected}">
                  <img src={catFostering} alt="" className="{styles.actionCardImage}" />
                  <h3 className="heading-3">I'm fostering</h3>
                  <p className="paragraph">Temporarily care for a furry friend in need until a suitable home is found.</p>
                  <input
                    type="radio"
                    name="action"
                    value="fostering"
                    onChange={handleChange}
                    checked={values.action === 'fostering'}
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
              value={values.preferredDistance}
              placeholder="Distance in km"
            />
          </div>)}
        { step < 3 ? (<Button type="button" color="brand-default" block onClick={handleStepUp} >NEXT</Button>) : (<Button type="submit" color="brand-default" block>SUBMIT</Button>)}
        {/* <ButtonEwan isDisabled={isDisabled}/> */}
      </form>
      </div>
    </div>
  );
}

export default UserOnboarding;