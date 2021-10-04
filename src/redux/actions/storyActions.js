import { story } from 'constants/ActionTypes';
import axios from 'utils/axios';

export const getStories = (institutionId) => {
  return async (dispatch) => {
    dispatch({
      type: story.FETCH_STORIES_PENDING,
    });
    
    try {
      const res = await axios.get(`/api/0.1/story?institutionId=${institutionId}`)
      const { stories } = res.data;
      dispatch({
        type: story.FETCH_STORIES_COMPLETED,
        payload: {
          stories,
        },
      });
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

export const getPublishedStories = () => {
  return async (dispatch) => {
    dispatch({
      type: story.FETCH_STORIES_PENDING,
    });

    try {
      const res = await axios.get('/api/0.1/story?published=1');
      const { stories } = res.data;
      dispatch({
        type: story.FETCH_STORIES_COMPLETED,
        payload: {
          stories,
        },
      });
    } catch (err) {
      console.log(err);

      dispatch({
        type: story.FETCH_STORIES_FAILED,
        payload: {
          errorMessage: 'Request error.',
        }
      });
    }
  }
}