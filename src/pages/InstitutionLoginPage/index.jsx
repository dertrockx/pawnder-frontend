import FormLogin from 'pages/InstitutionLoginPage/InstitutionLoginForm';
import styles from './LoginPage.module.css';
import React, {useState} from 'react';
import design from 'assets/catDesign.png';
import {Link} from "react-router-dom";
import useMediaQuery from 'hooks/useMediaQuery';

const InstitutionSignUpPage = () => {
    const matches = useMediaQuery("(min-width: 800px)");
    const [isSubmitted, setIsSubmitted] = useState(false)

    function submitForm() {
        setIsSubmitted(true);
        alert("Submitted");
    }

    return (
        <>
            {matches ? (
            <div className= {styles.formContainerBig}>
                <FormLogin submitForm = {submitForm} />
                <img src = {design} alt = "cat" className = {styles.bgDesignBig}/> 
                
                <div className= {styles.formContentRight}>
                    <img className= {styles.formImg} 
                    src='https://i.pinimg.com/564x/5f/1c/03/5f1c03584345533f114c9b1312f8a024.jpg' 
                    alt='cat' />
                    <h1 className = "heading-1" id = {styles.greeting}>Welcome to Pawnder</h1>
                    <p className = {styles.greetingCaption}>
                        Creating permanent environments for pets in institutions through public awareness, advocacy, and family finding.
                    </p>
                    <p className = "paragraph" id= {styles.formInputLogin}>
                        Need an account? <Link to = {"/institution/signup"} className = {styles.link}>Sign Up</Link>
                    </p>  
                </div> 
            </div>
            ) : ( 
                <div className = {styles.formContainerSmall}>
                    <div className = {styles.upper}>
                        <img className= {styles.formImg} 
                        src='https://i.pinimg.com/564x/5f/1c/03/5f1c03584345533f114c9b1312f8a024.jpg' 
                        alt='cat' />
                        <h1 className = "heading-1" id = {styles.greeting}>Welcome to Pawnder</h1>
                        <p className = {styles.greetingCaption}>
                            Creating permanent environments for pets in institutions through public awareness, advocacy, and family finding.
                        </p>
                        <p className = "paragraph" id= {styles.formInputLogin}>
                            Need an account? <Link to = {"/institution/signup"} className = {styles.link}>Sign Up</Link>
                        </p>
                    </div>
                    <div className = {styles.lower}>
                        <FormLogin className = {styles.formLower} submitForm = {submitForm} />
                        <img src = {design} alt = "cat" className = {styles.bgDesignSmall}/> 
                    </div>
                </div>
            )}
        </>
    );
};

export default InstitutionSignUpPage;