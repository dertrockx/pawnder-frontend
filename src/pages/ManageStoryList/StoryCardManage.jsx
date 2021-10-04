import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoCalendarOutline, IoTrashBin } from 'react-icons/io5';
import { Button as ChakraButton, IconButton } from '@chakra-ui/react';
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';

import styles from './StoryCardManage.module.css';

import moment from 'moment';

const StoryCardManage = ({
  story,
  handleDelete,
  handlePublish,
}) => {
  const DeleteAlertDialog = ({ id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef();

    return(
      <>
        <IconButton
          aria-label="Delete post"
          icon={<IoTrashBin />}
          isRound="true"
          boxShadow="xl"
          bg="rgb(237, 69, 93)"
          color="white"
          _hover={{filter:"brightness(0.8)"}}
          _focus={{border:"none"}}
          onClick={() => {setIsOpen(true)}}
          style={{position: "absolute", top: "-20px", right:"-20px"}}
        />
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader className="heading-3" textAlign="center">
                You are about to delete a post
              </AlertDialogHeader>
              <AlertDialogBody className="bold-text" textAlign="center">
                This will permanently remove your post from the list. Are you sure?
              </AlertDialogBody>
              <AlertDialogFooter>
                <ChakraButton ref={cancelRef} onClick={onClose} _hover={{filter:"brightness(0.8)"}} _focus={{border:"none"}}>Cancel</ChakraButton>
                <ChakraButton ref={cancelRef} onClick={() => handleDelete(id)} bg="rgb(237, 69, 93)" color="white" ml={3} _hover={{filter:"brightness(0.8)"}} _focus={{border:"none"}}>Delete</ChakraButton>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    );
  }

  const PublishAlertDialog = ({ id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef();
    return(
      <>
        <div className={styles.default} onClick={() => {setIsOpen(true)}}>Publish</div>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader className="heading-3" textAlign="center">
                You are about to publish a post
              </AlertDialogHeader>
              <AlertDialogBody className="bold-text" textAlign="center">
                This will allow users to read your story. You can still edit your post after this. Are you sure?
              </AlertDialogBody>
              <AlertDialogFooter>
                <ChakraButton ref={cancelRef} onClick={onClose} _hover={{filter:"brightness(0.8)"}} _focus={{border:"none"}}>Cancel</ChakraButton>
                <ChakraButton ref={cancelRef} onClick={() => handlePublish(id)} bg="rgb(0, 192, 77)" color="white" ml={3} _hover={{filter:"brightness(0.8)"}} _focus={{border:"none"}}>Publish</ChakraButton>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    );
  }

  return (
    <div className={styles.baseStyles}>
      <img src={story.headlineUrl} alt="" className={styles.image} />
      <div className={styles.rightContainer}>
      <DeleteAlertDialog id={story.id} />
        <div className={styles.titleContainer}>
          <h2 className="heading-2">{story.title}</h2>
        </div>
        <div className={styles.paragraphContainer}>
          <p className="paragraph">{story.body}</p>
        </div>
        <div className={styles.bottomAndButtonsContainer}>
          <div className={styles.bottomContainer}>
            <p className={`caption ${styles.icon}`} ><IoCalendarOutline style={{color: `var(--color-brand-default)`}} /> Created on {moment(`${story.createdAt}`, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]').format("MMMM D YYYY")}</p>
            { story.isDraft === 1
              ? <p className={`caption ${styles.icon}`} ><IoCalendarOutline style={{color: `var(--color-brand-darker)`}} /> To Be Published</p>
              : <p className={`caption ${styles.icon}`} ><IoCalendarOutline style={{color: `var(--color-brand-darker)`}} /> Published on {moment(`${story.publishedAt}`, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]').format("MMMM D YYYY")}</p>
            }
            <div className={styles.tagContainer}>
              <p className="caption">Tags: <i>{story.tags}</i></p>
            </div>
          </div>
          <div className={styles.buttonsContainer}>
            <Link to={`/institution/manage-stories/${story.id}`}>
              <div className={styles.outline}>Edit</div>
            </Link>
            {story.isDraft === 1 && <PublishAlertDialog id={story.id} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoryCardManage;