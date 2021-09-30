import React from "react";
import { Spinner, Center } from "@chakra-ui/react";

function LoadingPage() {
	return (
		<Center height="100vh">
			<Spinner
				thickness="4px"
				speed="0.65s"
				emptyColor="gray.200"
				color="blue.500"
				size="xl"
			/>
		</Center>
	);
}

export default LoadingPage;
