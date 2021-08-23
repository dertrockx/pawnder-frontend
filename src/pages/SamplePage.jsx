import React from "react";
import BasicButton from "components/BasicButton";
import BasicCard from "components/BasicCard";

function SamplePage() {
	return (
		<div>
			Hello! I'm a dummy page
			<BasicButton />
			<BasicCard />
			<BasicCard text="Custom Card Text" />
		</div>
	);
}

export default SamplePage;
