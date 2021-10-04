import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { InputGroup, Input, InputLeftElement, HStack, Stack, Box, Skeleton } from '@chakra-ui/react';
import { IoSearch } from 'react-icons/io5';

import { getPublishedStories } from 'redux/actions/';

import styles from './ShowStoryList.module.css';

import StoryCardShow from './StoryCardShow';
import Radio from 'components/Radio';
import StoryDetails from 'pages/ShowStoryDetails'; // Change to ShowStoryDetails page

// Guide: https://medium.com/geekculture/how-to-use-react-router-useparams-436851fd5ef6

const ShowStoryList = () => {
  const { stories, fetchError, fetchingStories } = useSelector(s => s.story);

  const dispatch = useDispatch();
  
  const [sortDate, setSortDate] = useState('ascending');
  const [searchTerm, setSearchTerm] = useState('');

  let storiesCopy = stories; // So I won't overwrite the storiesArray, esp. when sorting.
  console.log(stories);
  // might use useEffect for pagination, put loginType in useEffect bc someone might log in/out while viewing stories
  useEffect(() => {
    dispatch(getPublishedStories());
  }, [])

  // Source: https://stackoverflow.com/a/12192544
  if (sortDate === 'ascending') {
    storiesCopy.sort((a, b) => {
      return ((a.publishedAt < b.publishedAt) ? -1 : ((a.publishedAt > b.publishedAt) ? 1 : 0))
    });
  } else {
    storiesCopy.sort((a, b) => {
      return ((a.publishedAt > b.publishedAt) ? -1 : ((a.publishedAt < b.publishedAt) ? 1 : 0))
    });
  }

  // Source: https://youtu.be/mZvKPtH9Fzo
  storiesCopy = stories.filter((story) => {
    if (searchTerm === '') {
      return story;
    } else if (story.title.toLowerCase().includes(searchTerm.toLowerCase()) || (story.tags.toLowerCase().includes(searchTerm.toLowerCase())) || (story.institutionName.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return story;
    }
  });

  return (
    <Router>
      <Switch>
        <Route exact path='/stories'>
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
                      <h1 className="heading-1">Nothing to see here...yet.</h1>
                    </div>
                  : <div className={styles.container}>
                      <div className={styles.options}>
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
                        <StoryCardShow
                          key={story.id}
                          story={story}
                        />
                      ))}
                    </div>
                  }
                </>
              }
            </>
          }
        </Route>
        <Route exact path='/stories/:id' render={() => <StoryDetails data={ storiesCopy } />}/>
      </Switch>
    </Router>
  );
}

export default ShowStoryList;