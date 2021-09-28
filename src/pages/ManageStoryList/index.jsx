import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { HStack, Stack, Box, Skeleton } from '@chakra-ui/react';
import { Button as ChakraButton, IconButton, useToast, Tooltip, Menu, MenuButton, MenuList, MenuOptionGroup, MenuItemOption, InputGroup, Input, InputLeftElement} from '@chakra-ui/react';
import { IoSearch, IoCaretDown, IoAdd } from 'react-icons/io5';
import axios from 'axios';

import { fetchStories } from 'redux/actions/storyActions';

import styles from './ManageStoryList.module.css';

import StoryCardManage from './StoryCardManage';
import Radio from 'components/Radio';
import StoryDetails from 'pages/ManageStoryDetails';

// Guide: https://medium.com/geekculture/how-to-use-react-router-useparams-436851fd5ef6

const ManageStoryList = () => {
  const loginType = 'institution'; // null, user, or institution
  // const loginType = useSelector(s => s.auth.loginType);
  const fetchingStories = useSelector(s => s.story.fetchingStories);
  const fetchError = useSelector(s => s.story.fetchError);
  const storiesList = useSelector(s => s.story.storiesList);
  const dispatch = useDispatch();
  const toast = useToast();

  const [isDeletePending, setIsDeletePending] = useState(false);
  const [isPublishPending, setisPublishPending] = useState(false);
  const [sortDate, setSortDate] = useState('ascending');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStory, setFilterStory] = useState('');  

  let storiesListCopy = storiesList; // So I won't overwrite the storiesListArray (also used for the filter)

  // Might put loginType because someone might log out while while viewing stories.
  // Might also use for pagination
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

  const handleDelete = (id) => {
    // DELETE request here

    // For backend, change it to /story/ + id
    axios.delete('http://localhost:8000/stories/' + id)
    .then(() => {
      toast({
        title: 'Successfully deleted story.',
        status: 'success',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
      dispatch(fetchStories({ loginType }));
    })
    // Put .catch for error and add toast for when there is error
  }

  const handlePublish = (id) => {
    // PUT request here for isDraft field 

    alert(`Successfully published ${id}`); // remove
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
                {storiesListCopy.length === 0
                ? <div className={styles.center}>
                    <h1 className="heading-1">You haven't written any stories.<br />Make one below.</h1>
                      {/* This should link to /manage-stories/create */}
                      <ChakraButton
                        leftIcon={<IoAdd />}
                        fontFamily="Raleway"
                        marginTop="16px"
                      >
                        Create a story
                      </ChakraButton>
                  </div>
                : <Router>
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
                                  borderColor={`var(--color-light-grey)`}
                                  _hover={{borderColor: "var(--color-grey)"}}
                                  _focus={{borderColor: "brand.100", borderWidth: "2px"}}
                                />
                              </InputGroup>
                            </div>
                          </div>
                          {storiesListCopy.map(story => (
                            <StoryCardManage
                              key={story.id}
                              story={story}
                              handleDelete={handleDelete}
                              handlePublish={handlePublish}
                            />
                          ))}
                          {/* This should link to /manage-stories/create */}
                          <Tooltip hasArrow label="Create a story" bg={`var(--color-very-light-grey)`} color={`--color-black`} borderRadius="4px" fontFamily="Raleway">
                          <IconButton
                            aria-label="Create a story"
                            icon={<IoAdd />}
                            isRound="true"
                            boxShadow="xl"
                            bg={`var(--color-brand-default)`}
                            color="white"
                            size="lg"
                            fontSize="40px"
                            _hover={{filter:"brightness(0.8)"}}
                            _focus={{border:"none"}}
                            style={{position: "fixed", bottom: "40px", right:"60px"}} // For positioning floating action button to bottom right of screen
                          />
                        </Tooltip>
                        </div>
                      </Route>
                      <Route exact path='/manage-stories/:id' render={() => <StoryDetails  data={ storiesListCopy } />} />
                    </Switch>
                  </Router>
                }
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