import axios from 'axios';

const fetchStories = async ({ loginType }) => {
  // const response = await fetch('http://localhost:8000/stories');
  
  // console.log(response);

  // const responseJSON = await response.json();
  // console.log(responseJSON);
  // return responseJSON;

  console.log(loginType); // remove
  // if loginType === user or null, endpoint will be /stories/published=1
  // else (insti), endpoint will be just /stories/

  // for now, i will be using isDraft bc i'm using json-server


  let response = await axios.get('http://localhost:8000/stories');
  let stories = response.data;

  console.log(stories); // remove
  
  return stories;
}

export default fetchStories;