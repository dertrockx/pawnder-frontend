import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { HStack, Stack, Box, Skeleton } from '@chakra-ui/react';
import { Button as ChakraButton, IconButton, Tooltip, Menu, MenuButton, MenuList, MenuOptionGroup, MenuItemOption, InputGroup, Input, InputLeftElement} from '@chakra-ui/react';
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from '@chakra-ui/react'
import { IoSearch, IoCaretDown, IoTrashBin, IoAdd } from 'react-icons/io5';

import { fetchStories } from 'redux/actions/storyActions';

import styles from './ManageStoryList.module.css';

import StoryCard from 'components/StoryCard';
import Radio from 'components/Radio';
import BasicStoryDetail from './BasicStoryDetail'; // Change to ManageStoryDetails page
// import ManageStoryDetails from "pages/ManageStoryDetails";


// Guide: https://medium.com/geekculture/how-to-use-react-router-useparams-436851fd5ef6

const ManageStoryList = () => {
  // get login type, pass login type as props to story card component
  const loginType = 'institution'; // null, user, or institution
  // const loginType = useSelector(s => s.auth.loginType);
  const fetchingStories = useSelector(s => s.story.fetchingStories);
  const fetchError = useSelector(s => s.story.fetchError);
  const storiesList = useSelector(s => s.story.storiesList);
  const dispatch = useDispatch();

  const [sortDate, setSortDate] = useState('ascending');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStory, setFilterStory] = useState('');

  let storiesListCopy = storiesList; // So I won't overwrite the storiesListArray, esp. when sorting.

  // might use useEffect for pagination, put loginType in useEffect bc someone might log in/out while viewing stories
  useEffect(() => {
    dispatch(fetchStories({ loginType }));
  }, [])

  // Uses id to sort
  if (sortDate === 'ascending') {
    storiesListCopy.sort((a, b) => {
      return ((a.id < b.id) ? -1 : ((a.id > b.id) ? 1 : 0))
    });
  } else {
    storiesListCopy.sort((a, b) => {
      return ((a.id > b.id) ? -1 : ((a.id < b.id) ? 1 : 0))
    });
  }

  // Source for search bar: https://youtu.be/mZvKPtH9Fzo
  storiesListCopy = storiesList.filter((story) => {
    if (searchTerm === '') {
      return story;
    } else if (story.title.toLowerCase().includes(searchTerm.toLowerCase()) || (story.tags.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return story;
    }
  }).filter((story) => {
    if (filterStory === 'draft') {
      return (story.isDraft === true);
    } else if (filterStory === 'published') {
      return (story.isDraft === false);
    } else {
      return story;
    }
  });

  const handleDelete = () => {
    // Make DELETE request
    alert("You have successfully deleted the post.")
  }

  const DeleteAlertDialog = () => {
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
                <ChakraButton ref={cancelRef} onClick={handleDelete} bg="rgb(237, 69, 93)" color="white" ml={3} _hover={{filter:"brightness(0.8)"}} _focus={{border:"none"}}>Delete</ChakraButton>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    );
  }

  const handlePublish = () => {
    // Make PUT request

    alert("Published")
  }

  const PublishAlertDialog = () => {
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
                <ChakraButton ref={cancelRef} onClick={handlePublish} bg="rgb(0, 192, 77)" color="white" ml={3} _hover={{filter:"brightness(0.8)"}} _focus={{border:"none"}}>Publish</ChakraButton>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    );
  }

  const handleCreate = () => {
    // put toast here na you have successfully created a story
    alert("Successfully created a story");
  }

  const CreateModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <>
        <Tooltip hasArrow label="Create a story" bg={`var(--color-very-light-grey)`} color={`--color-black`} borderRadius="4px" fontFamily="Raleway">
          <IconButton
            aria-label="Create a story"
            icon={<IoAdd />}
            isRound="true"
            boxShadow="dark-lg"
            bg={`var(--color-brand-default)`}
            color="white"
            size="lg"
            fontSize="40px"
            _hover={{filter:"brightness(0.8)"}}
            _focus={{border:"none"}}
            onClick={onOpen}
            style={{position: "fixed", bottom: "40px", right:"60px"}} // For positioning floating action button to bottom right of screen
          />
        </Tooltip>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              Create a story
            </ModalHeader>
            <ModalCloseButton /> {/* Might remove if I don't need a close button */}
            <ModalBody>
              Put form here
            </ModalBody>
            <ModalFooter>
              <ChakraButton onClick={onClose} _hover={{filter:"brightness(0.8)"}} _focus={{border:"none"}}>Cancel</ChakraButton>
              <ChakraButton onClick={handleCreate} bg="rgb(0, 192, 77)" color="white" ml={3} _hover={{filter:"brightness(0.8)"}} _focus={{border:"none"}}>Create</ChakraButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <>
      {/* Remove 404 Not Found page as Ian would be the one to configure it in the base routing. */}
      {(loginType === 'user' || loginType === null)
      ? <div className={styles.center}>
          <h1 className="heading-1" >404 Not Found</h1>
          <p className="paragraph">
            Maybe you wanted to see all &nbsp;
          <Link to="/stories" className="link-text">
            stories
          </Link>
          ?
          </p>
        </div>
      : <>
          {fetchingStories
          ? <div className={styles.container}>
              <HStack height="256px" width="1200px" boxShadow="lg" bg="white" marginTop="120px">
                <Skeleton height="256" width="350px" />
                <Box>
                  <Stack width="850px" padding="8px 32px 8px 16px" spacing="16px">
                    <Skeleton height="48px" />
                    <Skeleton height="16px" />
                    <Skeleton height="16px" />
                    <Skeleton height="16px" />
                    <Skeleton height="16px" />
                    <Skeleton height="16px" />
                  </Stack>
                </Box>
              </HStack>
            </div>
          : <>
            {fetchError
            ? <div className={styles.center}>
                <h1 className="heading-1" >Something went wrong. Please try again later.</h1>
              </div>
            : <>
                <Router>
                  <Switch>
                    <Route exact path='/manage-stories'>
                      <div className={styles.container}>
                        <div className={styles.options}>
                          <div>
                          <Menu>
                            <MenuButton
                              as={ChakraButton}
                              rightIcon={<IoCaretDown />}
                              bg="rgb(255, 165, 0)"
                              color="white"
                              fontFamily="Raleway"
                              _hover={{filter:"brightness(0.8)"}}
                              _expanded={{bg:"rgb(255, 165, 0)"}}
                              _focus={{border:"none"}}
                            >
                              Filter
                            </MenuButton>
                            <MenuList>
                              <MenuOptionGroup onChange={(value) => setFilterStory(value)} type="radio">
                                <MenuItemOption 
                                  className="paragraph"
                                  value=""
                                  _checked={{bg: "none", color:"rgb(255, 165, 0)", fontWeight:"bold"}}
                                  _hover={{bg:"none", fontWeight:"bold"}}
                                >
                                  None
                                </MenuItemOption>
                                <MenuItemOption 
                                  className="paragraph"
                                  value="draft" 
                                  _checked={{bg: "none", color:"rgb(255, 165, 0)", fontWeight:"bold"}}
                                  _hover={{bg:"none", fontWeight:"bold"}}
                                >
                                  Draft
                                </MenuItemOption>
                                <MenuItemOption 
                                  className="paragraph"
                                  value="published" 
                                  _checked={{bg: "none", color:"rgb(255, 165, 0)", fontWeight:"bold"}}
                                  _hover={{bg:"none", fontWeight:"bold"}}
                                >
                                  Published
                                </MenuItemOption>
                              </MenuOptionGroup>
                            </MenuList>
                        </Menu>
                          </div>
                          <div className={styles.sortDate}>
                            <p className="bold-text">Sort Date by:</p>
                            <Radio
                              name="sort"
                              label="Ascending"
                              onChange={() => {setSortDate("ascending")}}
                              checked={sortDate === "ascending"}
                            />
                            <Radio
                              name="sort"
                              label="Descending"
                              onChange={() => {setSortDate("descending")}}
                              checked={sortDate === "descending"}
                            />
                          </div>
                          <div className={styles.searchBar}>
                            <InputGroup>
                              <InputLeftElement
                                pointerEvents="none"
                                children={<IoSearch color="rgb(187, 200, 212)" />}
                              />
                              <Input
                                name="search"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => {setSearchTerm(e.target.value)}}
                                fontFamily="Raleway"
                                borderWidth="2px"
                                borderColor="rgb(187, 200, 212)"
                                _hover={{borderColor: "rgb(109, 125, 139)"}}
                                focusBorderColor="brand.100"
                              />
                            </InputGroup>
                          </div>
                        </div>
                        <StoryCard data={ storiesListCopy } type={ loginType } publish={ <PublishAlertDialog /> }>
                          <DeleteAlertDialog />
                        </StoryCard>
                        <CreateModal />
                      </div>
                    </Route>
                    <Route exact path='/manage-stories/:id' render={() => <BasicStoryDetail data={ storiesListCopy } />} />
                      {/* <BasicStoryDetail data={ storiesListCopy } /> */}
                  </Switch>
                </Router>
              </>
            }
            </>
          }
        </>
      }
    </>
  );
}

export default ManageStoryList;