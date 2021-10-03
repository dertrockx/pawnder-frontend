import React, { useState, useEffect, useRef } from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import { Input, InputGroup, InputLeftAddon, Textarea, useToast, Tooltip} from '@chakra-ui/react';
import { Button as ChakraButton, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';
import axios from'axios'

import Button from 'components/Button';
import HR from 'components/HR';
import noPhoto from 'assets/noPhoto.png';
import LoadingPage from 'pages/LoadingPage';

import styles from './Profile.module.css';

const Profile = () => {
  // fetch user id here from redux login
  const id = 4;

  const [values, setValues] = useState({
		avatarPhoto: '',
		name: '',
    email: '',
    contactNumber: '',
		description: '',
    locationLat: '',
    locationLong: '',
		// websiteURL: '',
		// facebookURL: '',
		// twitterURL: '',
		// messengerURL: '',
		// instagramURL: '',
	});
  const [currentValues, setCurrentValues] = useState({
		avatarPhoto: '',
		name: '',
    email: '',
    contactNumber: '',
		description: '',
    locationLat: '',
    locationLong: '',
		// websiteURL: '',
		// facebookURL: '',
		// twitterURL: '',
		// messengerURL: '',
		// instagramURL: '',
	});
	const [imagePreview, setImagePreview] = useState(noPhoto);
  const [isImageRemoveDisabled, setIsImageRemoveDisabled] = useState(false); // set to false kapag may picture na talaga from fetched data
  const [isCancelDisabled, setIsCancelDisabled] = useState(true);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [loading, setLoading] = useState(true); // for fetching insti data and updating insti data
  const [hasError, setHasError] = useState(false); // for fetching insti data

  const toast = useToast();

  useEffect(() => {
    axios.get('http://localhost:8081/api/0.1/institution/' + id)
    .then(res => {
      console.log(res);
      const { institution } = res.data;
      return institution;
    })
    .then((institution) => {
      setValues({
        avatarPhoto: institution.photoUrl,
        name: institution.name,
        email: institution.email,
        contactNumber: institution.contactNumber,
        description: institution.description,
        locationLat: institution.locationLat,
        locationLong: institution.locationLong
      });

      setCurrentValues({
        avatarPhoto: institution.photoUrl,
        name: institution.name,
        email: institution.email,
        contactNumber: institution.contactNumber,
        description: institution.description,
        locationLat: institution.locationLat,
        locationLong: institution.locationLong
      });

      setImagePreview(institution.photoUrl);
      setLoading(false);
      setHasError(false);
    })
    .catch(err => {
      console.log(err)
      setLoading(false);
      setHasError(true);
    })
  }, []);

  // From Lea; compares current to initial values
  const checkObjects = (keys1) => {
    for (let key of keys1) {
      if (currentValues[key] !== values[key]) return false;
    }
    return true;
  }

  useEffect(() => {
    const keys1 = Object.keys(values);
    if (checkObjects(keys1)) {
      setIsSaveDisabled(true);
      setIsCancelDisabled(true);
    } else {
      if (currentValues.avatarPhoto === '' ) {
        setIsSaveDisabled(true);
        setIsCancelDisabled(false);
      } else {
        setIsSaveDisabled(false);
        setIsCancelDisabled(false);
      }
    }
  }, [currentValues]);

  // For cancel button
  const handleCancel = () => {
    // Set all currentValues to values
    setCurrentValues({
      avatarPhoto: values.avatarPhoto,
      name: values.name,
      email: values.email,
      contactNumber: values.contactNumber,
      description: values.description,
      locationLat: values.locationLat,
      locationLong: values.locationLong
    })

    setImagePreview(values.avatarPhoto);
  }

  const CancelAlertDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef();

    return(
      <>
        <Button size="small" type="submit" color="brand-default" variant="outline" onClick={() => {setIsOpen(true)}} disabled={isCancelDisabled} block>Cancel</Button>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader className="heading-3" textAlign="center">
                Are you sure you want to cancel your changes?
              </AlertDialogHeader>
              <AlertDialogFooter>
                <ChakraButton ref={cancelRef} onClick={onClose} _hover={{filter:"brightness(0.8)"}} _focus={{border:"none"}}>No, go back</ChakraButton>
                <ChakraButton ref={cancelRef} onClick={handleCancel} bg="rgb(237, 69, 93)" color="white" ml={3} _hover={{filter:"brightness(0.8)"}} _focus={{border:"none"}}>Yes, cancel my changes</ChakraButton>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    );
  }

  const SaveAlertDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef();

    const handleSave = () => {
      if (/^\d{10}$/.test(currentValues.contactNumber) === false) {
        toast({
          title: 'Contact number format is invalid.',
          status: 'error',
          position: 'top',
          duration: 5000,
          isClosable: true,
        });
      } else {
        setIsOpen(true)
      }
    }

    return(
      <>
        <Button size="small" type="submit" color="brand-default" onClick={handleSave} disabled={isSaveDisabled} block>Save</Button>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader className="heading-3" textAlign="center">
                Are you sure you want to save your changes?
              </AlertDialogHeader>
              <AlertDialogFooter>
                <ChakraButton ref={cancelRef} onClick={onClose} _hover={{filter:"brightness(0.8)"}} _focus={{border:"none"}}>No, go back</ChakraButton>
                <ChakraButton ref={cancelRef} onClick={handleSubmit} bg="rgb(0, 192, 77)" color="white" ml={3} _hover={{filter:"brightness(0.8)"}} _focus={{border:"none"}}>Yes, save my changes</ChakraButton>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    );
  }

  const handleChange = (e) => {
    setCurrentValues({
      ...currentValues,
      [e.target.name]: e.target.value,
    });
  }

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    const ALLOWED_TYPES=['image/png', 'image/jpg', 'image/jpeg'];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(`${reader.result}`)
      }
      setCurrentValues({
        ...currentValues,
        avatarPhoto: selected
      });
      reader.readAsDataURL(selected);
      setIsImageRemoveDisabled(false);
    } else {
      /** 
       * Selecting a file and cancelling returns undefined to selected.
       * So if you select a file and cancel, the imagePreviewError would be set to true.
       * We don't want that so we check if selected === undefined. If it's true, then we don't give out any errors.
       */       
      if (selected === undefined) {
        return;
      }
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
    setImagePreview(noPhoto);
    setCurrentValues({
      ...currentValues,
      avatarPhoto: ''
    });
    setIsImageRemoveDisabled(true);
  }

  // Location handler
  const onSuccess = (position) => {
    setValues({
      ...values,
      locationLat: position.coords.latitude,
      locationLong: position.coords.longitude,
    });
  }
  
  const onError = () => {
    toast({
      title: 'Unable to retrieve your location. Please enable permissions.',
      status: 'error',
      position: 'top',
      duration: 5000,
      isClosable: true,
    });
  }

  const handleLocation = () => {
    if (!navigator.geolocation) {
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

  // When insti confims that they would like to save their changes
  const handleSubmit = () => {
    // e.preventDefault(); 

    setLoading(true);

    const formData = new FormData();

    // for (const key in values) {
    //   formData.append(`${key}`, values[key])
    //   console.log(`${key}: ${values[key]}`)
    // }

    formData.append('avatarPhoto', currentValues.avatarPhoto);
    formData.append('name', currentValues.name);
    formData.append('description', currentValues.description);
    formData.append('contactNumber', currentValues.contactNumber);
    formData.append('locationLat', currentValues.locationLat);
    formData.append('locationLong', currentValues.locationLong);

    axios.put('http://localhost:8081/api/0.1/institution/' + id, formData)
    .then(res => {
      console.log(res);
      setLoading(false);
      toast({
        title: 'Successfully saved your changes.',
        status: 'success',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
      toast({
        title: 'Something went wrong. Please try again later.',
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    })

    // Might refetch insti data or use window reload

    // For testing
    console.log(values);
  }

  return (
    <>
      {loading
      ? <LoadingPage/>
      : <>
        {hasError
        ? <div className={styles.center}>
            <h1 className="heading-1" >Something went wrong. Please try again later.</h1>
          </div> 
        : <div>
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
                  {currentValues.avatarPhoto === ''
                  ? <Button size="small" color="brand-default" variant="outline" onClick={handleImageRemove} disabled={isImageRemoveDisabled}>Remove picture</Button>
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
                value={currentValues.description}
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
                    value={currentValues.name}
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
                        value={currentValues.email}
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
                      value={currentValues.contactNumber}
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
                  {/* Interchange current values and values */}
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
                  <Tooltip hasArrow label="Sorry. This feature is not yet available." bg={`var(--color-very-light-grey)`} color={`--color-black`} borderRadius="4px" fontFamily="Raleway">
                    <InputGroup>
                      <Input name="websiteURL"
                        onChange={handleChange}
                        placeholder="www.yoursite.com"
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
                  <p className="paragraph">Facebook Link</p>
                  <Tooltip hasArrow label="Sorry. This feature is not yet available." bg={`var(--color-very-light-grey)`} color={`--color-black`} borderRadius="4px" fontFamily="Raleway">
                    <InputGroup>
                      <Input
                        name="facebookURL"
                        onChange={handleChange}
                        placeholder="www.facebook.com/yourpage"
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
                  <p className="paragraph">Messenger Link</p>
                  <Tooltip hasArrow label="Sorry. This feature is not yet available." bg={`var(--color-very-light-grey)`} color={`--color-black`} borderRadius="4px" fontFamily="Raleway">
                    <InputGroup>
                      <Input
                        name="messengerURL"
                        onChange={handleChange}
                        placeholder="www.messenger.com/yourpage"
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
                  <p className="paragraph">Instagram Link</p>
                  <Tooltip hasArrow label="Sorry. This feature is not yet available." bg={`var(--color-very-light-grey)`} color={`--color-black`} borderRadius="4px" fontFamily="Raleway">
                    <InputGroup>
                      <Input
                        name="instagramURL"
                        onChange={handleChange}
                        placeholder="www.instagram.com/yourpage"
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
                  <p className="paragraph">Twitter Link</p>
                  <Tooltip hasArrow label="Sorry. This feature is not yet available." bg={`var(--color-very-light-grey)`} color={`--color-black`} borderRadius="4px" fontFamily="Raleway">
                    <InputGroup>
                      <Input
                        name="twitterURL"
                        onChange={handleChange}
                        placeholder="www.twitter.com/yourpage"
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
              </div>
            </div>
            <HR />
            <div style={{margin: "60px 0px"}} className={styles.bottomButtons} >
              <CancelAlertDialog />
              <SaveAlertDialog />
            </div>
          </div>
        }
        </>
      }
    </>
  );
}
 
export default Profile;