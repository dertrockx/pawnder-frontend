import { story } from 'constants/ActionTypes';

import { default as fetchStoriesAPI } from 'utils/fetchStories';

export const fetchStories = ({ loginType }) => {
  return async (dispatch) => {
    dispatch({
      type: story.FETCH_STORIES_PENDING,
    });

    console.log("fetching"); // remove
    // const storiesList = await fetchStoriesAPI({ loginType })
    //   .then((res) => {
    //     dispatch({
    //       type: story.FETCH_STORIES_COMPLETED,
    //       payload: {
    //         storiesList,
    //       },
    //     });
    //   })
    //   .catch((error) => {
    //     dispatch({
    //       type: story.FETCH_STORIES_FAILED,
    //       payload: {
    //         errorMessage: 'Something went wrong. Please try again later.',
    //       }
    //     });
    //   });

    const hasError = false; // backend
    const storiesList = await fetchStoriesAPI({loginType});

    if (hasError) {
      dispatch({
        type: story.FETCH_STORIES_FAILED,
        payload: {
          errorMessage: 'Something went wrong. Please try again later.',
        }
      });
    } else {
      dispatch({
        type: story.FETCH_STORIES_COMPLETED,
        payload: {
          storiesList,
        },
      });
      console.log(storiesList);
    }
  };
}