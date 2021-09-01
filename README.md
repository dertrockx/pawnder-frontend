# Pawnder

- the tinder for adoption
- because, y not

## Core Contributors

- Ian Salazar [@dertrockx](https://github.com/dertrockx)
- Reamonn Domingo [@rladomingo](https://github.com/rladomingo)
- Sophia Nakashima [@xrrhythmxx](https://github.com/rladomingo)
- Lea Marie Somoson [@xxyangxx](https://github.com/xxyangxx)

## Guidelines

### Importing Files

- I had set up this project to use alias import by creating a file called `jsconfig.json`
- to see examples, just keep scrolling

#### Example patterns

- **Example#1:** creating a basic component and importing it

```jsx
// src/components/Component1.jsx
import React from "react";

function Component1() {
	return <h1>I am a simple component</h1>;
}

export default Component1;
```

```jsx
// src/pages/SamplePage.jsx
import React from "react";
// to use Component1, we import them
import Component1 from "components/Component1";

function SamplePage(){
  return (
    <p>Inside sample page</p>
    <Component1 />
  )
}

export default SamplePage;
```

- **Example#2:** creating a component with separate styles using [css modules](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/)

```css
/* We create two files, one index.jsx file and one css file 
src/components/BasicButton/BasicButton.module.css */

.button {
	padding: 5px 10px;
	/* ... styles go here */
}

.ghost-button {
	border: 1px solid #f91;
	background: none;
	/* ... styles go here */
}
```

```jsx
// src/components/BasicButton/index.jsx
import React from "react";
import styles from "./BasicButton.module.css";

function BasicButton() {
	return (
		<button className={styles.button}>I am a button</button>
		/*
      for multiple styles, here's a reference https://stackoverflow.com/questions/33949469/using-css-modules-how-do-i-define-more-than-one-style-name
    */
	);
}

export default BasicButton;
// and then we import the component just like in Example#1
```

- **Example#3:** other imports

```javascript
// importing a utility function from src/utils
import someUtilityFunction from "utils/someUtilFile";
```

---

### Routing

- Here are the routes to be expected

  - /sample
  - /feed
  - /nearby
  - /stories
  - /stories/:id
  - /settings/profile
  - /user/login
  - /user/signup
  - /institution/dashboard
  - /institution/manage-pets
  - /institution/manage-stories
  - /institution/manage-pets/:id
  - /institution/manage-pets/:id/applicant
  - /institution/manage-stories/:id
  - /institution/settings/information
  - /institution/login
  - /institution/signup

- Here's the process on how you may add your page to our app's route

```jsx
// 1. import your page in App.js
import YourPage from "pages/YourPage"; // eme

/*
... code goes here
*/

// 2. Add your page to the inside <Switch></Switch>
function App() {
	return (
		<>
			<Router>
				<Switch>
					<NavRoute path="/sample" exact component={SamplePage} />
					<NavRoute path="/feed" exact component={Feed} />
					<NavRoute path="/nearby" exact component={NearbyInstitution} />
					{/* For non-onboarding pages, do the ff */}
					<NavRoute path="/your-path" exact component={YourPage} />
					{/* For onboarding pages, do the ff */}
					<Route path="/your-path" exact component={YourPage} />
					<Redirect path="/" to="/sample" exact />
				</Switch>
			</Router>
		</>
	);
}
```
