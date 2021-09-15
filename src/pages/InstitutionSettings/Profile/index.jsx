import React, { useState } from 'react';
import Button from 'components/Button';
import { IoLocationSharp } from 'react-icons/io5';
import { Input, Textarea } from '@chakra-ui/react';

import styles from './Profile.module.css';

import noPhoto from 'assets/noPhoto.png'; // Delete when states have moved up

const Profile = () => {
  // Move the states to index in insti settings
  const [ values, setValues ] = useState({
		image: '',
		name: '',
    email: '',
    contactNumber: '',
		description: '',
		websiteURL: '',
		facebookURL: '',
		twitterURL: '',
		messengerURL: '',
		instagramURL: '',
    locationLat: '',
    locationLong: '',
	});
	const [imagePreview, setImagePreview] = useState(`${noPhoto}`);
  const [imagePreviewError, setImagePreviewError] = useState(false);
  const [locationError, setLocationError] = useState('');

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

  // For testing
  console.log(e.target.name, e.target.value);
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

  const onSuccess = (position) => {
    setValues({
      ...values,
      locationLat: position.coords.latitude,
      locationLong: position.coords.longitude,
    });
    setLocationError('');
  }

  // Location handler
  const onError = () => {
    setLocationError('Unable to retrieve your location. Please enable permissions.');
  }

  const handleLocation = (e) => {
    /**
     * All buttons inside a form trigger the submit event.
     * By using the preventDefault() method, the submit event will be canceled,
     * thus, allowing multiple buttons inside a form.
     */
    e.preventDefault();
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
      
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    // Redirect to feed after onboarding, put inside .then when successful
    // history.push('/feed');

    // For testing
    console.log(values);
  }

  return (
    <div>
      <div>
        <h3 className="heading-3">Display Picture</h3>
        <p className="caption">Upload your display picture to share with users</p>
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
      </div>
      <div>
        <h3 className="heading-3">Description</h3>
        <p className="caption">Edit your description to let users get to know you better</p>
        <Textarea name="description" onChange={handleChange} focusBorderColor="rgb(255, 165, 0)" placeholder="Description" />
      </div>
      <div>
        <h3 className="heading-3">Account Information</h3>
        <p className="caption">Update your Information to display on your profile</p>
        <div>
          <p className="paragraph">Name</p>
          <Input name="name" onChange={handleChange} focusBorderColor="rgb(255, 165, 0)" placeholder="Institution Name" />
        </div>
        <div>
          <p className="paragraph">Email Address</p>
          <Input type="email" name="email" onChange={handleChange} focusBorderColor="rgb(255, 165, 0)" placeholder="Email Address" />
        </div>
        <div>
          <p className="paragraph">Contact Number</p>
          <Input type="number" name="contactNumber" onChange={handleChange} focusBorderColor="rgb(255, 165, 0)" placeholder="639xxxxxxxxx" />
        </div>
        <div>
          <p className="paragraph">Location</p>
          {(values.locationLat !== '' && values.locationLong !== '') ? <Button size="small" color="brand-default" onClick={handleLocation}> <span>Location updated</span><IoLocationSharp /> </Button> : <Button size="small" color="brand-default" onClick={handleLocation} variant="outline"><IoLocationSharp /> <span>Update location</span></Button> }
          {locationError !== '' && <p className="paragraph">{locationError}</p>}
        </div>
      </div>
      <div>
        <h3 className="heading-3">External links</h3>
        <p className="caption">Add your website and social media pages to connect with users</p>
        <div>
          <p className="paragraph">Website</p>
          <Input name="websiteURL" onChange={handleChange} focusBorderColor="rgb(255, 165, 0)" placeholder="www.yoursite.com" />
        </div>
        <div>
          <p className="paragraph">Facebook Link</p>
          <Input name="facebookURL" onChange={handleChange} focusBorderColor="rgb(255, 165, 0)" placeholder="www.facebook.com/yourpage" />
        </div>
        <div>
          <p className="paragraph">Messenger Link</p>
          <Input name="messengerURL" onChange={handleChange} focusBorderColor="rgb(255, 165, 0)" placeholder="www.messenger.com/yourpage" />
        </div>
        <div>
          <p className="paragraph">Instagram Link</p>
          <Input name="instagramURL" onChange={handleChange} focusBorderColor="rgb(255, 165, 0)" placeholder="www.instagram.com/yourpage" />
        </div>
        <div>
          <p className="paragraph">Twitter Link</p>
          <Input name="twitterURL" onChange={handleChange} focusBorderColor="rgb(255, 165, 0)" placeholder="www.twitter.com/yourpage" />
        </div>
      </div>
      <Button size="small" type="submit" color="brand-default" onClick={handleSubmit}>Save</Button>
    </div>
  );
}
 
export default Profile;