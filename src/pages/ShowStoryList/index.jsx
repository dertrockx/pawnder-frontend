import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { InputGroup, Input, InputLeftElement } from '@chakra-ui/react';
import { IoSearch } from 'react-icons/io5';

import { fetchStories } from 'redux/actions/storyActions';

import styles from './ShowStoryList.module.css';

import StoryCard from 'components/StoryCard';
import Radio from 'components/Radio';
import BasicStoryDetail from './BasicStoryDetail'; // Change to StoryDetails page

// Guide: https://medium.com/geekculture/how-to-use-react-router-useparams-436851fd5ef6

const ShowStoryList = () => {
  // get login type, pass login type as props to story card component
  const loginType = null; // null, user, or institution
  const fetchingStories = useSelector(s => s.story.fetchingStories);
  const fetchError = useSelector(s => s.story.fetchError);
  const storiesList = useSelector(s => s.story.storiesList);
  const dispatch = useDispatch();

  const [sortDate, setSortDate] = useState('ascending');
  const [searchTerm, setSearchTerm] = useState('');

  let storiesListCopy = storiesList; // So I won't overwrite the storiesListArray, esp. when sorting.

  // might use useEffect for pagination, put loginType in useEffect bc someone might log in/out while viewing stories
  useEffect(() => {
    dispatch(fetchStories({ loginType }));
  }, [])

  // Source: https://stackoverflow.com/a/12192544
  if (sortDate === 'ascending') {
    storiesListCopy.sort((a, b) => {
      return ((a.publishedAt < b.publishedAt) ? -1 : ((a.publishedAt > b.publishedAt) ? 1 : 0))
    });
  } else {
    storiesListCopy.sort((a, b) => {
      return ((a.publishedAt > b.publishedAt) ? -1 : ((a.publishedAt < b.publishedAt) ? 1 : 0))
    });
  }

  // Source: https://youtu.be/mZvKPtH9Fzo
  storiesListCopy = storiesList.filter((story) => {
    if (searchTerm === '') {
      return story;
    } else if (story.title.toLowerCase().includes(searchTerm.toLowerCase()) || (story.tags.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return story;
    }
  });

  return (
    <>
    {fetchingStories
    ? // TASK: Use chakra-ui's skeleton while fetching
      <h1 className="heading-1">Loading</h1>
    : <Router>
        <Switch>
          <Route exact path='/stories'>
          <div>
            <div className={styles.options}>
              <div className={styles.leftOptions} >
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
              <div className={styles.rightOptions} >
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
            <StoryCard data={ storiesListCopy } type={ loginType } />
          </div>
          </Route>
          <Route exact path='/stories/:id'>
            <BasicStoryDetail data={ storiesListCopy } />
          </Route>
        </Switch>
      </Router>
    }
    </>
  );
}

export default ShowStoryList;