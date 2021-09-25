import axios from 'axios';

const fetchStories = async ({ loginType }) => {
  // I'm thinking I should add more props aside from loginType, mainly getDraft and getPublished
  // (these props will be from ManageStories page) and pasok sila inside else field (insti)

  console.log(loginType); // remove

  // Insti type is not allowed to view success stories (aka all stories)
  // So if insti user type, get institutionId by passing the instiId from manage stories as props
  // And query params sa url endpoint (`/story?institutionId=${institutionId}`)
  /*
  if (loginType === "institution") {
    const response = await axios.get(`URL/story?institutionId=${institutionId}`); // Change :institutionId to institutionId props passed from manage stories
    const stories = response.data;
    return stories;
  } else {
    const response = await axios.get('URL/story/published=1');
    const stories = response.data;
    return stories;
  }
  */

  // ife-fetch ko lang muna for type insti is instiId=1
  if (loginType === "institution") {
    // await axios.get('http://localhost:8000/stories?institutionId=1')
    //         .then((response) => {
    //           const stories = response.data;
    //           console.log(stories); // remove
    //           return stories;              
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });

    const response = await axios.get('http://localhost:8000/stories?institutionId=1');
    const stories = response.data;
    console.log(stories); // remove
    return stories;

  } else {
    // await axios.get('http://localhost:8000/stories?isDraft=false')
    //     .then((response) => {
    //       const stories = response.data;
    //       console.log(stories); // remove
    //       return stories;              
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });

    const response = await axios.get('http://localhost:8000/stories?isDraft=false');
    const stories = response.data;
    console.log(stories); // remove
    return stories;
  }
}

export default fetchStories;