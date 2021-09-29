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
  const [ type, setType ] = useState(null);
  const [ distance, setDistance ] = useState(0);
  const [ action, setAction ] = useState(null);
	const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);

  //checks if user is authenticated
  useEffect(() => {
    // if(!isAuthenticated) history.replace("/user/login")
  }, [])

  const handleChange = (e) => {
    setType(e.target.value)
	}

  const handleSubmit = (e) => {
    e.preventDefault();

    //submit to backend

  }

  useEffect(()=>{
    console.log(type)
    console.log(distance)
    console.log(action)
  });

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
                placeholder="Select type" 
                name="type" 
                onChange={handleChange} 
                focusBorderColor="brand.100"
              >
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="fish and aquariums">Fish and Aquariums</option>
                <option value="reptiles and amphibians">Reptile / Amphibian</option>
                <option value="exotic pets">Exotic Pets</option>
                <option value="rabbits">Rabbits</option>
                <option value="rodents">Rodents</option>
              </Select>
            </div>
          </div>


          <div className={styles.row}>
            <div className={styles.label}>
              <BasicLabel label="Distance"/>
            </div>
            <div className={styles.input}>
            <NumberInput 
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
                <Button onClick={handleSubmit} color="brand-default" size="small" block>Save</Button>
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