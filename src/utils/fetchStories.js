import axios from 'axios';

const fetchStories = async ({ loginType }) => {
  // I'm thinking I should add more props aside from loginType, mainly getDraft and getPublished
  // (these props will be from ManageStories page) and pasok sila inside else field (insti)

  console.log(loginType); // remove

  // Insti type is not allowed to view success stories (aka all stories)
  // So if insti user type, get institutionId by passing the instiId from manage stories as props
  // And query params sa url endpoint (stories?institutionId=:institutionId)
  /*
  if (loginType === "institution") {
    const response = await axios.get(`URL/stories?institutionId=:institutionId`); // Change :institutionId to institutionId props passed from manage stories
    const stories = response.data;
    return stories;
  } else {
    const response = await axios.get('URL/stories/published=1');
    const stories = response.data;
    return stories;
  }
  */

  const response = await axios.get('http://localhost:8000/stories');
  const stories = response.data;

  console.log(stories); // remove
  
  return stories;
}

export default fetchStories;