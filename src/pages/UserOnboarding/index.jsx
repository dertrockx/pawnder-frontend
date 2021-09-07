import React, { useState } from 'react';
import Button from "components/Button";
import BasicInput from 'components/BasicInput';
import styles from './UserOnboarding.module.css';
import { IoLocationSharp, IoArrowBack } from 'react-icons/io5';

import Checkbox from 'components/Checkbox';
import Radio from 'components/Radio';

import dogAdopting from 'assets/dogAdopting.png';
import catFostering from 'assets/catFostering.png';
import logo from 'assets/logo.svg';


const UserOnboarding = () => {
  const current = new Date().toISOString().split("T")[0];
  const [step, setStep] = useState(1);
  const [value, setValue] = useState({
    // Include picture here
    firstName: null,
    middleName: '', // Set to an empty string because it's optional (to allow disabling button)
    lastName: null,
    birthDate: null,
    contactNumber: null,
    address: null, 
    reasonPreferences: "",
    animalPreferences: [],
    locationPreferences: null,
    trialLang: "",
  });

  const animals = [
    { text: 'dogs', value: 'dogs' },
    { text: 'cats', value: 'cats' },
    { text: 'fish & aquariums', value: 'fish' },
    { text: 'reptiles & amphibians', value: 'reptilesAndAmphibians' },
    { text: 'exotic pets', value: 'exoticPets' },
    { text: 'rabbits', value: 'rabbits' },
    { text: 'rodents', value: 'rodents' }
  ]

  const AnimalOptions = ({options}) => {
    return (
      <> 
        {options.map((choice, index) => (
        <React.Fragment key={index}>
          <Checkbox
            id={choice.value}
            label={choice.text}
            onChange={handleCheck}
            checked={value.animalPreferences.includes(`${choice.value}`)}
          />
        </React.Fragment>
      ))}
      </>
    );
  }

  const handleCheck = (e) => {
    let newArray = [...value.animalPreferences, e.target.id];
    if (value.animalPreferences.includes(e.target.id)) {
      newArray = newArray.filter(animal => animal !== e.target.id);
    }
    setValue({
      ...value, 
      animalPreferences: newArray
    });    
  };

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
    console.log(value);
  }

  return (
    <div>
      {/* For testing */}
      <div className={styles.topItems}>
        <img src = {logo} alt = "logo" className = {styles.logo} />
        {step > 1 && (<Button size="small" onClick={() => setStep(step - 1)}><IoArrowBack /></Button>)}
      </div>
      <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {step === 1 && (
        <div className={styles.formGroup}>
          <h2 className="heading-2">Welcome! Let's create your profile</h2>
          <div className={styles.profileFormLabel} >
            <label className="bold-text">First Name</label>
              <BasicInput
                type="text"
                name="firstName"
                onChange={handleChange}
                value={value.firstName}
                placeholder="First Name"
              />
          </div>
          <div className={styles.profileFormLabel} >
            <label className="bold-text">Middle Name</label>
            <BasicInput
              type="text"
              name="middleName"
              onChange={handleChange}
              value={value.middleName}
              placeholder="Middle Name (optional)"
            />
          </div>
          <div className={styles.profileFormLabel} >
            <label className="bold-text">Last Name</label>
            <BasicInput
              type="text"
              name="lastName"
              onChange={handleChange}
              value={value.lastName}
              placeholder="Last Name"
            />
          </div>
          <div className={styles.profileFormLabel} >
            <label className="bold-text">Date of Birth</label>
            <BasicInput
              type="date"
              name="birthDate"
              onChange={handleChange}
              value={value.birthDate}
              max={current}
            />
          </div>
          <div className={styles.profileFormLabel} >
            <label className="bold-text">Contact Number</label>
            <BasicInput
              type="text"
              name="contactNumber"
              onChange={handleChange}
              value={value.contactNumber}
              placeholder="Contact Number"
            />
          </div>
          <div className={styles.profileFormLabel} >
            <label className="bold-text">Address</label>
            <BasicInput
              type="text"
              name="address"
              onChange={handleChange}
              value={value.address} 
              placeholder="Address"
            />
          </div>
          <div>
          <Radio 
            name="trialLang"
            value="first"
            label="First choice"
            onChange={handleChange}
            checked={value.trialLang === "first"}
          />
          <Radio 
            name="trialLang"
            value="second"
            label="Second choice"
            onChange={handleChange}
            checked={value.trialLang === "second"}
          />
          </div>
          {/* <Button size="small" color="brand-default"><IoLocationSharp /></Button> */}
        </div>)}
        {step === 2 && (
        <div className={styles.formGroup}>
          <h2 className="heading-2">What brings you to Pawnder?</h2>
          <div className={styles.cardDisplay}>
            <label>
              <div className={value.reasonPreferences !== "adopting" ? styles.cardPreferences : styles.cardPreferencesSelected} >
                <img src={dogAdopting} alt="" className={styles.cardImage} />
                <h3 className="heading-3">I'm adopting</h3>
                <p className="paragraph">Give an animal a second chance by providing a loving furrever home.</p>
                <input
                  type="radio"
                  name="reasonPreferences"
                  value="adopting"
                  onChange={handleChange}
                  checked={value.reasonPreferences === "adopting"}
                />
              </div>
              </label>
                <label>
                  <div className={value.reasonPreferences !== "fostering" ? styles.cardPreferences : styles.cardPreferencesSelected}>
                    <img src={catFostering} alt="" className={styles.cardImage} />
                    <h3 className="heading-3">I'm fostering</h3>
                    <p className="paragraph">Temporarily care for a furry friend in need until a suitable home is found.</p>
                    <input
                      type="radio"
                      name="reasonPreferences"
                      value="fostering"
                      onChange={handleChange}
                      checked={value.reasonPreferences === "fostering"}
                    />
                  </div>
              </label>
            </div>
        </div>)}
        {step === 3 && (
        <div className={styles.formGroup}>
          <h2 className="heading-2">Which animal/s would you like to see?</h2>
          <p className="paragraph">You can select multiple</p>
          {/* change to styles.checkboxContainer */}
          <div className={styles.checkboxes}> 
            <AnimalOptions options={animals}/>
          </div>
          <h2 className="heading-2">How far are you willing to go?</h2>
          <BasicInput
            type="number"
            min="1"
            name="locationPreferences"
            onChange={handleChange}
            value={value.locationPreferences}
            placeholder="Distance in km"
          />
        </div>)}
        {step === 3 && (<Button type="submit" color="brand-default" block>SUBMIT</Button>)}
      </form>
      {step < 3 ? 
        (<Button color="brand-default" block onClick={() => setStep(step + 1)}>NEXT</Button>) : 
        null}
      </div>
    </div>
  );
}

export default UserOnboarding;