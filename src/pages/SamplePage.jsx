import React from "react";

import Button from "components/Button";
function SamplePage() {
	return (
		<div>
			<h1 className="heading-1">Heading 1</h1>
			<h2 className="heading-2">Heading 2</h2>
			<h3 className="heading-3">Heading 3</h3>
			<h4 className="heading-4">Heading 4</h4>
			<br />
			<h2 className="heading-2">Sizes</h2>
			<br />
			<div
				style={{
					display: "flex",
					gap: 10,
					alignItems: "flex-start",
					flexWrap: "wrap",
				}}
			>
				<Button size="small">I am a small button</Button>
				<Button size="default">I am a default button</Button>
			</div>
			<br />
			<h2 className="heading-2">Filled</h2>
			<br />
			<div
				style={{
					display: "flex",
					gap: 10,
					alignItems: "flex-start",
					flexWrap: "wrap",
					background: "#ccc",
					padding: 15,
				}}
			>
				<Button color="brand-default">I am a primay default button</Button>
				<Button color="brand-lighter">I am a primay lighter button</Button>
				<Button color="brand-darker">I am a brand darker button</Button>
				<Button color="red">I am a red button</Button>
				<Button color="green">I am a green button</Button>
				<Button color="blue">I am a blue button</Button>
				<Button color="black">I am a black button</Button>
				<Button color="white">I am a white button</Button>
			</div>
			<br />
			<h2 className="heading-2">Outline</h2>
			<br />
			<div
				style={{
					display: "flex",
					gap: 10,
					alignItems: "flex-start",
					flexWrap: "wrap",
					background: "#ccc",
					padding: 15,
				}}
			>
				<Button color="brand-default" variant="outline">
					I am a primay default button
				</Button>
				<Button color="brand-lighter" variant="outline">
					I am a primay lighter button
				</Button>
				<Button color="brand-darker" variant="outline">
					I am a brand darker button
				</Button>
				<Button color="red" variant="outline">
					I am a red button
				</Button>
				<Button color="green" variant="outline">
					I am a green button
				</Button>
				<Button color="blue" variant="outline">
					I am a blue button
				</Button>
				<Button color="black" variant="outline">
					I am a black button
				</Button>
				<Button color="white" variant="outline">
					I am a white button
				</Button>
			</div>
			<br />
			<h2 className="heading-2">Mixed</h2>
			<div
				style={{
					display: "flex",
					gap: 10,
					alignItems: "flex-start",
					flexWrap: "wrap",
				}}
			>
				<Button size="small" color="brand-default">
					I am a small brand filled button
				</Button>
				<Button size="small" color="brand-default" variant="outline">
					I am a small brand outline button
				</Button>
				<Button color="green">I am a green filled button</Button>
				<Button color="green" variant="outline">
					I am a green outline button
				</Button>
			</div>
			<Button color="brand-default" disabled>
				Disabled button
			</Button>
			<Button color="brand-default" block>
				Full-width button
			</Button>
		</div>
	);
}

export default SamplePage;
