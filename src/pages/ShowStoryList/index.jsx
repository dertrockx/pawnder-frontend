import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchStories } from 'redux/actions/storyActions';

import StoryContainer from './StoryContainer'; // to contain data
import BasicStoryDetail from './BasicStoryDetail'; // Change to StoryDetails page

import StoryCard from 'components/StoryCard';

// Guide: https://medium.com/geekculture/how-to-use-react-router-useparams-436851fd5ef6

const ShowStoryList = () => {
  // get login type, pass login type as props to story card component
  const loginType = null; // null, user, or institution
  const fetchingStories = useSelector(s => s.story.fetchStories);
  const fetchError = useSelector(s => s.story.fetchError);
  const storiesList = useSelector(s => s.story.storiesList);
  const dispatch = useDispatch();

  // might use useEffect for pagination, put loginType in useEffect bc someone might log in/out while viewing stories
  useEffect(() => {
    console.log("onmount");
    dispatch(fetchStories({ loginType }));
  }, [])

  return (
    <>
    {fetchingStories ? (
      <h1 className="heading-1">Loading</h1>
    ) : (
      <Router>
        <Switch>
          <Route exact path='/stories'>
          <div>Stories
      { 
        // storiesList.map(story => (
        //   <StoryCard key={story.id} >
        //     <img src={story.headlineURL} />
        //     <h3 className="heading-3">{story.title}</h3>
        //     {/* Only print 3 lines in body */}
        //     <p className="paragraph">{story.body}</p>
        //     <p className="caption">{story.institutionName}</p>
        //     {/* Create component for Tag */}
        //     <p className="caption">Tags: {story.tags}</p>
        //   <Link to={`stories/${story.id}`}>
        //     <p className="link">Read More</p>
        //   </Link>
        //   </StoryCard>
        // ))
      }

      <StoryCard data={ storiesList } type={ loginType } />
    </div>
          </Route>
          <Route exact path='/stories/:id'>
            <BasicStoryDetail data={storiesList} />
          </Route>
        </Switch>
      </Router>
    )
    }
    </>
    

    

  );
}
 
export default ShowStoryList;