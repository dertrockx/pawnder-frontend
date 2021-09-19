import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// import StoryContainer from 'StoryContainer';
// Import StoryDetails here
// Guide: https://medium.com/geekculture/how-to-use-react-router-useparams-436851fd5ef6


const ShowStoryList = () => {
  const [stories, getStories] = useState('');

  // fetch data here
  // use json-server (add institutionName field)
  // sample: 
  /*
  {"stories":
    [{"id":4,
      "institutionId":1, 
      "isDraft":true,
      "title":"Insti 1 story 3",
      "body":"sdonjfnsjnd",
      "headlineUrl":"https://res.cloudinary.com/dbky7zvuf/image/upload/v1630591757/institution/1/stories/4/headlinePhoto.png"}]}
  */

  return (
    <Router>
      <Switch>
        {/* <Route exact path='/stories'>
          <StoryContainer data={stories} />
        </Route> */}
        {/* <Route exact path='/stories/:petId'>
          <StoryDetails data={data} />
        </Route> */}
      </Switch>
    </Router>
  );
}
 
export default ShowStoryList;