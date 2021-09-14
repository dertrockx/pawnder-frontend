import React from "react";
import { Container, Box, Grid, HStack, VStack } from "@chakra-ui/react";
function Dashboard() {
	return (
		<Container marginTop={15} maxW="1100px">
			<h1 className="heading-1">My Dashboard</h1>
			<Grid
				templateColumns="3fr 4fr 2fr"
				rowGap={5}
				columnGap={5}
				marginTop="30px"
			>
				<Box shadow="2xl" padding="25px" borderRadius="10px">
					<p className="paragraph">Pets requested</p>
					<HStack spacing={5} marginTop={5}>
						<VStack alignItems="center" spacing={0}>
							<h2 className="heading-2">132</h2>
							<p className="caption">Total</p>
						</VStack>
						<VStack alignItems="center" spacing={0}>
							<h2 className="heading-2">40</h2>
							<p className="caption">This week</p>
						</VStack>
					</HStack>
				</Box>
				<Box shadow="2xl" padding="25px" borderRadius="10px">
					<p className="paragraph">Applicants</p>
					<HStack spacing={5} marginTop={5}>
						<VStack alignItems="center" spacing={0}>
							<h2 className="heading-2">15</h2>
							<p className="caption">Pending</p>
						</VStack>
						<VStack alignItems="center" spacing={0}>
							<h2 className="heading-2">8</h2>
							<p className="caption">Under Review</p>
						</VStack>
						<VStack alignItems="center" spacing={0}>
							<h2 className="heading-2">3</h2>
							<p className="caption">Accepted</p>
						</VStack>
						<VStack alignItems="center" spacing={0}>
							<h2 className="heading-2">10</h2>
							<p className="caption">Rejected</p>
						</VStack>
					</HStack>
				</Box>
			</Grid>
		</Container>
	);
}

export default Dashboard;
