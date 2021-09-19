import React from 'react';
import { Input, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { IoEye, IoEyeOff } from 'react-icons/io5';

function PasswordInput(props) {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  const {
    placeholder,
    name,
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
        borderWidth="2px"
        focusBorderColor="brand.100"
        required={required}
      />
      <InputRightElement width="4.5rem" >
        <IconButton icon={show ? <IoEyeOff /> : <IoEye /> } backgroundColor="white" h="2rem" size="lg" className="input-text" onClick={handleClick} focusBorderColor="none" />
      </InputRightElement>
    </InputGroup>
  )
}

export default PasswordInput;