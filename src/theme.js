import { extendTheme } from "@chakra-ui/react";

const colors = {
	brand: {
		100: "#ffa500",
		200: "#ffc55c",
		300: "#a36a00",
		400: "#6d7d8b",
	},
};

const theme = extendTheme({ colors });

export default theme;
