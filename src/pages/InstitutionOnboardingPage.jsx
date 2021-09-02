import { useState } from "react";
import BasicInput from "components/BasicInput"

function InstitutionOnboardingPage() {
    const [ name, setName ] = useState(null);
    const [ description, setDescription ] = useState(null);

    function handleValueChange(e, valueCb) {
        const newValue = e.target.value;
        valueCb(newValue);
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        console.log(name, description);
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <BasicInput 
                    type="text"
                    name="name"
                    onChange={(e) => handleValueChange(e, setName)}
                    placeholder="Institution Name"
                />
                <BasicInput 
                    type="textarea"
                    name="name"
                    onChange={(e) => handleValueChange(e, setDescription)}
                    placeholder="Description"
                />
                <BasicInput 
                    type="text"
                    name="address"
                    placeholder="Address"
                />
                
            </form>
        </div>
    )
}

export default InstitutionOnboardingPage;