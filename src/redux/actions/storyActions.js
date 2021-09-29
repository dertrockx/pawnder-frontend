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
        const res = await axios.get('http://localhost:8000/stories?institutionId=' + institutionId)
        const storiesList = res.data;
        dispatch({
          type: story.FETCH_STORIES_COMPLETED,
          payload: {
            storiesList,
          },
        });
      } else {
        const res = await axios.get('http://localhost:8000/stories?isDraft=false');
        const storiesList = res.data;
        dispatch({
          type: story.FETCH_STORIES_COMPLETED,
          payload: {
            storiesList,
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