import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import BasicDescription from "components/BasicDescription";
import BasicLabel from "components/BasicLabel";
import BasicHR from "components/BasicHR";
import Button from "components/Button";

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
} from "@chakra-ui/react"

function UserSettingsPreferences() {
	const history = useHistory();
  const format = (val) => "" + val
  const parse = (val) => val.replace(/^\$/, "")
  const [ currentType, setCurrentType ] = useState(null)
  const [ currentDistance, setCurrentDistance ] = useState(null)
  const [ currentAction, setCurrentAction ] = useState(null)
  const [ type, setType ] = useState(null);
  const [ distance, setDistance ] = useState(0);
  const [ action, setAction ] = useState(null);
  const [ isSaveDisabled, setIsSaveDisabled ] = useState(true);
	const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
	const loginType = useSelector((s) => s.auth.loginType);

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
      setType(body.user.preferredAnimal)
      setAction(body.user.action)
      setDistance(body.user.preferredDistance)
      setCurrentType(body.user.preferredAnimal)
      setCurrentDistance(body.user.preferredDistance)
      setCurrentAction(body.user.action)

    })
    setCurrentDistance({
      distance: (distance) => distance.replace(/^\$/, "")
    })

    // console.log(type)
  }, [])

  const handleChange = (e, setData) => {
    const data= e.target.value
    // console.log(data)
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

    //submit to backend
    fetch(
      `http://localhost:8081/api/0.1/user/` + `12`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ preferredAnimal: type, action: action, preferredDistance: distance })
      }
    )
    .then(response => {
      if(response.status === 200) {
        console.log(response.status);
      }
    })
    window.location.reload(false);  //auto-reload to render the changes in the state but it needs the refresh token
  }

  return (

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
  )
}

export default UserSettingsPreferences;