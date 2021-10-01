import React, {useState, useEffect} from "react";
import styles from "./manageStoryDetails.module.css";
import uploadPhoto from "assets/uploadPhoto.svg";
import { Textarea, Input, Button, useDisclosure, useToast} from "@chakra-ui/react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStories } from 'redux/actions/storyActions';
import {Modal,ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from "@chakra-ui/react";

function ManageStoryDetails({ data }) {
    const { id } = useParams(); 
    const toast = useToast();
    const loginType = 'institution';
    const institutionID = 1;
    const stories = useSelector(s => s.story.stories);
    const [hasImg, setHasImg] = useState(true);
    const { isOpen: isCancelOpen, onOpen: onCancelOpen, onClose: onCancelClose } = useDisclosure();
    const { isOpen: isDraftOpen, onOpen: onDraftOpen, onClose: onDraftClose } = useDisclosure();
    const { isOpen: isPublishOpen, onOpen: onPublishOpen, onClose: onPublishClose } = useDisclosure();
    const [success, setSuccess] = useState(true);
    const [storyId, setStoryId] = useState(0);
    const dispatch = useDispatch();
    const [storyInfo, setStoryInfo] = useState({
        title: '',
        body: '',
        headlinePhoto: {uploadPhoto},
        institutionId: institutionID,
        tags: []
    })
    const [picture, setPicture] = useState(uploadPhoto);
    let storyDetail = stories;

    useEffect(() => {
        if (data) {
            data.filter(story => story.id === parseInt(id)).map(story => {
                setStoryInfo({
                    ...storyInfo, 
                    title: story.title,      
                    tags: story.tags, 
                    headlinePhoto: story.headlinePhoto, 
                    body: story.body
                })
                setPicture(story.headlinePhoto);
            });
            if (storyInfo.headlinePhoto === '') {
                setStoryInfo({
                    headlinePhoto: {uploadPhoto} 
                })
                setPicture(uploadPhoto);
            }
        }
    }, []);

    const handleChange = (e) => {
		setStoryInfo({
			...storyInfo,
			[e.target.name]: e.target.value
		});
	}

    const movePages = (e) => {
        window.location = "/institution/manage-stories";     //go back to manage story list
    } 

    const postRequest = () => {
        let fd = new FormData(); 
        fd.append('title', storyInfo.title);
        fd.append('body', storyInfo.body);
        fd.append('headlinePhoto', storyInfo.headlinePhoto);
        fd.append('tags', storyInfo.tags);
        fd.append('institutionId', institutionID);
        axios.post('http://localhost:8081/api/0.1/story/', fd)
        .then(() => {
            setSuccess(true);
        })
        .catch(() => {
            setSuccess(false);
        })
    }

    const putRequestPublish = () => {
        let fd = new FormData(); 
        fd.append('title', storyInfo.title);
        fd.append('body', storyInfo.body);
        fd.append('headlinePhoto', storyInfo.headlinePhoto);
        axios.put('http://localhost:8081/api/0.1/story/' + id + '?publish=1', fd)
        .then(() => {
            setSuccess(true);
        })
        .catch(() => {
            setSuccess(false);
        })
    }

    const putRequestUpdate = () => {
        let fd = new FormData(); 
        fd.append('title', storyInfo.title);
        fd.append('body', storyInfo.body);
        fd.append('headlinePhoto', storyInfo.headlinePhoto);
        axios.put('http://localhost:8081/api/0.1/story/' + id, fd)
        .then(() => {
            setSuccess(true);
        })
        .catch(() => {
            setSuccess(false);
        })
    }

    const handlePublish = () => {
            putRequestPublish();
            if (success === true) {
                toast({
                    title: 'Successfully published story.',
                    status: 'success',
                    position: 'top',
                    duration: 5000,
                    isClosable: true,
                });
                movePages();
            }
            else {
                toast({
                    title: 'Error publishing story.',
                    description: 'Something went wrong. Please try again later.',
                    status: 'error',
                    position: 'top',
                    duration: 5000,
                    isClosable: true,
                });
            }
        //}
    }

    const handleDraft = (e) => {
        //post request if story is newly created
        if (id === undefined) {         //params is '/create/' and not '/id'
            postRequest()               
            if (success === true) {
                toast({
                    title: 'Successfully saved story as draft.',
                    status: 'success',
                    position: 'top',
                    duration: 5000,
                    isClosable: true,
                });
                movePages();
            } 
            else {
                toast({
                    title: 'Error saving story as draft.',
                    description: 'Something went wrong. Please try again later.',
                    status: 'error',
                    position: 'top',
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
        //put request if story is not newly created
        else {
            putRequestUpdate()
            if (success === true) {
                toast({
                    title: 'Successfully saved story as draft.',
                    status: 'success',
                    position: 'top',
                    duration: 5000,
                    isClosable: true,
                });
                movePages();
            }
            else {
                toast({
                    title: 'Error saving story as draft.',
                    description: 'Something went wrong. Please try again later.',
                    status: 'error',
                    position: 'top',
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    }

    const onChangePicture = (e) => {
        const selected = e.target.files[0];
        const ALLOWED_TYPES=['image/png', 'image/jpg', 'image/jpeg'];
        if (selected && ALLOWED_TYPES.includes(selected.type)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPicture(`${reader.result}`)
            }
            setStoryInfo({
                ...storyInfo,
                headlinePhoto: selected
            });
            console.log(storyInfo.headlinePhoto);
            reader.readAsDataURL(selected);
        } else {  
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
                <form onSubmit = {handleDraft} className = {styles.form}>
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
                            <input name = "headlinePhoto" id = "files" type="file" accept=".jpg, .jpeg, .png" className = {styles.visuallyHidden} onChange={onChangePicture} />
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