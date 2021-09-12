import React, { useState } from "react";
import BasicSideBar from "components/BasicSideBar";
import styles from "./UserSettings.module.css"
import { IoSettingsSharp } from "react-icons/io5"

function UserSettings() {
  const [ value, setValue ] = useState({
    firstName: null,
    middleName: null,
    lastName: null,
    birthDate: null,
    contactNumber: null,
    email: null,
    currentPassword: null,
    newPassword: null,
    confirmPassword: null
  });

  function clickInformation() {

  }

  function clickPreferences() {

  }

  return (
    <div>
      <div className="heading-2">
        <span style={{ width: 50, height: 50 }}><IoSettingsSharp /></span> Settings
      </div>
      <div>
        <BasicSideBar /> 
        {/* <div className="heading-3">
          <div onClick={clickInformation}>
            Information
          </div>
          <div onClick={clickPreferences}>
            Preferences
          </div>
        </div> */}
        <div>

        </div>
      </div>

    </div>
  )
}

export default UserSettings;