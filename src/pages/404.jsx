import React from "react";
import { Center } from "@chakra-ui/react";
import Button from "components/Button";
import history from "utils/history";

function NotFoundPage() {
	return (
		<Center height="100vh">
			<h1 className="header-1">
				Oops. We can't find what you're looking for :/
			</h1>
			<Button onClick={() => history.goBack()} color="brand-default">
				Go back
			</Button>
		</Center>
	);
}

export default NotFoundPage;
