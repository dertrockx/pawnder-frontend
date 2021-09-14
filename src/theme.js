import { extendTheme } from "@chakra-ui/react";

const colors = {
	brand: {
		100: "#ffa500",
		200: "#ffc55c",
		300: "#a36a00",
	},
};

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

export default theme;
