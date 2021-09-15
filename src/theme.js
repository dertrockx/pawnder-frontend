import { extendTheme } from "@chakra-ui/react";

const colors = {
	brand: {
		100: "#ffa500",
		200: "#ffc55c",
		300: "#a36a00",
	},
};

<<<<<<< HEAD
const theme = extendTheme({ colors });
=======
const theme = extendTheme({
	colors,
	components: {
		Divider: {
			colorScheme: {
				brand: {
					100: "#ffa500",
				},
			},
		},
	},
});
>>>>>>> 55a2e3ad075bffd99e3891cbe2fc4efbc0e0c102

export default theme;
