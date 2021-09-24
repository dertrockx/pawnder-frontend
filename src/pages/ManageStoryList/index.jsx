import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button as ChakraButton, Menu, MenuButton, MenuList, MenuOptionGroup, MenuItemOption, InputGroup, Input, InputLeftElement, HStack, Stack, Box, Skeleton } from '@chakra-ui/react';
import { IoSearch, IoCaretDown } from 'react-icons/io5';

import { fetchStories } from 'redux/actions/storyActions';

import styles from './ManageStoryList.module.css';

import StoryCard from 'components/StoryCard';
import Radio from 'components/Radio';
import BasicStoryDetail from './BasicStoryDetail'; // Change to ManageStoryDetails page

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
  
  return (
    <>
      {(loginType === 'user' || loginType === null)
          ? <Route component={() => (<div>404 Not Found</div>)} />
          : <div className={styles.container}>
              {fetchingStories
              ? <HStack height="256px" width="1200px" boxShadow="lg" bg="white" marginTop="120px">
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
              : <Router>
                  <Switch>
                    <Route exact path='/institution/manage-stories'>
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
                    <div className={styles.container}>
                      <StoryCard data={ storiesListCopy } type={ loginType } />
                    </div>
                    </Route>
                    <Route exact path='/manage-stories/:id' render={() => <BasicStoryDetail data={ storiesListCopy } />}>
                      {/* <BasicStoryDetail data={ storiesListCopy } /> */}
                    </Route>
                  </Switch>
                </Router>
              }
            </div>
        }
    </>
  );
}

export default ManageStoryList;