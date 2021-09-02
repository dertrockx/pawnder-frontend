import { useState } from "react";
import BasicInput from "components/BasicInput";
import Button from "components/Button";

function UserSignupPage() {
    const [ email, setEmail ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ confirmPasword, setConfirmPasword ] = useState(null);    

    function handleValueChange(e, valueCb) {
        const newValue = e.target.value;
        valueCb(newValue);
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        console.log(email, password, confirmPasword);
    }

    return (
        <div>
            <img src="/images/dog.jpg" alt="dog"/>
            <div className="heading-2">Create an account</div>
            <div className="paragraph">Welcome! Enter your personal details and give a home to these adorable pets.</div>
            <form onSubmit={handleFormSubmit}>
                <BasicInput 
                    type="email"
                    name="email"
                    onChange={(e) => handleValueChange(e, setEmail)}
                    placeholder="Email"
                /><br/>
                <BasicInput 
                    type="password"
                    name="password"
                    onChange={(e) => handleValueChange(e, setPassword)}
                    placeholder="Password"
                /><br/>
                <BasicInput 
                    type="password"
                    name="confirmPassword"
                    onChange={(e) => handleValueChange(e, setConfirmPasword)}
                    placeholder="Confirm Password"
                /><br/>
                <Button size="default">Signup</Button>
                Already have an account? Login
            </form>
        </div>
    )
}

export default UserSignupPage;