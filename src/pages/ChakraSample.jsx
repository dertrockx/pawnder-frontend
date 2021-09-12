import React from "react";
import { Button, Heading } from "@chakra-ui/react";
function ChakraSample() {
	return (
		<div>
			<h1 className="heading-1">Button from chakra ui</h1>
			<Button colorScheme="brand.200">I am a default button</Button>
			<Heading color="brand.100">I am a brand text</Heading>
		</div>
	);
}

export default ChakraSample;
