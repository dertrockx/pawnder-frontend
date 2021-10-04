import React, { useEffect, useState } from "react";
import history from "utils/history";
import { useSelector } from "react-redux";

import LoadingPage from 'pages/LoadingPage';
import BasicDescription from "components/BasicDescription";
import BasicLabel from "components/BasicLabel";
import BasicHR from "components/BasicHR";
import Button from "components/Button";

import moment from 'moment';
import styles from "./UserSettingsPreferences.module.css"
import {
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Radio, 
  RadioGroup,
  Stack,
  useToast,
} from "@chakra-ui/react";
import axios from "utils/axios";

function UserSettingsPreferences() {
  const format = (val) => "" + val
  const parse = (val) => val.replace(/^\$/, "")
  const [ currentType, setCurrentType ] = useState(null)
  const [ currentDistance, setCurrentDistance ] = useState(null)
  const [ currentAction, setCurrentAction ] = useState(null)
  const [ type, setType ] = useState(null);
  const [ distance, setDistance ] = useState(0);
  const [ action, setAction ] = useState(null);
  const [ isSaveDisabled, setIsSaveDisabled ] = useState(true);
  const [ loading, setLoading ] = useState(true); // for fetching insti data and updating insti data
  const [ hasError, setHasError ] = useState(false); // for fetching insti data
	const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
	const loginType = useSelector((s) => s.auth.loginType);
  const model = useSelector((s) => s.auth.model);
  const token = useSelector((s) => s.auth.token);
  const toast = useToast();
  //checks if user is authenticated
  useEffect(() => {
    if(!isAuthenticated && loginType !== "USER") return history.replace("/user/login")
    const id = Object.values(model)[1];

    try {
      axios.get(`/api/0.1/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(data => {
        console.log(data.data.user);
        const user = data.data.user;
        setType(user.preferredAnimal)
        setAction(user.action)
        setDistance(user.preferredDistance)
        setCurrentType(user.preferredAnimal)
        setCurrentDistance(user.preferredDistance)
        setCurrentAction(user.action)
      })
      setCurrentDistance({
        distance: (distance) => distance.replace(/^\$/, "")
      })
    } catch (error) { 
      console.log("================")
      console.log(error);
      setLoading(false);
      setHasError(true);
    }

    // fetch(
    //   `http://localhost:8081/api/0.1/user/` + id,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   }
    // )
    // .then(response => {
    //   if (response.status === 200){
    //     return response.json();
    //   }
    // })
    // .then(body => {
    //   setType(body.user.preferredAnimal)
    //   setAction(body.user.action)
    //   setDistance(body.user.preferredDistance)
    //   setCurrentType(body.user.preferredAnimal)
    //   setCurrentDistance(body.user.preferredDistance)
    //   setCurrentAction(body.user.action)

    // })
    // setCurrentDistance({
    //   distance: (distance) => distance.replace(/^\$/, "")
    // })

    // console.log(type)
  }, [token])

  const handleChange = (e, setData) => {
    const data= e.target.value
    setData(data)
	}

  useEffect(() => {
    if (type === currentType && 
      action === currentAction && 
      distance === currentDistance) {
        setIsSaveDisabled(true);
      } else {
        setIsSaveDisabled(false);
      }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Object.values(model)[1];

    try {
      axios.put(`/api/0.1/user/${id}`, {
        preferredAnimal: type,
        action: action, 
        preferredDistance: distance
      })
      .then(response => {
        console.log(response);
        setLoading(false);
        toast({
          title: 'Successfully saved your changes.',
          status: 'success',
          position: 'top',
          duration: 5000,
          isClosable: true,
        });
      })

    } catch (error) {
      console.log(error);
      setLoading(false);
      setHasError(true);
      toast({
        title: 'Something went wrong. Please try again later.',
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    }

    // fetch(
    //   `http://localhost:8081/api/0.1/user/` + id,
    //   {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({ preferredAnimal: type, action: action, preferredDistance: distance })
    //   }
    // )
    // .then(response => {
    //   if(response.status === 200) {
    //     console.log(response.status);
    //   }
    // })
    // window.location.reload(false);  //auto-reload to render the changes in the state but it needs the refresh token
  }

  return (
    <>
    {
      loading ? <LoadingPage /> :
      <>
      {
        hasError ? 
        <div className={styles.center}>
          <h1 className="heading-1" >Something went wrong. Please try again later.</h1>
        </div>
        :
        <div className={`
          ${styles.container}
        `}>
          <div className={styles.row}>
            <div>
              <BasicDescription title="Basic Description" body="Customize your preferred animal type, distance and action."/>
            </div>
            
            <div className={styles.spacing}>
              <div className={styles.row}>
                <div className={styles.label}>
                  <BasicLabel label="Animal type"/>
                </div>
                <div className={styles.input}>
                  <Select 
                    placeholder={currentType}
                    defaultValue={currentType}
                    name="type"
                    onChange={(e) => handleChange(e, setType)}
                    focusBorderColor="brand.100"
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Fish and Aquariums">Fish and Aquariums</option>
                    <option value="Reptiles and Amphibians">Reptile / Amphibian</option>
                    <option value="Exotic Pets">Exotic Pets</option>
                    <option value="Rabbits">Rabbits</option>
                    <option value="Rodents">Rodents</option>
                  </Select>
                </div>
              </div>


              <div className={styles.row}>
                <div className={styles.label}>
                  <BasicLabel label="Distance"/>
                </div>
                <div className={styles.input}>
                <NumberInput
                  placeholder="Type"
                  onChange={(valueString) => setDistance(parse(valueString))} 
                  value={format(distance)} 
                  min={0}
                  keepWithinRange={true}
                  focusBorderColor="brand.100"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.label}>
                  <BasicLabel label="Action"/>
                </div>
                <div className={styles.input}>
                <RadioGroup 
                  name="action" 
                  onChange={setAction} 
                  value={action}
                >
                  <Stack spacing={8} direction="row">
                    <Radio variantColor="brand.100" value="adopt">Adopt</Radio>
                    <Radio variantColor="brand.100" value="foster">Foster</Radio>
                  </Stack>
                </RadioGroup>
                </div>
              </div>

            </div>
          </div>

          <BasicHR />

          <div className={styles.row}>
            <div>
              <BasicDescription />
            </div>
            <div className={styles.spacing}>
                <div className={styles.row}>
                  <div className={styles.label}>
                    <BasicLabel />
                  </div>
                  <div className={styles.input}>
                    <Button onClick={handleSubmit} color="brand-default" size="small" block disabled={isSaveDisabled}>Save</Button>
                  </div>
                </div>
            </div>
          </div>
          <div className={styles.img}>
            <img src="/images/preferences.png" alt="hearts" />
          </div>

        </div>
      }
      </>
    }
    </>
  )
}

export default UserSettingsPreferences;