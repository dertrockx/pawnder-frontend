import React from 'react';
import { Input, InputGroup, InputRightElement, Button, Tooltip } from '@chakra-ui/react';
function PasswordInput(props) {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  const {
    placeholder,
    name,
    onChange,
  } = props;

  return (
    <Tooltip hasArrow label="Sorry. This feature is not yet available." bg={`var(--color-very-light-grey)`} color={`--color-black`} borderRadius="4px" fontFamily="Raleway">
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          borderWidth="2px"
          borderColor={"var(--color-light-grey)"}
          _hover={{borderColor: "var(--color-grey)"}}
          _focus={{borderColor: "brand.100", borderWidth: "2px"}}
          isDisabled={true} // remove when implementing change password functionality
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={handleClick}
            _focus={{border: "none"}}
            isDisabled={true}
          >
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </Tooltip>
  )
}

export default PasswordInput;