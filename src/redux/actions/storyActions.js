import { story } from 'constants/ActionTypes';
import axios from 'axios';

export const fetchStories = ({ loginType, institutionId }) => {
  return async (dispatch) => {
    dispatch({
      type: story.FETCH_STORIES_PENDING,
    });

    // Change kapag connected na sa backend
    // If institution: '/story?institutionId=' + institutionId
    // If user: '/story?published=1'

    try {
      if (loginType === 'institution') {
        // const res = await axios.get('http://localhost:8000/stories?institutionId=' + institutionId) // json-server
        const res = await axios.get('http://localhost:8081/api/0.1/story?institutionId=' + institutionId) // back-end
        const { stories } = res.data;
        dispatch({
          type: story.FETCH_STORIES_COMPLETED,
          payload: {
            stories,
          },
        });
      } else {
        // const res = await axios.get('http://localhost:8000/stories?isDraft=false'); // json-server
        const res = await axios.get('http://localhost:8081/api/0.1/story?published=1'); // back-end
        const { stories } = res.data;
        dispatch({
          type: story.FETCH_STORIES_COMPLETED,
          payload: {
            stories,
          },
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: story.FETCH_STORIES_FAILED,
        payload: {
          errorMessage: 'Request error.',
        }
      });
    }
  };
}