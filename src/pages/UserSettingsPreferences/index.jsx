import React from "react";

import BasicSideBar from "components/BasicSideBar";
import BasicDescription from "components/BasicDescription";
import BasicLabel from "components/BasicLabel";
import BasicHR from "components/BasicHR";

import styles from "./UserSettingsPreferences.module.css"
import { IoSettingsSharp } from "react-icons/io5";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  ChevronDownIcon,
} from "@chakra-ui/react";

function UserSettingsPreferences() {

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
          ${styles.row}
          ${styles.container}
        `}>
          <div>
            <BasicDescription title="Basic Description" body="Customize your preferred animal type, distance and action."/>
          </div>
          <div>
            <div className={styles.row}>
              <div className={styles.label}>
                <BasicLabel label="Animal type"/>
              </div>
              <div className={styles.input}>
                {/* <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Type
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Dog</MenuItem>
                    <MenuItem>Cat</MenuItem>
                    <MenuItem>Fish and Aquariums</MenuItem>
                    <MenuItem>Reptiles and Amphibians</MenuItem>
                    <MenuItem>Exotic Pets</MenuItem>
                    <MenuItem>Rabbits</MenuItem>
                    <MenuItem>Rodents</MenuItem>
                  </MenuList>
                </Menu> */}
              </div>
            </div>
          </div>

          <BasicHR />
        </div>

      </div>

    </div>
  )
}

export default UserSettingsPreferences;