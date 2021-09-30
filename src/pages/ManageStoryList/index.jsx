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
  const institutionId = 1;

  // const loginType = useSelector(s => s.auth.loginType); // this should also get instiId and pass instiId to fetchStories
  const fetchingStories = useSelector(s => s.story.fetchingStories);
  const fetchError = useSelector(s => s.story.fetchError);
  const stories = useSelector(s => s.story.stories);
  const dispatch = useDispatch();
  const toast = useToast();

  const [isDeletePending, setIsDeletePending] = useState(false);
  const [isPublishPending, setisPublishPending] = useState(false);
  const [sortDate, setSortDate] = useState('ascending');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStory, setFilterStory] = useState('');  

  let storiesCopy = stories; // So I won't overwrite the storiesArray (also used for the filter and for when there are no stories)

  // Might put loginType because someone might log out while while viewing stories.
  // Might also use for pagination
  useEffect(() => {
    dispatch(fetchStories({ loginType, institutionId }));
  }, [])

  // Uses id to sort
  if (sortDate === 'ascending') {
    storiesCopy.sort((a, b) => {
      return ((a.id < b.id) ? -1 : ((a.id > b.id) ? 1 : 0))
    });
  } else {
    storiesCopy.sort((a, b) => {
      return ((a.id > b.id) ? -1 : ((a.id < b.id) ? 1 : 0))
    });
  }

  // Source for search bar: https://youtu.be/mZvKPtH9Fzo
  storiesCopy = stories.filter((story) => {
    if (searchTerm === '') {
      return story;
    } else if (story.title.toLowerCase().includes(searchTerm.toLowerCase()) || (story.tags.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return story;
    }
  }).filter((story) => {
    if (filterStory === 'draft') {
      return (story.isDraft === 1);
    } else if (filterStory === 'published') {
      return (story.isDraft === 0);
    } else {
      return story;
    }
  });

  const handleDelete = (id) => {
    axios.delete('http://localhost:8081/api/0.1/story/' + id)
    .then(() => {
      toast({
        title: 'Successfully deleted story.',
        status: 'success',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
      dispatch(fetchStories({ loginType, institutionId }));
    })
    .catch(() => {
      toast({
        title: 'Error deleting story.',
        description: 'Something went wrong. Please try again later.',
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    })
  }

  const handlePublish = (id) => {
    // PUT request here for isDraft field (json-server)
    // For backend, '/story/' + id + '?publish=1'
    axios.put('http://localhost:8081/api/0.1/story/' + id + '?publish=1')
    .then(() => {
      toast({
        title: 'Successfully published story.',
        status: 'success',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
      dispatch(fetchStories({ loginType, institutionId }));
    })
    .catch(() => {
      toast({
        title: 'Error publishing story.',
        description: 'Something went wrong. Please try again later.',
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    })
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
      : <Router>
          <Switch>
            <Route exact path='/institution/manage-stories'>
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
                      { stories.length === 0
                      ? <div className={styles.center}>
                          <h1 className="heading-1">You haven't written any stories.<br />Make one below.</h1>
                            <Link to="/institution/manage-stories/create">
                              <ChakraButton
                                leftIcon={<IoAdd />}
                                fontFamily="Raleway"
                                marginTop="16px"
                              >
                                Create a story
                              </ChakraButton>
                            </Link>
                        </div>
                      : <div className={styles.container}>
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
                                <MenuOptionGroup onChange={(value) => setFilterStory(value)} value={filterStory} type="radio">
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
                          {storiesCopy.map(story => (
                            <StoryCardManage
                              key={story.id}
                              story={story}
                              handleDelete={handleDelete}
                              handlePublish={handlePublish}
                            />
                          ))}
                          <Tooltip hasArrow label="Create a story" bg={`var(--color-very-light-grey)`} color={`--color-black`} borderRadius="4px" fontFamily="Raleway">
                          <Link to="manage-stories/create">
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
                          </Link> 
                        </Tooltip>
                        </div>
                      }
                    </>
                  }
                </>
              }
            </Route>
            <Route exact path="/institution/manage-stories/create" component={StoryDetails} /> {/* This should always be above the route for with :id. */}
            <Route exact path="/institution/manage-stories/:id" render={() => <StoryDetails  data={ storiesCopy } />} /> {/* Might not pass data anymore since magre-refetch naman doon sa details page */}
          </Switch>
        </Router>
      }
    </>
  );
}

export default ManageStoryList;