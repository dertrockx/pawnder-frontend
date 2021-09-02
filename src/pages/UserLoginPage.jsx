import { useState } from "react";
import BasicInput from "components/BasicInput";
import Button from "components/Button";

function UserLoginPage() {
    const [ email, setEmail ] = useState(null);
    const [ password, setPassword ] = useState(null);

    function handleValueChange(e, valueCb) {
        const newValue = e.target.value;
        valueCb(newValue);
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        console.log(email, password);
    }

    return (
        <div>
            <div className="heading-2">Login User</div>
            <div className="paragraph">Hello, Friend! Lorem ipsum dolor sit amet, consectetur adipiscing</div>
            <form onSubmit={handleFormSubmit}>
                <BasicInput 
                    type="email"
                    name="email"
                    onChange={(e) => handleValueChange(e, setEmail)}
                    placeholder="Email"
                />
                <BasicInput 
                    type="password"
                    name="password"
                    onChange={(e) => handleValueChange(e, setPassword)}
                    placeholder="Password"
                />
                <Button size="default">Login</Button>
                Don't have an account yet? Signup
            </form>
            <img src="/images/cat.jpg" alt="cat"/>
        </div>
    )
}

export default UserLoginPage;