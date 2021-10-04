export default function validateSignUpInfo(values) {
    let errors = {}

    //email
    if(!values.email.trim()) {
        errors.email = "*Email is required"
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "*Email address is invalid"
    }

    if(!values.password) {
        errors.password = "*Password is required"
    } 

    if(!values.password2) {
        errors.password2 = "*Confirmation is required"
    } else if (values.password2 !== values.password) {
        errors.password2 = "*Passwords do not match"
    } 
    errors.emailExist = "Email already exists!"

    return errors;
}