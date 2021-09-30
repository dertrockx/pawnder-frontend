import React, {useState, useEffect} from "react";
import styles from "./manageStoryDetails.module.css";
import uploadPhoto from "assets/uploadPhoto.svg";
import { Textarea, Input, Button, useDisclosure} from "@chakra-ui/react";
import { useParams, useHistory } from 'react-router-dom';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react"

function ManageStoryDetails({ data }) {
    const { id } = useParams(); 
    const history = useHistory();
    const [hasImg, setHasImg] = useState(true);
    const { isOpen: isCancelOpen, onOpen: onCancelOpen, onClose: onCancelClose } = useDisclosure();
    const { isOpen: isDraftOpen, onOpen: onDraftOpen, onClose: onDraftClose } = useDisclosure();
    const { isOpen: isPublishOpen, onOpen: onPublishOpen, onClose: onPublishClose } = useDisclosure();

    const [storyInfo, setStoryInfo] = useState({
        title: '',
        tags: [],
        headlineUrl: '',
        body: ''
    })
    const [picture, setPicture] = useState(uploadPhoto);

    useEffect(() => {
        if (data) {
            data.filter(story => story.id === parseInt(id)).map(story => {
                console.log(story.headlineUrl);
                setStoryInfo({
                    ...storyInfo, 
                    title: story.title, 
                    tags: story.tags, 
                    headlineUrl: story.headlineUrl, 
                    body: story.body
                })
                setPicture(story.headlineUrl);
            });
        }
    }, []);

    const handleChange = (e) => {
		setStoryInfo({
			...storyInfo,
			[e.target.name]: e.target.value
		});
	}

    const movePages = (e) => {
        history.push("/institution/manage-stories");
    } 

    const handlePublish = (e) => {
        if (storyInfo.title === '' || storyInfo.tags === '' || storyInfo.headlineUrl === '' || storyInfo.body === '') {
            e.preventDefault();
            alert("All fields are required")
        } else {
            //post request
            console.log("Publish: ", storyInfo);
            movePages();
        }
    }

    const handleDraft = (e) => {
        //post request
        console.log("draft: ", storyInfo);
        movePages();
    }

    const onChangePicture = (e) => {
        const selected = e.target.files[0];
        const ALLOWED_TYPES=['image/png', 'image/jpg', 'image/jpeg'];
        if (selected && ALLOWED_TYPES.includes(selected.type)) {
            let reader = new FileReader();
            reader.onloadend = () => {
                setPicture(`${reader.result}`)
            }
            setStoryInfo({
                ...storyInfo,
                headlineUrl: selected
            });
            reader.readAsDataURL(selected);
        } else {
            /** 
             * Selecting a file and cancelling returns undefined to selected.
             * So if you select a file and cancel, the imagePreviewError would be set to true.
             * We don't want that so we check if selected === undefined. If it's true, then we don't give out any errors.
             */       
            if (selected === undefined) {
                return;
            }
        }
    }

    const removePicture = () => {
        setPicture(uploadPhoto);
        setHasImg(false);
    }

    return (
        <>
            {
                <form onSubmit = {handlePublish} className = {styles.form}>
                    <div className = {styles.container}>
                        <h3 className = 'heading-3' id = {styles.headings}>
                            Title
                        </h3>
                        <Input
                            name = "title"
                            value = {storyInfo.title}
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
                            value = {storyInfo.tags}
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
                            <label htmlFor = "files" className = {styles.uploadLabel}>Upload Photo</label>
                            <input name = "headlineUrl" id = "files" type="file" accept=".jpg, .jpeg, .png" className = {styles.visuallyHidden} onChange={onChangePicture} />
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
                                    isDisabled = {true}
                                >
                                    Remove Photo
                                </Button>)
                            }
                        </div>
                        <h3 className = 'heading-3' id = {styles.headings}>
                            Description
                        </h3>
                        <Textarea
                            name = "body"
                            placeholder = "Tell your success story here!"
                            size = "lg"
                            focusBorderColor = "black"
                            resize= "none"
                            background = "white"
                            height = "400px"
                            value = {storyInfo.body}
                            onChange = {handleChange}
                        />
                        <div className = {styles.buttons}>
                            <Button
                                variant = "solid"
                                colorScheme = "red"
                                className = {styles.buttonOptions}
                                onClick = {onCancelOpen}
                            >
                                Cancel
                            </Button>

                            <Modal onClose={onCancelClose} isOpen={isCancelOpen} isCentered>
                                <ModalOverlay />
                                <ModalContent>
                                <ModalHeader>Cancel Story</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <p className = "paragraph">Are you sure you want to cancel?</p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={onCancelClose} mr = {3}>Continue Editing</Button>
                                    <Button colorScheme = "red" onClick={movePages}>Cancel Story</Button>
                                </ModalFooter>
                                </ModalContent>
                            </Modal>

                            <Button
                                variant = "solid"
                                colorScheme = "yellow"
                                color = "white"
                                className = {styles.buttonOptions}
                                onClick = {onDraftOpen}
                            >
                                Save as Draft
                            </Button>

                            <Modal onClose={onDraftClose} isOpen={isDraftOpen} isCentered>
                                <ModalOverlay />
                                <ModalContent>
                                <ModalHeader>Save Story as Draft</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <p className = "paragraph">Are you sure you want to save your story as draft?</p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button colorScheme = "red" mr = {3} onClick={onDraftClose}>Cancel</Button>
                                    <Button colorScheme = "yellow" color = "white" onClick={handleDraft}>Save as Draft</Button>
                                </ModalFooter>
                                </ModalContent>
                            </Modal>

                                <Button
                                    variant = "solid"
                                    colorScheme = "green"
                                    className = {styles.buttonOptions}
                                    onClick = {onPublishOpen}
                                >
                                    Publish 
                                </Button>

                                <Modal onClose={onPublishClose} isOpen={isPublishOpen} isCentered>
                                <ModalOverlay />
                                <ModalContent>
                                <ModalHeader>Save Story as Draft</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <p className = "paragraph">You are about to publish a post.</p>
                                    <br />
                                    <p className = "paragraph">This will allow users to read your story. You can still edit your post after this. Are you sure?</p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button colorScheme = "red" mr = {3} onClick={onPublishClose}>Cancel</Button>
                                    <Button colorScheme = "green" type = "submit" onClick={handlePublish}>Publish</Button>
                                </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </div>
                    </div>
                </form>
            }
        </>
    )
}

export default ManageStoryDetails;