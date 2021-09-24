import React, {useState} from "react";
import styles from "./manageStoryDetails.module.css";
import uploadPhoto from "assets/uploadPhoto.svg";
import { Textarea, Input, Button } from "@chakra-ui/react";
import useMediaQuery from 'hooks/useMediaQuery';

function ManageStoryDetails() {
    const matches = useMediaQuery("(min-width: 1000px)");
    const [ values, setValues ] = useState({
        title: '',
        tags: [],
        photo: '',
        description: ''
	});

    const [picture, setPicture] = useState(uploadPhoto);
    const [hasImg, setHasImg] = useState(false);
    const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value
		});
	}

    const handlePublish = (e) => {
        if (values.title === '' || values.tags === '' || values.photo === '' || values.description === '') {
            e.preventDefault();
            alert("All fields are required")
        } else {
            e.preventDefault();
            console.log(values);
            alert("Submitted");	
        }
    }

    const handleDraft = (e) => {
        e.preventDefault();
        alert("saved as draft");
    }

    const handleCancel = (e) => {
        e.preventDefault(); 
        alert("cancelled");
    }

    const onChangePicture = e => {
        setHasImg(true);
        if (e.target.files[0]) {
            setPicture(URL.createObjectURL(e.target.files[0]));
        } 
        setValues({
            ...values,
            photo: e.target.files[0]
        });
    }

    const removePicture = () => {
        setPicture(uploadPhoto);
        setHasImg(false);
    }

    return (
        <>
            <form onSubmit = {handlePublish} className = {styles.form}>
                <div className = {styles.container}>
                    <h3 className = 'heading-3' id = {styles.headings}>
                        Title
                    </h3>
                    <Input
                        name = "title"
                        value = {values.title}
                        onChange = {handleChange}
                        placeholder = "Enter title here!"
                        focusBorderColor = "black"
                        background = "white"
                    />
                    <h3 className = 'heading-3' id = {styles.headings}>
                        Tags
                    </h3>
                    <Input
                        name = "tags"
                        value = {values.tags}
                        onChange= {handleChange}
                        placeholder="Put tags here! (dogs, cats, flowers, etc.)"
                        focusBorderColor = "black"
                        background = "white"
                    />
                    <h3 className = 'heading-3' id = {styles.headings}>
                        Display Picture
                    </h3>
                    <div className = {styles.uploadPicture}>
                        <img src={picture} alt = '' className = {styles.img} />
                        <label for = "files" className = {styles.uploadLabel}>Upload Photo</label>
                        <input name = "photo" id = "files" type="file" accept=".jpg, .jpeg, .png" className = {styles.visuallyHidden} onChange={onChangePicture} />
                        {hasImg ? 
                            (<Button
                                variant = "outline"
                                className = {styles.removePhoto}
                                colorScheme = "orange"
                                onClick = {removePicture} 
                            >
                                Remove Photo
                            </Button>
                            ) : (
                            <Button
                                variant = "outline"
                                className = {styles.removePhoto}
                                colorScheme = "orange"
                                onClick = {removePicture}
                                isDisabled = "true"
                            >
                                Remove Photo
                            </Button>)
                        }
                    </div>
                    <h3 className = 'heading-3' id = {styles.headings}>
                        Description
                    </h3>
                    <Textarea
                        name = "description"
                        placeholder = "Tell your success story here!"
                        size = "lg"
                        focusBorderColor = "black"
                        resize= "none"
                        background = "white"
                        height = "400px"
                        value = {values.description}
                        onChange = {handleChange}
                    />
                    <div className = {styles.buttons}>
                        <Button
                            variant = "solid"
                            colorScheme = "red"
                            className = {styles.buttonOptions}
                            onClick = {handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant = "solid"
                            colorScheme = "yellow"
                            color = "white"
                            className = {styles.buttonOptions}
                            onClick = {handleDraft}
                        >
                            Save as Draft
                        </Button>
                            <Button
                                variant = "solid"
                                colorScheme = "green"
                                className = {styles.buttonOptions}
                                type = "submit"
                                onClick = {handlePublish}
                            >
                                Publish 
                            </Button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default ManageStoryDetails;