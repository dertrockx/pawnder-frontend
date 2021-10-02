import { useState, useEffect } from "react";
import { useHistory } from "react-router";

const useSignUp = (callback, validate) => {
	const history = useHistory();
	const [values, setValues] = useState({
		email: "",
		password: "",
		password2: "",
		emailExists: "",
	});
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setErrors(validate(values));
		setIsSubmitting(true);
	};

	useEffect(() => {
		if (!errors.email && !errors.password && !errors.password2 && isSubmitting) {
			callback();
			fetch(
				"http://localhost:8081/api/0.1/user",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: values.email,
						password: values.password
					})
				})
				.then(response => {
					if(response.status === 201) {
						//redirect 
						history.replace("/institution/login");
					}
					return response.json()
				})
				.then(data => {
					if (data.code) {
						//say that email already exists 
						setErrors(validate(values));
						console.clear();
						setIsSubmitting(false);
					}
				})
		}
	}, [errors]);

	return { handleChange, handleSubmit, values, errors };
};

export default useSignUp;
