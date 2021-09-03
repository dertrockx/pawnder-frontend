import React from 'react';
import styles from './SignUpPage.module.css';
import Button from "components/Button";
import useSignUp from "./useSignUp";
import validate from "./validateSignUpInfo";
import logo from 'assets/logo.svg';

const FormSignup = ({ submitForm }) => {
    const {handleChange, values, handleSubmit, errors} = useSignUp(submitForm, validate);

    return (
        <div className={styles.formContentRight}>
            <form className={styles.form} onSubmit = {handleSubmit}>
            <img src = {logo} alt = "logo" className = {styles.logo} />
                <h1 className = 'heading-1'>
                    Create an account
                </h1>
                <p className = 'caption'>Setup a new institution account</p>
                <div className= {styles.formInputs}>
                    <label className= 'paragraph' id = {styles.firstLabel}>Email
                    {errors.email && <span className = "bold-text" id = {styles.error}>{errors.email}</span>}
                    </label>
                    <input
                        className= {errors.email ? styles.formInputError : styles.formInput }
                        type='email'
                        name='email'
                        placeholder='Enter your email'
                        value = {values.email}
                        onChange = {handleChange}
                    />
                </div>
                <div className= {styles.formInputs}>
                    <label className= 'paragraph'>Password
                    {errors.password && <span className = "bold-text" id = {styles.error}>{errors.password}</span>}
                    </label>
                    <input
                        className= {errors.password ? styles.formInputError : styles.formInput }
                        type='password'
                        name='password'
                        placeholder='Enter your password'
                        value = {values.password}
                        onChange = {handleChange}
                    />
                </div>
                <div className= {styles.formInputs}>
                    <label className= 'paragraph'>Confirm Password
                    {errors.password2 && <span className = "bold-text" id = {styles.error}>{errors.password2}</span>}
                    </label>
                    <input
                        className= {errors.password2 ? styles.formInputError : styles.formInput }
                        type='password'
                        name='password2'
                        placeholder='Confirm your password'
                        value = {values.password2}
                        onChange = {handleChange}
                    />
                </div>
                    <Button color="brand-default" id = {styles.signUpButton} type = "submit">Sign Up</Button>     
            </form>
        </div>
    );
};

export default FormSignup;