import { story } from 'constants/ActionTypes';
import axios from 'axios';

export const fetchStories = ({ loginType, institutionId }) => {
  return async (dispatch) => {
    dispatch({
      type: story.FETCH_STORIES_PENDING,
    });
    
    try {
      if (loginType === 'institution') {
        const res = await axios.get('http://localhost:8081/api/0.1/story?institutionId=' + institutionId) // back-end
        const { stories } = res.data;
        dispatch({
          type: story.FETCH_STORIES_COMPLETED,
          payload: {
            stories,
          },
        });
      } else {
        const res = await axios.get('http://localhost:8081/api/0.1/story?published=1'); // back-end
        console.log(res);
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