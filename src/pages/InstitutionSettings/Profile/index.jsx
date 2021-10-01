import React, { useState, useEffect } from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import { Input, InputGroup, InputLeftAddon, Textarea, useToast, Tooltip} from '@chakra-ui/react';
import axios from'axios'

import Button from 'components/Button';
import HR from 'components/HR';
import noPhoto from 'assets/noPhoto.png';

import styles from './Profile.module.css';


const Profile = () => {
  // fetch user id here from redux login
  const id = 4;

  const [values, setValues] = useState({
		photoURL: '',
		name: '',
    email: '',
    contactNumber: '',
		description: '',
		// websiteURL: '',
		// facebookURL: '',
		// twitterURL: '',
		// messengerURL: '',
		// instagramURL: '',
    locationLat: '',
    locationLong: '',
	});
  const [currentValues, setcurrentValues] = useState({
		photoURL: '',
		name: '',
    email: '',
    contactNumber: '',
		description: '',
		// websiteURL: '',
		// facebookURL: '',
		// twitterURL: '',
		// messengerURL: '',
		// instagramURL: '',
    locationLat: '',
    locationLong: '',
	});
	const [imagePreview, setImagePreview] = useState(`${noPhoto}`);
  const [isImageDisabled, setIsImageDisabled] = useState(true); // set to false kapag may picture na talaga from fetched data
  const [imagePreviewError, setImagePreviewError] = useState(false);
  const [locationError, setLocationError] = useState(false);

  const toast = useToast();

  useEffect(() => {
    axios.get('http://localhost:8081/api/0.1/institution/' + id)
    .then(res => {
      console.log(res);
      const { institution } = res.data;
      return institution;
    })
    .then((institution) => {
      console.log(institution);

      setValues({
        photoURL: institution.photoURL,
        name: institution.name,
        email: institution.email,
        contactNumber: institution.contactNumber,
        description: institution.description,
        locationLat: institution.locationLat,
        locationLong: institution.long
      });

      setcurrentValues({
        photoURL: institution.photoURL,
        name: institution.name,
        email: institution.email,
        contactNumber: institution.contactNumber,
        description: institution.description,
        locationLat: institution.locationLat,
        locationLong: institution.long
      });

    })
    .catch(err => {
      console.log(err)
    })
  }, []);

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
      setIsImageDisabled(false);
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
      toast({
        title: 'We don\'t support that file type.',
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  const handleImageRemove = () => {
    setImagePreview(`${noPhoto}`);
    setValues({
      ...values,
      image: ''
    });
    setImagePreviewError(false);
    setIsImageDisabled(true);
  }

  // Location handler
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

  const handleCancel = () => {
    alert("Cancelled");

    // Set all values to their initial state
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    // Should check contact number for pattern before submitting lol
    // values.contactNumber.match(/^\d{10}$/)
    
    // Redirect to feed after onboarding, put inside .then when successful
    // history.push('/feed');

    // For testing
    console.log(values);
  }

  return (
    <div>
      <div className={styles.halfField} >
        <div className={styles.leftLabel}>
          <h3 className="heading-3">Display Picture</h3>
          <p className="caption">Upload your display picture to share with users</p>
        </div>
        <div className={styles.imageContainer}>
          <img src={imagePreview} alt="" className={styles.img}/>
          <input className={styles.hideInput} type="file" accept="image/jpeg, image/jpg, image/png" id="image" onChange={handleImageChange} />
          <div className={styles.imageContainerRight}>
            {/* Cannot use button as label for adding photo. */}
            <label className={styles.imageUploadButton} htmlFor="image">
              Choose Picture
            </label>
            {values.image === ''
            ? <Button size="small" color="brand-default" variant="outline" onClick={handleImageRemove} disabled={isImageDisabled}>Remove picture</Button>
            : <Button size="small" color="brand-default" variant="outline" onClick={handleImageRemove}>Remove picture</Button>
            }
          </div>
        </div>
      </div>
      <div className={styles.halfField} >
        <div className={styles.leftLabel}>
          <h3 className="heading-3">Description</h3>
          <p className="caption">Edit your description to let users get to know you better</p>
        </div>
        <Textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          placeholder="Description"
          fontFamily="Raleway"
          borderWidth="2px"
          borderColor={"var(--color-light-grey)"}
          _hover={{borderColor: "var(--color-grey)"}}
          _focus={{borderColor: "brand.100", borderWidth: "2px"}}
        />
      </div>
      <HR />
      <div style={{marginTop: "60px", marginBottom:"28px"}} className={styles.halfField} >
        <div className={styles.leftLabel}>
          <h3 className="heading-3">Account Information</h3>
          <p className="caption">Update your Information to display on your profile</p>
        </div>
        <div>
          <div className={styles.twoFields}>
            <p className="paragraph">Name</p>
            <Input
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Institution Name"
              fontFamily="Raleway"
              borderWidth="2px"
              borderColor={"var(--color-light-grey)"}
              _hover={{borderColor: "var(--color-grey)"}}
              _focus={{borderColor: "brand.100", borderWidth: "2px"}}
            />
          </div>
          <div className={styles.twoFields}>
            <p className="paragraph">Email Address</p>
            <Tooltip hasArrow label="Sorry. This feature is not yet available." bg={`var(--color-very-light-grey)`} color={`--color-black`} borderRadius="4px" fontFamily="Raleway">
              <InputGroup>
                <Input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  fontFamily="Raleway"
                  borderWidth="2px"
                  borderColor={"var(--color-light-grey)"}
                  _hover={{borderColor: "var(--color-grey)"}}
                  _focus={{borderColor: "brand.100", borderWidth: "2px"}}
                  isDisabled={true}
                />
              </InputGroup>
            </Tooltip>
          </div>
          <div className={styles.twoFields}>
            <p className="paragraph">Contact Number</p>
            <InputGroup marginTop="10px">
              <InputLeftAddon children="+63" fontFamily="Raleway" />
              <Input
                type="tel"
                name="contactNumber"
                value={values.contactNumber}
                onChange={handleChange}
                onKeyPress={(e) => {
                  if (e.target.value.length > 9) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
                placeholder="Contact Number"
                fontFamily="Raleway"
                borderWidth="2px"
                borderColor={"var(--color-light-grey)"}
                _hover={{borderColor: "var(--color-grey)"}}
                _focus={{borderColor: "brand.100", borderWidth: "2px"}}
                />
              </InputGroup>
          </div>
          <div className={styles.twoFields}>
            <p className="paragraph">Location</p>
            {(values.locationLat !== currentValues.locationLat && values.locationLong !== currentValues.locationLat)
            ? <Button size="small" color="brand-default" onClick={handleLocation}> <span>Location updated</span><IoLocationSharp /> </Button>
            : <Button size="small" color="brand-default" onClick={handleLocation} variant="outline"><IoLocationSharp /> <span>Update location</span></Button> 
            }
          </div>
        </div>
      </div>
      <HR />
      <div style={{marginTop: "60px", marginBottom:"28px"}} className={styles.halfField}>
        <div className={styles.leftLabel}>
          <h3 className="heading-3">External Links</h3>
          <p className="caption">Add your website and social media pages to connect with users</p>
        </div>
        <div>
          <div className={styles.twoFields}>
            <p className="paragraph">Website</p>
            <Input name="websiteURL"
              onChange={handleChange}
              placeholder="www.yoursite.com"
              fontFamily="Raleway"
              borderWidth="2px"
              borderColor={"var(--color-light-grey)"}
              _hover={{borderColor: "var(--color-grey)"}}
              _focus={{borderColor: "brand.100", borderWidth: "2px"}}
            />
          </div>
          <div className={styles.twoFields}>
            <p className="paragraph">Facebook Link</p>
            <Input
              name="facebookURL"
              onChange={handleChange}
              placeholder="www.facebook.com/yourpage"
              fontFamily="Raleway"
              borderWidth="2px"
              borderColor={"var(--color-light-grey)"}
              _hover={{borderColor: "var(--color-grey)"}}
              _focus={{borderColor: "brand.100", borderWidth: "2px"}}
            />
          </div>
          <div className={styles.twoFields}>
            <p className="paragraph">Messenger Link</p>
            <Input
              name="messengerURL"
              onChange={handleChange}
              placeholder="www.messenger.com/yourpage"
              fontFamily="Raleway"
              borderWidth="2px"
              borderColor={"var(--color-light-grey)"}
              _hover={{borderColor: "var(--color-grey)"}}
              _focus={{borderColor: "brand.100", borderWidth: "2px"}}
            />
          </div>
          <div className={styles.twoFields}>
            <p className="paragraph">Instagram Link</p>
            <Input
              name="instagramURL"
              onChange={handleChange}
              placeholder="www.instagram.com/yourpage"
              fontFamily="Raleway" borderWidth="2px"
              focusBorderColor="brand.100"
            />
          </div>
          <div className={styles.twoFields}>
            <p className="paragraph">Twitter Link</p>
            <Input
              name="twitterURL"
              onChange={handleChange}
              placeholder="www.twitter.com/yourpage"
              fontFamily="Raleway"
              borderWidth="2px"
              borderColor={"var(--color-light-grey)"}
              _hover={{borderColor: "var(--color-grey)"}}
              _focus={{borderColor: "brand.100", borderWidth: "2px"}}
            />
          </div>
        </div>
      </div>
      <HR />
      <div style={{margin: "60px 0px"}} className={styles.bottomButtons} >
        <Button size="small" type="submit" color="brand-default" variant="outline" onClick={handleCancel} block>Cancel</Button>
        <Button size="small" type="submit" color="brand-default" onClick={handleSubmit} block>Save</Button>
      </div>
    </div>
  );
}
 
export default Profile;