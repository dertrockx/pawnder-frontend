import React, { useEffect, useState } from "react";

import BasicSideBar from "components/BasicSideBar";
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

  const format = (val) => "" + val
  const parse = (val) => val.replace(/^\$/, "")

  const [ type, setType ] = useState(null);
  const [ distance, setDistance ] = useState(0);
  const [ action, setAction ] = useState(null);

  // const handleChange = (e) => {
  //   console.log(e.target.name);
  //   console.log(e.target.value);

	// 	setValue({
	// 		...value,
	// 		[e.target.name]: e.target.value,
	// 	});
	// }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(value);
  }

  useEffect(()=>{
    console.log(type)
    console.log(distance)
    console.log(action)
    // console.log(value)
  });

  return (
    <div>
      <div className={`
        heading-2
        ${styles.header}
        `}>
        Settings
      </div>

      <div className={styles.outerRow}>
        <BasicSideBar />

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
                  <Select placeholder="Select type" name="type" value={type}>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Fish and Aquariums">Fish & Aquariums</option>
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
                  onChange={(valueString) => setDistance(parse(valueString))} 
                  value={format(distance)} 
                  min={0}
                  keepWithinRange={false}
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
                <RadioGroup name="action" onChange={setAction} value={action}>
                  <Stack spacing={8} direction="row">
                    <Radio value="adopt" colorScheme="brand">Adopt</Radio>
                    <Radio value="foster" colorScheme="brand">Foster</Radio>
                  </Stack>
                </RadioGroup>
                </div>
              </div>


            </div>
          
          </div>
          <BasicHR />
          <div className={styles.container}>
          <div>
              <BasicDescription />
            </div>
            <div className={styles.row}>
              <div className={styles.label}></div>
              <div className={styles.input}>
                <Button onClick={handleSubmit} color="brand-default" size="small" block>Save</Button>
              </div>
            </div>

          </div>

          <img src="/images/preferences.png" alt="hearts" className={styles.img}/>

        </div>

      </div>

    </div>
  )
}

export default UserSettingsPreferences;