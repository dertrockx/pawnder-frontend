import FormSignup from 'pages/InstitutionSignUpPage/InstitutionSignUpForm';
import styles from './SignUpPage.module.css';
import React, {useState} from 'react';
import design from 'assets/dogDesign.png';
import {Link} from "react-router-dom";

const InstitutionSignUpPage = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)

    function submitForm() {
        setIsSubmitted(true);
        alert("Submitted");
    }
    return (
        <>
            <div className= {styles.formContainer}>
                <div className= {styles.formContentLeft}>
                    <img className= {styles.formImg} 
                    src='https://petpawshub.com/wp-content/uploads/2021/03/domestic-cute-dog-1024x1536.jpg' 
                    alt='dog' />
                    <h1 className = {styles.greeting}>Hello World!</h1>
                    <p className = {styles.greetingCaption}>Find your pets a new home today!</p>
                    <div className = {styles.brownDesign}>
                        <p className = "paragraph" id= {styles.formInputLogin}>
                            Already have an account? <Link to = {"/institutionLogin"} className = {styles.link} >Login</Link>
                        </p>
                    </div>    
                </div>
                <FormSignup submitForm = {submitForm} />
                <img src = {design} alt = "dog" className = {styles.bgDesign}/> 
            </div>
        </>
    );
};

export default InstitutionSignUpPage;