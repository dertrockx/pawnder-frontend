import React from 'react';
import styles from './LoginPage.module.css';
import Button from "components/Button";
import useLogin from "./useLogin";
import validate from "./validateLoginInfo";
import logo from 'assets/logo.svg';
import useMediaQuery from 'hooks/useMediaQuery';

const FormSignup = ({ submitForm }) => {
    const {handleChange, values, handleSubmit, errors} = useLogin(submitForm, validate);
    const matches = useMediaQuery("(min-width: 800px)");

    return (
        <div className={styles.formContentLeft}>
            <form className={styles.form} onSubmit = {handleSubmit}>
                <img src = {logo} alt = "logo" className = {matches ? styles.logo: styles.logo2} />
                <h1 className = 'heading-1' id = {styles.title}>
                    Institution Login
                </h1>
                {errors.invalidInput && <span className = "bold-text" id = {styles.error}>{errors.invalidInput}</span>}
                <div className= {styles.formInputs}>
                    <label className= 'paragraph' id = {styles.firstLabel}>Email
                    </label>
                    <input
                        className= {errors.invalidInput ? styles.formInputError : styles.formInput }
                        type='email'
                        name='email'
                        placeholder='Enter your email'
                        value = {values.email}
                        onChange = {handleChange}
                    />
                </div>
                <div className= {styles.formInputs}>
                    <label className= 'paragraph'>Password
                    </label>
                    <input
                        className= {errors.invalidInput ? styles.formInputError : styles.formInput }
                        type='password'
                        name='password'
                        placeholder='Enter your password'
                        value = {values.password}
                        onChange = {handleChange}
                    />
                </div>
                    <Button color="brand-default" id = {styles.signUpButton} type = "submit">Login</Button>     
            </form>
        </div>
    );
};

export default FormSignup;