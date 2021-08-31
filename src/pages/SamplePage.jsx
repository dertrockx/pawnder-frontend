import React from "react";
import BasicButton from "components/BasicButton";
import BasicCard from "components/BasicCard";
import Navbar from "components/Navbar";
function SamplePage() {
	return (
		<div>
			<Navbar />
			Hello! I'm a dummy page
			<BasicButton />
			<BasicCard />
			<BasicCard text="Custom Card Text" />
			<h1 className="heading-1">Heading 1</h1>
			<h2 className="heading-2">Heading 2</h2>
			<h3 className="heading-3">Heading 3</h3>
			<h4 className="heading-4">Heading 4</h4>
		</div>
	);
}

export default SamplePage;
