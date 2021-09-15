import React from "react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react"

import styles from "./BasicPasswordInput.module.css"

function PasswordInput(props) {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  const {
    placeholder,
    name,
    outline = false,
    onChange,
    required = false,
  } = props;

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          input-text
          ${outline ? styles.inputError : styles.baseStyles}
        `}
        border="2px"
        borderColor="brand.400"
        errorBorderColor="red.300"
        focusBorderColor="brand.100"
        required={required}
      />
      <InputRightElement width="4.5rem" >
        <Button h="1.75rem" size="sm" className="input-text" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

export default PasswordInput;