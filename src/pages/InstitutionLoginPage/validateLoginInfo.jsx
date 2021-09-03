export default function validateLoginInfo(values) {
    let errors = {}

    //email
    if(!values.email.trim() && !values.password) {
        errors.invalidInput = "Email & password is required"
    } else if (!values.email.trim()) {
        errors.invalidInput = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.invalidInput = "Email address is invalid"
    } else if(!values.password) {
        errors.invalidInput = "Password is required"
    } 
    

    
    return errors;
}